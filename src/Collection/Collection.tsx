import {Component} from "react";
import {Property, PropertyGenerator} from "../Services/PropertyServices/PropertyGenerator";
import {IAutoCollection} from "../AutoCollection/IAutoCollection";

export interface Collection {
    render(): any;

    getData(): any;

    getProperties(): Property[];

    getAutoCollection(): IAutoCollection;
}

interface Props {
    data: any;
    propertyGenerator: PropertyGenerator;
    autoCollection: IAutoCollection;
}

export class CollectionBase extends Component<Props> implements Collection {

    private properties: Property[] | null = null;

    getData(): any {
        return this.props.data;
    }

    getProperties(): Property[] {
        if (this.properties === null) {
            this.properties = this.props.propertyGenerator.generate();
        }
        return this.properties;
    }

    getAutoCollection(): IAutoCollection {
        return this.props.autoCollection;
    }

}