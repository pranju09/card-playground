import { useState, useCallback } from 'react';
import { CardType } from '../types/card';

const initialLoadedState: Record<CardType, boolean> = {
    "bank-draft": false,
    "bill-of-lading": false,
    invoice: false,
    "bank-draft-2": false,
    "bill-of-lading-2": false,
};

export const useImageLoader = () => {
    const [loadedImages, setLoadedImages] = useState(initialLoadedState);

    const handleImageLoad = useCallback((type: CardType) => {
        setLoadedImages(prev => ({ ...prev, [type]: true }));
    }, []);

    return { loadedImages, handleImageLoad };
};
