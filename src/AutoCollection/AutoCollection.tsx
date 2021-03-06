import React, {Component} from "react";
import {IAutoCollection} from "./IAutoCollection";
import {CollectionRenderer} from "../Services/Renderer/CollectionRenderer";
import {AutoCollectionDefault} from "../Default/AutoCollectionDefault";
import {AutoCollectionProps, AutoCollectionState} from "./AutoCollectionProps";
import {EventManager} from "../Services/EventManager/EventManager";
import {DataFetcher} from "../Services/Fetcher/DataFetcher";
import {PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {DataManager} from "../Services/DataManager/DataManager";
import {ServiceDefault} from "../Default/ServiceDefault";
import {DirectDataFetcher} from "../Services/Fetcher/DirectDataFetcher";
import {HttpDataFetcher} from "../Services/Fetcher/HttpDataFetcher";


export class AutoCollection extends Component<AutoCollectionProps, AutoCollectionState> implements IAutoCollection {

    private readonly renderService: CollectionRenderer<any>;
    private readonly fetcherService: DataFetcher<any>;
    private readonly propertyGenerator: PropertyGenerator;
    private readonly dataManager: DataManager;
    private readonly eventManager: EventManager;

    constructor(props: AutoCollectionProps) {
        super(props);

        const serviceProvider = ServiceDefault.serviceProvider(this);
        this.fetcherService = serviceProvider.getService<DataFetcher<any>>("fetcher", this, this.getDefaultFetcher);
        this.renderService = serviceProvider.getService<CollectionRenderer<any>>("renderer", this);
        this.propertyGenerator = serviceProvider.getService<PropertyGenerator>("propertyGenerator", this);
        this.dataManager = serviceProvider.getService<DataManager>("dataManager", this);
        this.eventManager = serviceProvider.getService<EventManager>("eventManager", this);

        this.state = {
            filtered: false,
            all: AutoCollectionDefault.initialData,
            data: AutoCollectionDefault.initialData,
            loading: false,
            error: null
        };

        const keys = Object.keys(props.on ?? {});
        keys.forEach(key => this.event().addListener(key, (props.on as any)[key]));
    }

    private getDefaultFetcher = () => {
        if (this.props.extra?.dataSourceOptions?.data) {
            return new DirectDataFetcher(this);
        } else if (this.props.extra?.dataSourceOptions?.url) {
            return new HttpDataFetcher(this);
        }
        return undefined;
    }

    getPropertyGenerator(): PropertyGenerator {
        return this.propertyGenerator;
    }

    componentDidMount() {
        this.fetchData();
    }


    componentWillUnmount() {
        this.event().clearAllListeners();
        this.fetcherService.cancel();
    }


    render() {
        return this.renderService.render();
    }

    event(): EventManager {
        return this.eventManager;
    }

    data(): DataManager {
        return this.dataManager;
    }

    getProps(): AutoCollectionProps {
        return this.props;
    }

    getError(): any {
        return this.state.error;
    }

    isLoading(): boolean {
        return this.state.loading;
    }

    getState(): AutoCollectionState {
        return this.state;
    }

    refreshData(): void {
        if (!this.isLoading()) {
            this.fetchData();
        }
    }

    updateState(state: Partial<AutoCollectionState>, afterChange?: () => void) {
        console.log("UPDATE STATE", state);
        return this.setState(state as any, afterChange);
    }

    private fetchData(): void {
        // noinspection JSIgnoredPromiseFromCall
        this.fetcherService.fetch();
    }


}