import React, { useRef, useEffect, useState } from 'react';
import { useLayerStore } from '../../store/layerStore';
import { fadeIn, scaleIn } from '../../lib/animation';
import './NFTPreview.css';

const NFTPreview = ({
  width = 500,
  height = 500,
  className = '',
  children
}) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { layers, selectedTraits } = useLayerStore();

  useEffect(() => {
    const loadAndDrawLayers = async () => {
      if (!canvasRef.current) return;
      
      setIsLoading(true);
      setError(null);
      
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        setError('Canvas context not available');
        setIsLoading(false);
        return;
      }

      try {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Sort layers by z-index
        const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
        
        // Load and draw each visible layer
        for (const layer of sortedLayers) {
          if (!layer.visible) continue;
          
          const selectedAsset = layer.assets?.find(
            asset => asset.id === selectedTraits[layer.id]
          );
          
          if (!selectedAsset) continue;
          
          const image = new Image();
          image.src = selectedAsset.url;
          
          await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(new Error(`Failed to load image: ${selectedAsset.url}`));
          });
          
          // Apply layer properties
          ctx.globalAlpha = layer.opacity ?? 1;
          ctx.globalCompositeOperation = layer.blendMode ?? 'source-over';
          
          // Draw the image
          ctx.drawImage(image, 0, 0, width, height);
        }
        
        // Apply animations
        fadeIn(canvasRef.current);
        scaleIn(canvasRef.current);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load NFT preview');
      } finally {
        setIsLoading(false);
      }
    };

    loadAndDrawLayers();
  }, [layers, selectedTraits, width, height]);

  return (
    <div 
      className={`nft-preview-container ${className}`}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`nft-preview-canvas ${isLoading ? 'loading' : ''}`}
      />
      
      {isLoading && (
        <div className="nft-preview-loading">
          <div className="loading-spinner" />
          <span>Loading NFT...</span>
        </div>
      )}
      
      {error && (
        <div className="nft-preview-error">
          <span>❌ {error}</span>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default NFTPreview;