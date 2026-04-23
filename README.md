# 🚀 Waqar Hussain - DevOps Engineer Portfolio

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/waqarhu/waqar.eu)
![GitHub stars](https://img.shields.io/github/stars/waqarhu/waqar.eu?style=social)
![GitHub forks](https://img.shields.io/github/forks/waqarhu/waqar.eu?style=social)
![Lighthouse Performance](https://img.shields.io/badge/lighthouse-95%2B-success)
![PWA Ready](https://img.shields.io/badge/PWA-ready-blueviolet)

[Live Demo](https://waqar.eu) • [Report Bug](https://github.com/waqarhu/waqar.eu/issues) • [Request Feature](https://github.com/waqarhu/waqar.eu/issues)

</div>

---

## 📋 About

A modern, high-performance portfolio website showcasing Senior DevOps/Platform Engineering expertise, cloud infrastructure projects, and CI/CD automation. Built with vanilla HTML, CSS, and JavaScript, this site demonstrates best practices in web performance, security, and accessibility.

### ✨ Key Features

- 🎨 **Fully Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Lightning Fast** - WebP images, resource hints, service worker caching
- 🔒 **Security Hardened** - CSP, XSS protection, secure headers
- 📱 **PWA Ready** - Installable on iOS, Android, and desktop platforms
- ♿ **Accessible** - WCAG 2.1 compliant with ARIA labels and semantic HTML
- 🌙 **Dark/Light Theme** - Persistent theme preference with smooth transitions
- 📊 **SEO Optimized** - Schema.org structured data, FAQ schema, Open Graph, sitemap
- 📧 **Working Contact Form** - Async form submission with real-time feedback
- 🎯 **Custom 404 Page** - Branded error page with navigation
- 🖼️ **Google Images Ready** - Optimized metadata for image search indexing
- 🕌 **Islamic Content** - 99 Names of Allah rotation, 80 Quran & Hadith quotes
- 🖼️ **Avatar Rotation** - Multiple profile pictures with smooth transitions
- 🎭 **Interactive Icons** - 70+ technology icons with hover/tap animations
- 📝 **Dynamic Testimonials** - Auto-shuffling client feedback every 30 seconds

## 🎬 Demo

<div align="center">

### Desktop View
![Desktop Demo](./website-demo-image/desktop.png)

### Mobile View
![Mobile Demo](./website-demo-image/mobile.png)

</div>

## 🛠️ Built With

### Core Technologies
- **HTML5** - Semantic markup with Schema.org structured data
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Async/await, Fetch API, Service Workers

### Performance Optimizations
- **WebP Images** - 92% size reduction for avatars (1.1MB → 86KB)
- **Minified Assets** - Clean-CSS and Terser for CSS/JS compression
- **Service Worker** - Offline-first caching strategy (v8)
- **Resource Hints** - fetchpriority, modulepreload, preload for critical assets
- **Lazy Loading** - Progressive image loading
- **Noscript Fallback** - Graceful degradation for non-JS users

### Security Features
- **Content Security Policy (CSP)** - XSS and injection protection
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, Permissions-Policy
- **HTTPS Only** - Secure connections enforced

### SEO & Metadata
- **Open Graph** - Rich social media previews with og:site_name
- **Schema.org** - Person, ImageObject, BreadcrumbList, FAQPage, sameAs (Facebook) structured data
- **FAQ Schema** - 6 structured Q&A pairs for rich snippets
- **XML Sitemap** - Enhanced with image metadata (geo_location, license)
- **Robots.txt** - Googlebot-Image specific optimizations

## 🚀 Getting Started

### Prerequisites

- [Git](https://git-scm.com/downloads) installed on your system
- Web browser with modern JavaScript support
- (Optional) Node.js 18+ for development build scripts

### Installation

1. Clone the repository
```bash
git clone https://github.com/waqarhu/waqar.eu.git
cd waqar.eu
```

2. Open directly in browser
```bash
# Linux/macOS
open index.html

# Windows
start index.html
```

3. Or serve with a local server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

### Development

Install dependencies for build scripts:
```bash
npm install
```

Available npm scripts:
```bash
npm run build:css    # Minify CSS
npm run build:js     # Minify JavaScript
npm run build        # Build all assets
```

## 📁 Project Structure

```
waqar.eu/
├── index.html              # Main portfolio page
├── 404.html                # Custom error page
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker (v8)
├── sitemap.xml             # XML sitemap
├── robots.txt              # Robots directives
├── assets/
│   ├── css/
│   │   ├── style.css       # Source styles
│   │   └── style.min.css   # Minified styles
│   ├── js/
│   │   ├── script.js       # Source JavaScript (99 names, quotes, avatar rotation)
│   │   └── script.min.js   # Minified JavaScript
│   └── images/
│       ├── my-avatar.webp      # Main profile image
│       ├── my-avatar-1.webp    # Secondary avatar for rotation
│       ├── icon-*.png          # PWA icons
│       ├── avatar-*.webp       # WebP testimonial images
│       └── portfolio/          # Project screenshots
└── website-demo-image/     # README screenshots
```

## 🎯 Features Breakdown

### Dynamic Content
- **99 Names of Allah** - Rotating Asma ul Husna with English translations (every 5 seconds)
- **Islamic Quotes** - 80 Quran verses and Hadith rotating every 2 minutes
- **Avatar Rotation** - Multiple profile pictures with 2s fade transition (every 10 seconds)
- **Technology Icons** - 70+ DevOps/Platform tools with hover animations (disabled on mobile)
- **Testimonials Shuffle** - Fisher-Yates algorithm randomization (every 30 seconds)
- **Automatic Experience Years** - Dynamic calculation (2015 → current year)
- **Theme Persistence** - localStorage-based dark/light mode preference
- **Smooth Transitions** - CSS animations for page elements
- **Interactive Filtering** - Project portfolio filtering
- **Async Form Submission** - Real-time validation with visual feedback
- **ARIA Live Regions** - Accessibility announcements

### Contact Form
- Async form submission with Fetch API
- Real-time validation feedback
- Success/error message display
- Spam protection via Formspree

### Progressive Web App
- Installable on all platforms
- Offline functionality
- Custom icons (192x192, 512x512)
- iOS and Windows specific optimizations

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **Image Optimization**: 92% size reduction for avatars (my-avatar: 251KB → 19KB, my-avatar-1: 1.1MB → 86KB)
- **Total WebP Savings**: 2072K → 1156K overall
- **Codebase Cleanup**: 1.8MB saved by removing legacy PNG images
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Total Blocking Time**: < 300ms
- **Service Worker Cache**: v8 with offline-first strategy
- **Technology Icons**: 70+ tools with optimized hover/tap animations
- **Social Integration**: Facebook, Twitter, LinkedIn, GitHub links

## 📧 Contact

Want to get in touch? Reach out through:

- 🌐 Website: [waqar.eu](https://waqar.eu)
- 📧 Email: [info@waqar.eu](mailto:info@waqar.eu)
- 💼 LinkedIn: [linkedin.com/in/waqar-eu](https://www.linkedin.com/in/waqar-eu/)
- 🐙 GitHub: [@waqarhu](https://github.com/waqarhu)
- 🐦 X (Twitter): [@Waqar_eu](https://x.com/Waqar_eu)
- 📘 Facebook: [facebook.com/WIQI88](https://www.facebook.com/WIQI88)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- WebP conversion optimization with cwebp 1.3.2 (85% quality)
- Service Worker implementation patterns (cache-first strategy, v8)
- Accessibility best practices from WCAG guidelines
- Schema.org structured data specifications
- Google Search Console optimization recommendations
- 99 Names of Allah (Asma ul Husna) Islamic reference
- Fisher-Yates shuffle algorithm for testimonials randomization
- Ionicons library for iconography
- Devicon library for technology logos (70+ icons)

---

<div align="center">

**[⬆ back to top](#-waqar-hussain---devops-engineer-portfolio)**

Made with ❤️ by [Waqar Hussain](https://waqar.eu)

</div>
- Monitoring (Prometheus, Grafana, ELK Stack)
- Infrastructure as Code (Terraform, Ansible)
- IBM InfoSphere & DataStage

## License

MIT
