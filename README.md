# AstraFormBuilder – GitHub Distribution Package

🚀 **Ready-to-use** compiled and **minified** version of **Astra Form Builder v0.1.6**, a modern and extensible drag-and-drop form builder developed by **Astra Dev** in pure TypeScript.

⚠️ **PRIVATE PACKAGE** – Currently under active development and distributed via GitHub Package Registry.

---

## 📦 Installation (GitHub Package Registry)

### Prerequisites

```bash
# Configure NPM to use GitHub Package Registry for @astradevio packages
npm login --scope=@astradevio --registry=https://npm.pkg.github.com
```

### Authentication

1. Generate a Personal Access Token with `read:packages` scope
2. Login to GitHub Package Registry:
```bash
npm login --scope=@astradevio --registry=https://npm.pkg.github.com
```

3. Configure .npmrc for scoped packages:
```bash
echo "@astradevio:registry=https://npm.pkg.github.com" >> .npmrc
```

### Install Package

```bash
# Install from GitHub Package Registry
npm install @astradevio/astra-form-builder

# Or install directly from repository
npm install git+https://github.com/astradevio/astra-form-builder-dist.git
```

---

## 🚀 Quick Start

### HTML Integration

```html
<div id="form-builder"></div>
<script src="node_modules/@astradevio/astra-form-builder/astra-form-builder.bundle.min.js"></script>
<script>
    const formBuilder = new FormBuilder(document.getElementById('form-builder'));
</script>
```

### TypeScript Usage

```ts
import { FormBuilder } from '@astradevio/astra-form-builder';

const container = document.getElementById('form-builder');
const formBuilder = new FormBuilder(container);
```

---

## 📁 Package Contents

- `astra-form-builder.bundle.min.js` – Minified JS bundle (all-in-one)
- `main.d.ts` – TypeScript definitions
- `styles.min.css` – Core styles (minified)
- `basic.min.css` – Basic theme
- `preview.min.css` – Preview styles
- `tailwind.min.css` – Tailwind theme
- `package.json` – NPM metadata
- `README.md` – You are here ✅

---

## 🌟 Features

- 🧩 **Drag & Drop** – Add fields intuitively via canvas
- ⚡ **Click-to-Add** – Quick form creation with a click
- 🧠 **Extensible Elements** – Add custom components via plugin system
- 🧰 **Toolbox Configurable** – Show/hide and reorder elements
- 💾 **Export Options** – JSON and HTML (Basic, Bootstrap, Tailwind)
- 📐 **Responsive Design** – Optimized for desktop use
- 🧪 **Full TypeScript API** – Reliable integration and maintenance

---

## 🧩 Supported Form Elements

- All main HTML elements are supported. 

- **Text** – Single-line input
- **Email** – With validation
- **Textarea** – Multi-line field
- **Number** – With min/max
- **Select** – Configurable dropdown
- **Checkbox** – Boolean selector

Improvements in some form components are comming...

---

## 🐛 Known Issues

- Mobile: UI optimized for desktop – not yet touch-friendly
- Performance: Rendering many components may degrade responsiveness
- Browser: Tested on Chrome and Firefox (latest versions)

---

## 📋 GitHub Package Notes

### Authentication

1. Create a **GitHub Personal Access Token** with `read:packages` scope
2. Log in to GitHub Registry:

```bash
npm login --scope=@astradevio --registry=https://npm.pkg.github.com
```

---

## 🔗 Links

- 🏠 **Main Repository**: Reserved
- 📦 **GitHub Distribution**: [https://github.com/astradevio/astra-form-builder-dist](https://github.com/astradevio/astra-form-builder-dist)
- 🌍 **NPM Registry (Public)**: [npmjs.com/package/@astradevio/astra-form-builder](https://www.npmjs.com/package/@astradevio/astra-form-builder)
- 📦 **Direct Git**: `npm install git+https://github.com/astradevio/astra-form-builder-dist-github.git`
- ❗ **Issues**: [Bug Tracker](https://github.com/astradevio/astra-form-builder-dist/issues)
- 🧪 **GitHub Package**: [`@astradevio/astra-form-builder`](https://github.com/astradevio/astra-form-builder/packages)

### 🌍 Available Distributions

This package is available on multiple platforms:

- **NPM Registry (Public)**: `npm install @astradevio/astra-form-builder` - No authentication required
- **GitHub Package Registry (Private)**: Requires GitHub authentication and token
- **Direct Git**: `npm install git+https://github.com/astradevio/astra-form-builder-dist-github.git`

---

## 📞 Support

- Open an issue on GitHub
- Use inline documentation
- Use `FormBuilderDebug.exportConsole()` in browser console to debug the current state

---

## 📄 License

MIT License – see the [LICENSE](./LICENSE.md) file for details.

---

## 🏢 About Astra Dev

**AstraFormBuilder** is a project by **Astra Dev**, a company specialized in building smart, modular, and high-performance web applications.

- 🌐 Website: [https://www.astradev.io](https://www.astradev.io)
- 📧 Contact: developer@astradev.io

---

**Version**: 0.1.6 – MVP  
**Platform**: GitHub  
**Status**: 🔒 Private Distribution  
**Last updated**: 2025-08-01

> 📝 *README also available in [Português (Brasil)](README.pt-BR.md)*

---

**AstraFormBuilder** – Building smart forms for the future 🚀
