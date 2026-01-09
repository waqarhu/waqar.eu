# Example Bash Script
# Add your bash scripts here with proper documentation

#!/bin/bash

# Function: example_function
# Description: This is an example function
# Usage: example_function <arg1>

example_function() {
    echo "Hello from bash!"
}

# Main execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    example_function "$@"
fi
