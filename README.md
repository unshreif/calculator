# Calculator Web App

A modern, elegant calculator web application that works offline and can be installed on your devices.


## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Percentage calculations
- Clean, responsive design
- Works across all modern browsers
- Installable as a Progressive Web App (PWA)
- Offline functionality

## Installation

You can use this calculator in two ways:

### Method 1: Use Online

Simply visit the hosted version of the calculator at [vercel]([https://your-website.com/calculator](https://calculator-phi-weld-52.vercel.app/)).

### Method 2: Install as PWA

1. Open the calculator in a compatible browser (Chrome, Edge, Safari, etc.)
2. You'll see an "Install App" button
3. Click the button to install the calculator on your device
4. The calculator will now appear as an app on your device

### Method 3: Manual Installation

To set up the calculator locally:

1. Clone this repository:
```
git clone https://github.com/yourusername/calculator.git
```

2. Navigate to the project folder:
```
cd calculator
```

3. Open `index.html` in your browser or use a local server:
```
# Using Python's simple HTTP server
python -m http.server
```

4. Access the calculator at `http://localhost:8000`

## Development

The project structure is organized as follows:

- `index.html` - Main HTML structure
- `style.css` - All styling and responsive design
- `index.js` - Calculator logic and functionality
- `service-worker.js` - Enables offline functionality
- `manifest.json` - Configures the PWA behavior
- `icons/` - Contains app icons in different sizes
- `screenshots/` - Contains screenshots for app stores/documentation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
