import React, { useState, useEffect, useCallback, useRef } from "react";
import { CardItem, CardType } from "../../types/card";
import { fetchData } from "../../utils/api";
import { getThumbnail } from "../../utils";
import { getLastSavedTime } from "../../utils";
import { useSaveCards } from "../../hooks/useSaveCards";
import "./styles.css";
import Card from "../Card";
import Spinner from "../Spinner";

function CardList() {
  const dragIndexRef = useRef<number | null>(null);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { saving, lastSaveTime, markAsChanged } = useSaveCards(cards);

  const loadCards = useCallback(async () => {
    try {
      const cardsData = await fetchData<CardItem[]>("/api/cards");
      setCards(cardsData);
    } catch (error) {
      console.log("Error loading card data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const closeOverlay = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOverlay]);

  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, index: number) => {
      dragIndexRef.current = index;
    },
    []
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
      e.preventDefault();
      const dragIndex = dragIndexRef.current;
      if (dragIndex === null || dragIndex === dropIndex) return;

      setCards((prevCards) => {
        const newCards = [...prevCards];
        const [reorderedItem] = newCards.splice(dragIndex, 1);
        newCards.splice(dropIndex, 0, reorderedItem);
        return newCards;
      });
      markAsChanged();
      console.log("HasChanges set to true");
      dragIndexRef.current = null;
    },
    [markAsChanged]
  );

  const handleCardClick = useCallback((type: CardType) => {
    setSelectedImage(getThumbnail(type));
  }, []);

  return (
    <div>
      <h2>Card List</h2>
      {saving && <Spinner />}
      {lastSaveTime && (
        <p>Last saved: {getLastSavedTime(lastSaveTime)} seconds ago</p>
      )}
      <div className="card-grid" data-testid="card-grid">
        {loading ? (
          <Spinner />
        ) : (
          cards.map((card, index) => (
            <Card
              key={index}
              cardData={card}
              onDrop={(e) => onDrop(e, index)}
              onDragStart={(e) => onDragStart(e, index)}
              onCardClick={() => handleCardClick(card.type)}
            />
          ))
        )}
      </div>
      {selectedImage && (
        <div className="overlay" onClick={closeOverlay}>
          <img
            src={selectedImage}
            alt="Selected card"
            className="overlay-image"
          />
        </div>
      )}
    </div>
  );
}

export default CardList;
