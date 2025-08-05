# 🎨 QRCraft - Modern QR Code Generator

<div align="center">

![QRCraft Logo](https://img.shields.io/badge/QRCraft-Modern%20QR%20Generator-0ea5e9?style=for-the-badge&logo=qr-code&logoColor=white)

**Create beautiful QR codes instantly with our modern, secure generator**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌟 Features](#features) • [🚀 Quick Start](#quick-start) • [📖 Documentation](#documentation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Features

### 🎯 **Core Features**
- **⚡ Instant Generation** - Create QR codes in milliseconds
- **🎨 Modern Design** - Beautiful sky blue theme with smooth animations
- **📱 Responsive** - Perfect on desktop, tablet, and mobile
- **🔒 Privacy First** - No data stored on servers, completely client-side
- **🌈 Customizable** - Full control over colors, sizes, and error correction

### 🛠️ **Advanced Options**
- **Multiple Sizes** - 128px, 256px, 512px, 1024px
- **Error Correction Levels** - L (~7%), M (~15%), Q (~25%), H (~30%)
- **Color Customization** - Custom foreground and background colors
- **Smart Sizing** - Automatic scaling for large QR codes
- **Live Preview** - Real-time updates as you type

### 📥 **Export Formats**
- **PNG** - Perfect for web use and social media
- **SVG** - Vector format for print and scalability  
- **PDF** - Print-ready with QR details included
- **Copy to Clipboard** - Quick sharing capability

### 🎭 **User Experience**
- **Smooth Animations** - Framer Motion powered interactions
- **Glass Morphism** - Modern glass effects and backdrops
- **Gradient Design** - Beautiful sky blue to cyan gradients
- **Toast Notifications** - Success and error feedback
- **Keyboard Shortcuts** - Efficient workflow

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qrcraft.git
   cd qrcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Tech Stack

### **Frontend Framework**
- **Next.js 15.4.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Custom Design System** - Sky blue theme with gradients

### **QR Code Generation**
- **qrcode** - QR code generation library
- **Canvas API** - High-quality rendering
- **jsPDF** - PDF export functionality

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

---

## 📁 Project Structure

```
qrcraft/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Header.tsx     # Application header
│   │   ├── QRGenerator.tsx # Main QR generator
│   │   ├── QRDisplay.tsx   # QR code display & export
│   │   └── CustomizationPanel.tsx # Options panel
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── hooks/                 # Custom React hooks
│   ├── useQRGenerator.ts  # QR generation logic
│   └── useToast.ts       # Toast notifications
├── lib/                   # Utility libraries
│   ├── qr-generator.ts    # Core QR generation
│   ├── file-utils.ts      # File download utilities
│   ├── validation.ts      # Input validation
│   └── utils.ts          # General utilities
├── types/                 # TypeScript definitions
│   ├── index.ts          # General types
│   └── qr.ts            # QR-specific types
└── public/               # Static assets
```

---

## 🎨 Design System

### **Color Palette**
```css
/* Sky Blue System */
--sky-50: #f0f9ff;   /* Lightest backgrounds */
--sky-400: #38bdf8;  /* Primary accent */
--sky-500: #0ea5e9;  /* Primary color */
--sky-600: #0284c7;  /* Primary hover */

/* Gradients */
--primary-gradient: linear-gradient(135deg, #0ea5e9 0%, #22d3ee 50%, #38bdf8 100%);
--accent-gradient: linear-gradient(135deg, #38bdf8 0%, #60a5fa 50%, #a78bfa 100%);
```

### **Typography**
- **Primary Font**: Geist Sans (Vercel's font)
- **Monospace**: Geist Mono for codes
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### **Spacing & Layout**
- **Grid System**: Tailwind's responsive grid
- **Containers**: Centered with max-width constraints
- **Spacing Scale**: Consistent 4px base unit

---

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file:
```bash
# Add any environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Tailwind Configuration**
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Glass morphism utilities
- Responsive breakpoints

---

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Other Platforms**
```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Static Export**
```bash
# Export static files
npm run build && npm run export
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Style**
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for functions

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

- **Documentation**: [GitHub Wiki](https://github.com/yourusername/qrcraft/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/qrcraft/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/qrcraft/discussions)

---

## 🏆 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment platform
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animation library
- **QRCode.js** - QR code generation library

---

<div align="center">

**Made with ❤️ by the QRCraft Team**

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/qrcraft?style=social)](https://github.com/yourusername/qrcraft)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/qrcraft?style=social)](https://github.com/yourusername/qrcraft)

[⬆ Back to Top](#-qrcraft---modern-qr-code-generator)

</div>
