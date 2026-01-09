#!/bin/ksh93
#
# Script: monitor_jobs.rtk2.ksh
# Author: Waqar
# Date: January 9, 2026
# Version: 1.4
#
# Description:
#   Monitors IBM DataStage workload management (WLM) and exports metrics to Prometheus.
#   Tracks job queues, running jobs, completed jobs, and system health metrics.
#   Uses time-based filtering (noon/midnight reset) for accurate queue counts.
#
# Metrics Collected:
#   - Job queue counts by priority (BE_Medium, Unite_Medium, etc.)
#   - Running, completed, and not-runnable job counts
#   - IMAM process monitoring (reimport/purge operations)
#   - Python deployment processes
#   - SSH connectivity checks
#   - Java heap memory usage
#   - Sidecar API health (at 09:00 and 15:00)
#
# Output: /var/lib/node_exporter/textfile_collector/*.prom
# Location: /appl/maint/iis_maint/monitor_jobs.rtk2.ksh
#

# Ensure zero-padded date format for reliable string comparison
D="$(date +%d)"
M="$(date +%m)"
Y="$(date +%Y)"
H="$(hostname -s)"
T="$(date +'%s')"
L="/opt/IBM/InformationServer/Server/DSWLM/logs/wlm.${Y}.${M}.${D}.*.log"

# Check if log files exist before processing
ls ${L} >/dev/null 2>&1 || { print "No log files found for today: ${L}" >&2; exit 1; }

# Determine cutoff time: reset at midnight (00:00) and noon (12:00)
CURRENT_HOUR="$(date +%H)"
if [[ ${CURRENT_HOUR} -lt 12 ]]; then
    # Morning: use entries from midnight (00:00) onwards
    CUTOFF_TIME="${Y}-${M}-${D} 00:00"
else
    # Afternoon/Evening: use entries from noon (12:00) onwards
    CUTOFF_TIME="${Y}-${M}-${D} 12:00"
fi

# Process only recent log entries (last 10000 lines) to reduce load
# This covers ~2-3 hours of activity, plenty for noon/midnight reset
TAIL_LINES=10000

TMPNUMA="$(pgrep -cf 'CliClient -a reimport')"
TMPNUMB="$(pgrep -cf 'CliClient -a purge')"
TMPNUMC="$(pgrep -cf 'com.ibm.mmi.cli.client.CliClient')"
print "p10571{name=\"IMAM\",reimport=\"true\"} ${TMPNUMA}"  >/var/lib/node_exporter/textfile_collector/wlm.prom
print "p10571{name=\"IMAM\",purge=\"true\"} ${TMPNUMB}"    >>/var/lib/node_exporter/textfile_collector/wlm.prom
print "p10571{name=\"IMAM\",total=\"true\"} ${TMPNUMC}"    >>/var/lib/node_exporter/textfile_collector/wlm.prom

# Use tail to process only recent log entries, reducing I/O and CPU load
tail -n ${TAIL_LINES} ${L} 2>/dev/null | awk -v host=${H} -v t=${T} -v cutoff="${CUTOFF_TIME}" \
    ' BEGIN { QUEUE["1"]="BE_Medium"
              QUEUE["2"]="Unite_Medium"
              QUEUE["3"]="MediumPriorityJobs"
              QUEUE["4"]="Exa_Medium"
              QUEUE["5"]="CBDO_Medium"
            }
     # Only process log entries after cutoff time
     # Log format: 2026-01-09T18:58:34.753, INFO: ...
     # Extract timestamp, remove comma, replace T with space for comparison
     {
      timestamp = $1;
      gsub(/,/, "", timestamp);
      gsub(/T/, " ", timestamp);
      # Compare only date and hour:minute (ignore seconds)
      if (substr(timestamp, 1, 16) >= cutoff) {
       if ( $4 == "CDIDW-WLQM-0001" && $10 == QUEUE["1"] ) a++;
       if ( $4 == "CDIDW-WLQM-0001" && $10 == QUEUE["2"] ) b++;
       if ( $4 == "CDIDW-WLQM-0001" && $10 == QUEUE["3"] ) c++;
       if ( $4 == "CDIDW-WLQM-0001" && $10 == QUEUE["4"] ) d++;
       if ( $4 == "CDIDW-WLQM-0001" && $10 == QUEUE["5"] ) e++;
       if ( $4 == "CDIDW-WLWQ-0007" && $10 == QUEUE["1"] ) f++;
       if ( $4 == "CDIDW-WLWQ-0007" && $10 == QUEUE["2"] ) g++;
       if ( $4 == "CDIDW-WLWQ-0007" && $10 == QUEUE["3"] ) h++;
       if ( $4 == "CDIDW-WLWQ-0007" && $10 == QUEUE["4"] ) i++;
       if ( $4 == "CDIDW-WLWQ-0007" && $10 == QUEUE["5"] ) j++;
       if ( $4 == "CDIDW-WLQM-0001"                      ) count[$10]++;
       if ( $4 == "CDIDW-WLMS-0008"                      ) k[$6]++;
       if ( $4 == "CDIDW-WLMS-0010"                      ) l++;
       if ( $4 == "CDIDW-WLRM-0008"                      ) m=$16;
      }
     }
 END { # Calculate queued jobs with safety check for negative values
       q1 = (a-f > 0) ? a-f : 0;
       q2 = (b-g > 0) ? b-g : 0;
       q3 = (c-h > 0) ? c-h : 0;
       q4 = (d-i > 0) ? d-i : 0;
       q5 = (e-j > 0) ? e-j : 0;
       
       for (q in QUEUE)
        { if (QUEUE[q] == QUEUE["1"]) { printf "p10571{app=\"wlm\", type=\"queued\", name=\"%s\"} %d\n", QUEUE[q], q1 }
          if (QUEUE[q] == QUEUE["2"]) { printf "p10571{app=\"wlm\", type=\"queued\", name=\"%s\"} %d\n", QUEUE[q], q2 }
          if (QUEUE[q] == QUEUE["3"]) { printf "p10571{app=\"wlm\", type=\"queued\", name=\"%s\"} %d\n", QUEUE[q], q3 }
          if (QUEUE[q] == QUEUE["4"]) { printf "p10571{app=\"wlm\", type=\"queued\", name=\"%s\"} %d\n", QUEUE[q], q4 }
          if (QUEUE[q] == QUEUE["5"]) { printf "p10571{app=\"wlm\", type=\"queued\", name=\"%s\"} %d\n", QUEUE[q], q5 }
        }
       for (word in count) printf "p10571{app=\"wlm\", type=\"added\", name=\"%s\"} %d\n", word, count[word];
       printf "p10571{app=\"wlm\", type=\"queued\", name=\"uniqnotrunnable\"} %d\n", length(k);
       printf "p10571{app=\"wlm\", type=\"queued\", name=\"completed\"} %d\n", l;
       # Extract running count (remove comma and default to 0 if not found)
       sub(/,/,"",m); running = (m > 0) ? m : 0;
       printf "p10571{app=\"wlm\", type=\"queued\", name=\"running\"} %d\n", running;
     }' >>/var/lib/node_exporter/textfile_collector/wlm.prom

# Optimize: Single ps command with grep instead of multiple pgrep calls
COUNT="$(ps -u ansi_dmdeploy02 -o args 2>/dev/null | grep -c python)"
print "p10571{app=\"istool\", type=\"running\", name=\"deployments\"} ${COUNT}" >>/var/lib/node_exporter/textfile_collector/wlm.prom

# Optimize: Use single grep pass for APT configs
grep -h APT_CONFIG_FILE /appl/legacybe/dsprojects/*/DSParams /appl/dsprojects/*/DSParams 2>/dev/null | \
  grep Config.apt | \
  sed 's/.*\/\([A-Z]\+_[A-Z].*\)\/DSP.*Configurations\/\(.*\).apt\"/p10571_apt{project=\"\1\",node_config=\"\2\"} 0/' \
  >/var/lib/node_exporter/textfile_collector/apt.prom

# SSH check: Add timeout to prevent hanging
ssh -o ConnectTimeout=5 -o ConnectionAttempts=1 dlxdep02 hostname >/dev/null 2>&1
RET="${?}"
print "p10571{app=\"ssh\", type=\"connection\", name=\"account_lock\"} ${RET}" >>/var/lib/node_exporter/textfile_collector/wlm.prom

# Optimize: More efficient Java heap extraction with reduced process scanning
ps -eo args 2>/dev/null | \
  grep java | \
  grep -i Xmx | \
  grep -Ev "reimport|purge" | \
  sed 's/ -start//' | \
  sed 's/.*-Xmx\([0-9]*\)[mMgG].*\( .*\)/p10571_heap{name=\"\2\"} \1/' | \
  sed 's/ //' \
  >/var/lib/node_exporter/textfile_collector/appheap.prom

TT="$(date +'%R')"
[[ ${TT} = "09:00" || ${TT} = "15:00" ]] \
 && { # SIDECAR Monitoring - runs only at specific times
      curl -s -m 10 -X GET -H "Content-Type: application/json" -H "Host: api.ing.com" \
        http://localhost:8092/api/mps-ol/batch/check/2153520e-9941-4431-9a26-943b415b31b3 \
        >/tmp/rtkjobtmp.$$ 2>/dev/null
      ERR="$(cut -c-153 /tmp/rtkjobtmp.$$ | grep -v completed |sed 's/.*code\":\"\(.*\)\",\"message.*source\":\"\(.*\)\","target.*/\1 \2/')"
      OK="$(cut -c-153 /tmp/rtkjobtmp.$$ |grep creationTimeStamp |grep completed)"
      [[   -z ${OK} ]] && { print "p10571_sidecar{name=\"SideCar\",service=\"nok\",err=\"${ERR}\"} 0" >/var/lib/node_exporter/textfile_collector/sidecar.prom; }
      [[ ! -z ${OK} ]] && { print "p10571_sidecar{name=\"SideCar\",service=\"ok\",err=\"${ERR}\" } 1" >/var/lib/node_exporter/textfile_collector/sidecar.prom; }
      print "$(date) ${TT}" >/appl/maint/logs/lastrun.sidecarcheck
      rm -f /tmp/rtkjobtmp.$$
    } \
 || { print "skipped"; }

exit 0
        }
       for (word in count) printf "p10571{app=\"wlm\", type=\"added\", name=\"%s\"} %d\n", word, count[word];
       printf "p10571{app=\"wlm\", type=\"queued\", name=\"uniqnotrunnable\"} %d\n", length(k);
       printf "p10571{app=\"wlm\", type=\"queued\", name=\"completed\"} %d\n", l;
       sub(/,/,"",m); printf "p10571{app=\"wlm\", type=\"queued\", name=\"running\"} %d\n", m;
     }' ${L} >>/var/lib/node_exporter/textfile_collector/wlm.prom

COUNT="$(ps -u ansi_dmdeploy02 -o comm,args |grep python |wc -l)"
#ps -u ansi_dmdeploy02 -o comm,args >>/home/dsadm/istools_ps_debug.out 2>&1
print "p10571{app=\"istool\", type=\"running\", name=\"deployments\"} ${COUNT}" >>/var/lib/node_exporter/textfile_collector/wlm.prom

grep APT_CONFIG_FILE /appl/legacybe/dsprojects/*/DSParams /appl/dsprojects/*/DSParams |grep Config.apt |sed 's/.*\/\([A-Z]\+_[A-Z].*\)\/DSP.*Configurations\/\(.*\).apt\"/p10571_apt{project=\"\1\",node_config=\"\2\"} 0/' >/var/lib/node_exporter/textfile_collector/apt.prom

ssh -o ConnectTimeout=5 dlxdep02 hostname
RET="${?}"
print "p10571{app=\"ssh\", type=\"connection\", name=\"account_lock\"} ${RET}" >>/var/lib/node_exporter/textfile_collector/wlm.prom

ps -ef|grep java |grep -i Xmx |egrep -v "reimport|purge" |sed 's/ -start//' |sed 's/.*-Xmx\([0-9]*\)[mMgG].*\( .*\)/p10571_heap{name=\"\2\"} \1/' |sed 's/ //' >/var/lib/node_exporter/textfile_collector/appheap.prom

TT="$(date +'%R')"
[[ ${TT} = "09:00" || ${TT} = "15:00" ]] \
 && { # SIDECAR Monitoring
      #curl -v -X GET -H "Content-Type: application/json" -H "Host: api.ing.com" http://localhost:8092/api/mps-ol/batch/check/2153520e-9941-4431-9a26-943b415b31b3 2>/dev/null |cut -c-153 |grep creationTimeStamp |grep completed >/tmp/rtkjobtmp.$$
      curl -X GET -H "Content-Type: application/json" -H "Host: api.ing.com" http://localhost:8092/api/mps-ol/batch/check/2153520e-9941-4431-9a26-943b415b31b3 2>/dev/null >/tmp/rtkjobtmp.$$
      ERR="$(cut -c-153 /tmp/rtkjobtmp.$$ | grep -v completed |sed 's/.*code\":\"\(.*\)\",\"message.*source\":\"\(.*\)\","target.*/\1 \2/')"
      OK="$(cut -c-153 /tmp/rtkjobtmp.$$ |grep creationTimeStamp |grep completed)"
      [[   -z ${OK} ]] && { print "p10571_sidecar{name=\"SideCar\",service=\"nok\",err=\"${ERR}\"} 0" >/var/lib/node_exporter/textfile_collector/sidecar.prom; }
      [[ ! -z ${OK} ]] && { print "p10571_sidecar{name=\"SideCar\",service=\"ok\",err=\"${ERR}\" } 1" >/var/lib/node_exporter/textfile_collector/sidecar.prom; }
      print "$(date) ${TT}" >/appl/maint/logs/lastrun.sidecarcheck
    } \
 || { print "skipped"; }

rm /tmp/rtkjobtmp.$$

exit 0
