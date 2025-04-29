import { create } from 'zustand';

export const useLayerStore = create((set) => ({
  layers: [],
  selectedTraits: {},
  
  addLayer: (layer) => set((state) => ({
    layers: [...state.layers, layer]
  })),
  
  updateLayer: (id, updates) => set((state) => ({
    layers: state.layers.map((layer) =>
      layer.id === id ? { ...layer, ...updates } : layer
    )
  })),
  
  removeLayer: (id) => set((state) => ({
    layers: state.layers.filter((layer) => layer.id !== id)
  })),
  
  setSelectedTrait: (layerId, assetId) => set((state) => ({
    selectedTraits: {
      ...state.selectedTraits,
      [layerId]: assetId
    }
  }))
}));