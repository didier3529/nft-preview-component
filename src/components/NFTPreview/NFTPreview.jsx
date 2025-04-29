import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useLayerStore } from '../../stores';
import { createFadeAnimation } from '../../lib/animation';
import './NFTPreview.css';

// Constants
const DEFAULT_DIMENSIONS = {
  width: 500,
  height: 500
};

// Error handling
const handleRenderingError = (err, setError) => {
  console.error("NFT Rendering error:", err);
  setError(err.message || 'Error rendering NFT preview');
};

// Helper function to load and draw an image
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

const NFTPreview = ({ 
  width = DEFAULT_DIMENSIONS.width, 
  height = DEFAULT_DIMENSIONS.height,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnimation = useRef(null);

  // Get layers from store with proper type handling
  const { 
    layers,
    layerOrder,
    selectedTraits,
    previewConfig = DEFAULT_DIMENSIONS
  } = useLayerStore();

  // Initialize fade animation
  useEffect(() => {
    if (containerRef.current) {
      fadeAnimation.current = createFadeAnimation(containerRef.current, {
        duration: 300,
        easing: 'ease-in-out'
      });
      fadeAnimation.current?.play();
    }
    return () => {
      fadeAnimation.current?.stop();
    };
  }, []);

  // Memoize visible layers in correct order
  const visibleLayers = useMemo(() => {
    return layerOrder
      .map(id => layers[id])
      .filter(layer => layer && layer.visible)
      .sort((a, b) => a.zIndex - b.zIndex);
  }, [layers, layerOrder]);

  // Render layers to canvas
  useEffect(() => {
    const renderLayers = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Could not get canvas context');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Set background if configured
        if (previewConfig.background) {
          ctx.fillStyle = previewConfig.background;
          ctx.fillRect(0, 0, width, height);
        }

        // Draw each visible layer
        for (const layer of visibleLayers) {
          const selectedAssetId = selectedTraits[layer.id];
          const selectedAsset = layer.assets?.find(asset => asset.id === selectedAssetId);
          
          if (selectedAsset?.url) {
            try {
              const image = await loadImage(selectedAsset.url);
              
              // Apply layer opacity if set
              const previousAlpha = ctx.globalAlpha;
              if (layer.opacity !== undefined) {
                ctx.globalAlpha = layer.opacity;
              }

              // Apply blend mode if set
              const previousComposite = ctx.globalCompositeOperation;
              if (layer.blendMode) {
                ctx.globalCompositeOperation = layer.blendMode;
              }

              // Draw the image
              ctx.drawImage(image, 0, 0, width, height);

              // Restore previous canvas state
              ctx.globalAlpha = previousAlpha;
              ctx.globalCompositeOperation = previousComposite;
            } catch (err) {
              console.warn(`Failed to render layer ${layer.id}:`, err);
              // Continue with other layers
            }
          }
        }
      } catch (err) {
        handleRenderingError(err, setError);
      } finally {
        setIsLoading(false);
      }
    };

    renderLayers();
  }, [visibleLayers, selectedTraits, width, height, previewConfig]);

  return (
    <div className={`nft-preview-container ${className}`} ref={containerRef}>
      <div className="nft-preview-wrapper">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`nft-preview-canvas ${isLoading ? 'loading' : ''}`}
        />
        {isLoading && (
          <div className="nft-preview-loading">
            <div className="nft-preview-spinner"></div>
            <span className="nft-preview-loading-text">Loading...</span>
          </div>
        )}
        {error && (
          <div className="nft-preview-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTPreview;