import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import {
    alphaSort, extractFields,
    extractSignatures, extractSkolems,
    nameFunction,
    numSort,
    SigFieldSkolem
} from './TableUtil';
import TableViewSidebar, { TableSortFunction } from './TableViewSidebar';
import TableViewStage from './TableViewStage';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';

export enum LayoutDirection { Row, Column}
export enum TableAlignment { Left, Center, Right }
export enum TablesType { All, Signatures, Fields, Skolems, Select}

export interface ITableViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ITableViewState {
    items: SigFieldSkolem[],
    itemsSelected: SigFieldSkolem[],
    itemsVisible: SigFieldSkolem[],
    layoutDirection: LayoutDirection,
    nameFunction: (item: SigFieldSkolem) => string,
    removeBuiltin: boolean,
    removeEmpty: boolean,
    removeThis: boolean,
    sidebarSide: ViewSide,
    sortPrimary: TableSortFunction,
    sortSecondary: TableSortFunction,
    tableAlignment: TableAlignment,
    tables: TablesType
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    constructor (props: ITableViewProps) {

        super(props);

        const nF = nameFunction(true);

        this.state = {
            items: [],
            itemsSelected: [],
            itemsVisible: [],
            layoutDirection: LayoutDirection.Row,
            nameFunction: nF,
            removeBuiltin: true,
            removeEmpty: true,
            removeThis: true,
            sidebarSide: SterlingSettings.get('tableViewSidebarSide'),
            sortPrimary: alphaSort(nF),
            sortSecondary: numSort(),
            tableAlignment: TableAlignment.Left,
            tables: TablesType.All
        };

        this._watchSettings();

    }

    componentDidUpdate (
        prevProps: Readonly<ITableViewProps>,
        prevState: Readonly<ITableViewState>): void {

        // We've recieved a new instance to render
        const newInstance = this.props.instance;

        // Only run these updates if the instance has been changed
        if (newInstance !== prevProps.instance) {

            // If there actually isn't a new instance, get rid of all items
            if (!newInstance) {

                this.setState({
                    items: [],
                    itemsSelected: [],
                    itemsVisible: []
                });

            } else {

                // Compare new items with old items so that we can maintain
                // the list of selected items as we step through instances

                const newItems = [
                    ...newInstance.signatures(),
                    ...newInstance.fields(),
                    ...newInstance.skolems()
                ];

                const oldSelected = prevState.itemsSelected.map(item => item.id());
                const newSelected = newItems.filter(item => oldSelected.includes(item.id()));

                // Determine the set of visible items based on tables selection
                const tables = this.state.tables;
                const newVisible = tables === TablesType.All
                    ? [...newItems] : tables === TablesType.Signatures
                    ? newItems.filter(extractSignatures) : tables === TablesType.Fields
                    ? newItems.filter(extractFields) : tables === TablesType.Skolems
                    ? newItems.filter(extractSkolems) : tables === TablesType.Select
                    ? [...newSelected]
                        : [];

                this.setState({
                    items: newItems,
                    itemsSelected: newSelected,
                    itemsVisible: newVisible
                });

            }

        }

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const state = this.state;
        const stage = (
            <TableViewStage {...state}/>
        );
        const sidebar = (
            <TableViewSidebar
                {...state}
                onChooseLayoutDirection={this._onChooseLayoutDirection}
                onChooseSortingFunctions={this._onChooseSortingFunctions}
                onChooseTableAlignment={this._onChooseTableAlignment}
                onChooseTablesType={this._onChooseTablesType}
                onItemsSelected={this._onItemsSelected}
                onItemsVisible={this._onItemsVisible}
                onSelectItems={this._onSelectItems}
                onToggleBuiltin={this._onToggleBuiltin}
                onToggleEmpty={this._onToggleEmpty}
                onToggleRemoveThis={this._onToggleRemoveThis}
            />
        );

        return (
            <View icon='th' showPlaceholder={!this.props.instance}>
                {
                    this.state.sidebarSide === ViewSide.Left
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }
    
    private _onChooseLayoutDirection = (layout: LayoutDirection): void => {
        this.setState({layoutDirection: layout});
    };

    private _onChooseSortingFunctions = (primary: TableSortFunction, secondary: TableSortFunction): void => {
        this.setState({sortPrimary: primary, sortSecondary: secondary});
    };
    
    private _onChooseTableAlignment = (align: TableAlignment): void => {
        this.setState({tableAlignment: align});
    };
    
    private _onChooseTablesType = (type: TablesType): void => {
        this.setState({tables: type});
    };
    
    private _onItemsSelected = (items: SigFieldSkolem[]): void => {
        this.setState({itemsSelected: items});
    };
    
    private _onItemsVisible = (items: SigFieldSkolem[]): void => {
        this.setState({itemsVisible: items});
    };
    
    private _onSelectItems = (items: SigFieldSkolem[]): void => {
        this.setState({itemsSelected: items});
    };
    
    private _onToggleBuiltin = (): void => {
        this.setState({removeBuiltin: !this.state.removeBuiltin});
    };
    
    private _onToggleEmpty = (): void => {
        this.setState({removeEmpty: !this.state.removeEmpty});
    };
    
    private _onToggleRemoveThis = (): void => {
        const newRemove = !this.state.removeThis;
        const newNameFn = nameFunction(newRemove);
        this.setState({removeThis: newRemove, nameFunction: newNameFn});
    };

    private _watchSettings () {

        SterlingSettings.watch('tableViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        });

    }

}

export default TableView;
