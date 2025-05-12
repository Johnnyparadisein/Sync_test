# Modern AI Solutions & Creative Services Website

A modern, responsive website showcasing AI solutions and creative services with beautiful animations and interactive features.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Interactive particle effects background
- Form validation and submission handling
- FAQ accordion functionality
- Smooth scrolling navigation
- Mobile-friendly navigation menu
- Notification system for user feedback
- Portfolio showcase with filtering
- Team member profiles
- Testimonials section
- Contact form with validation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd buffai-website
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm start
```

This will start a live-server instance and open the website in your default browser. The server will automatically reload when you make changes to the files.

## Building for Production

To build the production-ready files:
```bash
npm run build
```

This will:
- Minify and optimize CSS
- Minify and optimize JavaScript
- Generate production-ready files in the assets directory

## Project Structure

```
buffai-website/
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── main.min.css (generated)
│   ├── js/
│   │   ├── main.js
│   │   └── main.min.js (generated)
│   ├── images/
│   └── fonts/
├── components/
├── index.html
├── package.json
└── README.md
```

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS Grid, Flexbox, and CSS Variables)
- JavaScript (ES6+)
- tsParticles for interactive background
- PostCSS for CSS processing
- Terser for JavaScript minification
- Live Server for development

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or suggestions, please open an issue in the repository.

## Improvements

- Enhanced accessibility: ARIA attributes, keyboard navigation, visible focus styles, skip link
- SEO: Added meta description, Open Graph, Twitter Card tags
- Performance: JS scripts deferred, images lazy-loaded, suggestions for PurgeCSS and HTML minification
- PWA: Added manifest and favicon support
- UI/UX: Improved Back to Top button, dark mode toggle, FAQ accordion accessibility
- Contact form: ARIA live region for feedback

## Deployment

To deploy, upload all files to your web server. For best performance, use the production build (`npm run build`).

## Troubleshooting

- If styles/scripts do not update, clear your browser cache.
- Ensure your server supports serving the manifest and favicon files.
- For accessibility, test with keyboard and screen reader.
- If you want to further reduce CSS size, integrate PurgeCSS in your build process.
- For HTML minification, use a tool like html-minifier in your deployment pipeline. 