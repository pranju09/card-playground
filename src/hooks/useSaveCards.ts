import { useState, useEffect, useCallback } from 'react';
import { CardItem } from '../types/card';
import { saveData } from '../utils/api';

export function useSaveCards(cards: CardItem[]) {
    const [saving, setSaving] = useState<boolean>(false);
    const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    console.log("hasChanges", hasChanges);

    const saveCards = useCallback(async () => {
        if (hasChanges && !saving) {
            setSaving(true);
            try {
                console.log("Saving card data");
                await saveData("/api/cards", cards);
                setLastSaveTime(new Date());
                setHasChanges(false); // Reset after saving
            } catch (error) {
                console.error("Error saving card data:", error);
            } finally {
                setSaving(false);
            }
        }
    }, [cards, hasChanges, saving]);

    useEffect(() => {
        const saveInterval = setInterval(saveCards, 5000);
        return () => clearInterval(saveInterval);
    }, [saveCards]);

    const markAsChanged = useCallback(() => {
        setHasChanges(true);
    }, []);

    return { saving, lastSaveTime, markAsChanged };
}
