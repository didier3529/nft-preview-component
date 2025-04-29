# NFT Preview Component

A modern, performant React component for previewing NFT artwork with layer management and animation support.

## Features

- 🎨 Canvas-based rendering for optimal performance
- ✨ Smooth animations and transitions
- 🎯 Layer management with z-index and blend modes
- 🌈 Customizable background and dimensions
- 📱 Responsive design
- 🎭 Loading and error states
- 💪 TypeScript support

## Installation

```bash
npm install nft-preview-component
# or
yarn add nft-preview-component
```

## Usage

### Basic Example

```jsx
import NFTPreview from 'nft-preview-component';
import 'nft-preview-component/styles.css';

function App() {
  return (
    <NFTPreview
      width={500}
      height={500}
      className="my-nft-preview"
    />
  );
}
```

### With Layer Management

```jsx
import { useEffect } from 'react';
import NFTPreview from 'nft-preview-component';
import { useLayerStore } from 'nft-preview-component/store';

function NFTGenerator() {
  const { addLayer, updateLayer, setSelectedTrait } = useLayerStore();

  useEffect(() => {
    // Add background layer
    addLayer({
      id: 'background',
      name: 'Background',
      visible: true,
      zIndex: 0,
      assets: [{
        id: 'blue-bg',
        url: '/backgrounds/blue.png'
      }]
    });

    // Add character layer
    addLayer({
      id: 'character',
      name: 'Character',
      visible: true,
      zIndex: 1,
      assets: [{
        id: 'basic-char',
        url: '/characters/basic.png'
      }]
    });

    // Select initial traits
    setSelectedTrait('background', 'blue-bg');
    setSelectedTrait('character', 'basic-char');
  }, []);

  return (
    <div className="nft-generator">
      <NFTPreview width={600} height={600} />
      {/* Add your layer controls here */}
    </div>
  );
}
```

### Configuration

The component accepts the following props:

```typescript
interface NFTPreviewProps {
  width?: number;      // Canvas width in pixels
  height?: number;     // Canvas height in pixels
  className?: string;  // Additional CSS classes
  children?: ReactNode; // Optional child components
}
```

### Layer Management

Layers can be configured with the following options:

```typescript
interface NFTLayer {
  id: string;
  name: string;
  visible: boolean;
  zIndex: number;
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
  assets?: {
    id: string;
    url: string;
  }[];
}
```

## Styling

The component comes with default styles that can be customized using CSS variables:

```css
.nft-preview {
  --nft-preview-bg: #f5f5f5;
  --nft-preview-border: #e0e0e0;
  --nft-preview-shadow: rgba(0, 0, 0, 0.1);
  --nft-preview-radius: 12px;
}
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build: `npm run build`

## License

MIT © [Your Name]