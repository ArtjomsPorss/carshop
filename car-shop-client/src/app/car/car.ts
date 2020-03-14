import { SelectedOption } from '../option/selected-option';

export interface Car {
    id: number;
    make: string;
    model: string;
    edition: string;
    price: number;
    selectedOptions: SelectedOption[];
}