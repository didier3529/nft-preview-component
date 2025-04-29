import { ReactNode } from 'react';

export interface NFTLayer {
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

export interface NFTPreviewConfig {
  width?: number;
  height?: number;
  background?: string;
}

export interface NFTPreviewProps {
  width?: number;
  height?: number;
  className?: string;
  children?: ReactNode;
}

export interface LayerStore {
  layers: Record<string, NFTLayer>;
  layerOrder: string[];
  selectedTraits: Record<string, string>;
  previewConfig?: NFTPreviewConfig;
}

declare const NFTPreview: React.FC<NFTPreviewProps>;

export default NFTPreview;