import { MenuChoice } from './menuChoice';

export class Menu {
    name           : string;
    userName       : string;
    choices        : MenuChoice[];
    selectedChoice : MenuChoice;
}