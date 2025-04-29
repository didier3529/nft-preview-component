# NFT Preview Component

A modern React component for previewing NFT layers with canvas rendering, smooth animations, and a polished UI.

## Features

- 🎨 Canvas-based rendering for high-performance layer composition
- ✨ Smooth fade animations and transitions
- 🎯 Support for layer opacity and blend modes
- 🔄 Loading states with animated spinner
- ⚠️ Error handling with styled error messages
- 📱 Responsive design that works at any size
- 🎭 Custom animation utilities for reusability

## Installation

```bash
npm install nft-preview-component
# or
yarn add nft-preview-component
```

## Usage

```jsx
import NFTPreview from 'nft-preview-component';
import { useLayerStore } from './stores';

function App() {
  return (
    <NFTPreview
      width={500}
      height={500}
      className="my-preview"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | number | 500 | Canvas width in pixels |
| height | number | 500 | Canvas height in pixels |
| className | string | '' | Additional CSS classes |

## Layer Store

The component uses a layer store to manage NFT layers. Configure your store like this:

```jsx
const layers = {
  background: {
    id: 'background',
    visible: true,
    opacity: 1,
    zIndex: 0,
    assets: [
      { id: 'bg1', url: 'path/to/bg1.png' }
    ]
  }
  // ... more layers
};

const selectedTraits = {
  background: 'bg1'
  // ... selected assets for each layer
};
```

## Styling

The component comes with default styles but can be customized using CSS:

```css
.nft-preview-container {
  /* Container styles */
}

.nft-preview-wrapper {
  /* Wrapper styles */
}

.nft-preview-canvas {
  /* Canvas styles */
}

.nft-preview-loading {
  /* Loading state styles */
}

.nft-preview-error {
  /* Error state styles */
}
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Run tests: `npm test`

## License

MIT © [Your Name]