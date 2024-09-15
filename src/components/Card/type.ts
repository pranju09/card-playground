import { CardItem } from "../../types/card";

export interface CardProps {
    cardData: CardItem
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onCardClick: () => void;
}
