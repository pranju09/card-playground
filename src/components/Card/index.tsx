import React from "react";
import "./styles.css";
import { CardProps } from "./type";
import { getThumbnail } from "../../utils";
import { useImageLoader } from "../../hooks/useImageLoader";
import Spinner from "../Spinner";

const Card: React.FC<CardProps> = ({
  cardData,
  onDrop,
  onDragStart,
  onCardClick,
}) => {
  const { loadedImages, handleImageLoad } = useImageLoader();

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="card"
      draggable="true"
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onCardClick}
    >
      <h3>{cardData.title}</h3>
      {!loadedImages[cardData.type] ? <Spinner /> : null}
      <img
        src={getThumbnail(cardData.type)}
        alt={cardData.title}
        className={`thumbnail ${!loadedImages[cardData.type] ? "hidden" : ""}`}
        onLoad={() => handleImageLoad(cardData.type)}
        onError={() => handleImageLoad(cardData.type)}
      />
    </div>
  );
};

export default Card;
