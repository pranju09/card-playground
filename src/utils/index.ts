
import { catIcon, bankDraftIcon, moneyTransferIcon, billOfLadingIcon, invoiceIcon } from '../assets/icons';

export const getThumbnail = (type: string): string => {
    switch (type) {
        case 'bank-draft':
            return catIcon;
        case 'bank-draft-2':
            return bankDraftIcon;
        case 'bill-of-lading':
            return moneyTransferIcon;
        case 'bill-of-lading-2':
            return billOfLadingIcon;
        case 'invoice':
            return invoiceIcon;
        default:
            return '';
    }
};

export function getLastSavedTime(lastSaveTime: Date | null): number {
    if (!lastSaveTime) return 0;
    console.log({ lastSaveTime });
    return Math.round((new Date().getTime() - lastSaveTime.getTime()) / 1000);
}