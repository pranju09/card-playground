export type CardType =
    | "bank-draft"
    | "bill-of-lading"
    | "invoice"
    | "bank-draft-2"
    | "bill-of-lading-2";

export interface CardItem {
    type: CardType;
    title: string;
    position: number;
}
