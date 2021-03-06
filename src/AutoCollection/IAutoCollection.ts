import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {EventManager} from "../Services/EventManager/EventManager";
import {DataManager} from "../Services/DataManager/DataManager";
import {PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";

export interface IAutoCollection {

    getPropertyGenerator(): PropertyGenerator;

    render(): any;

    getProps(): AutoCollectionProps;

    event(): EventManager;

    refreshData(): void;

    isLoading(): boolean;

    getError(): any;

    data(): DataManager;

    updateState(state: Partial<AutoCollectionState>, afterChange?: () => void): void;

    getState(): AutoCollectionState;
}






