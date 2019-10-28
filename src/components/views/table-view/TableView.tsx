import { AlloyInstance, AlloySkolem, filtering, sorting } from 'alloy-ts';
import React from 'react';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';
import {
    AlloyNameFn,
    HorizontalAlignment,
    LayoutDirection,
    SigFieldSkolem, SkolemHighlight,
    SkolemViewType,
    TableSortFunction,
    TablesType
} from '../../../util/SterlingTypes';
import View from '../View';
import { nameFunction, } from './TableUtil';
import TableViewSidebar from './TableViewSidebar';
import TableViewStage from './TableViewStage';

export interface ITableViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ITableViewState {
    collapseData: boolean,
    collapseLayout: boolean,
    collapseSidebar: boolean,
    collapseSkolem: boolean,
    collapseTables: boolean,
    items: SigFieldSkolem[],
    itemsSelected: SigFieldSkolem[],
    layoutDirection: LayoutDirection,
    nameFunction: AlloyNameFn,
    removeBuiltin: boolean,
    removeEmpty: boolean,
    removeThis: boolean,
    sidebarSide: ViewSide,
    skolemHighlights: SkolemHighlight[],
    skolemView: SkolemViewType,
    sortPrimary: TableSortFunction,
    sortSecondary: TableSortFunction,
    tableAlignment: HorizontalAlignment,
    tables: TablesType
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    constructor (props: ITableViewProps) {

        super(props);

        const nF = nameFunction(true);
        const sH = props.instance ? this._assignSkolemColors(props.instance.skolems()) : [];

        this.state = {
            collapseData: false,
            collapseLayout: false,
            collapseSidebar: false,
            collapseSkolem: false,
            collapseTables: false,
            items: [],
            itemsSelected: [],
            layoutDirection: LayoutDirection.Row,
            nameFunction: nF,
            removeBuiltin: true,
            removeEmpty: true,
            removeThis: true,
            sidebarSide: SterlingSettings.get('tableViewSidebarSide'),
            skolemHighlights: sH,
            skolemView: SkolemViewType.Highlights,
            sortPrimary: sorting.groupSort(),
            sortSecondary: sorting.sizeSort(),
            tableAlignment: HorizontalAlignment.Left,
            tables: TablesType.All
        };

        this._watchSettings();

    }

    componentDidUpdate (prevProps: ITableViewProps, prevState: ITableViewState): void {

        // We've recieved a new instance to render
        const newInstance = this.props.instance;

        // Only run these updates if the instance has been changed
        if (newInstance !== prevProps.instance) {

            // If there actually isn't a new instance, get rid of all items
            if (!newInstance) {

                this.setState({
                    items: [],
                    itemsSelected: [],
                    skolemHighlights: []
                });

            } else {

                // Compare new items with old items so that we can maintain
                // the list of selected items as we step through instances.
                // Note that the order established here is the order the items
                // will appear in in the sidebar selector

                const alpha = sorting.alphabeticalSort(nameFunction(true));
                const builtin = sorting.builtinSort();

                const newItems = [
                    ...newInstance.signatures().sort(builtin).sort(alpha),
                    ...newInstance.fields().sort(alpha),
                    ...newInstance.skolems().sort(alpha)
                ];

                const oldSelected = prevState.itemsSelected.map(item => item.id());
                const newSelected = newItems.filter(item => oldSelected.includes(item.id()));

                this.setState({
                    items: newItems,
                    itemsSelected: newSelected,
                    skolemHighlights: this._assignSkolemColors(newInstance.skolems())
                });

            }

        }

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const state = this.state;
        const stage = (
            <TableViewStage
                {...state}
                itemsVisible={this._getVisibleItems()}/>
        );
        const sidebar = (
            <TableViewSidebar
                {...state}
                onChooseLayoutDirection={this._onChooseLayoutDirection}
                onChooseSortingFunctions={this._onChooseSortingFunctions}
                onChooseTableAlignment={this._onChooseTableAlignment}
                onChooseTablesType={this._onChooseTablesType}
                onItemsSelected={this._onItemsSelected}
                onToggleBuiltin={this._onToggleBuiltin}
                onToggleCollapseData={this._onToggleCollapseData}
                onToggleCollapseLayout={this._onToggleCollapseLayout}
                onToggleCollapseSidebar={this._onToggleCollapseSidebar}
                onToggleCollapseSkolem={this._onToggleCollapseSkolem}
                onToggleCollapseTables={this._onToggleCollapseTables}
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

    private _assignSkolemColors = (skolems: AlloySkolem[]): SkolemHighlight[] => {

        const colors = ["#2965CC", "#29A634", "#D99E0B", "#D13913", "#8F398F", "#00B3A4", "#DB2C6F", "#9BBF30", "#96622D", "#7157D9"];

        return skolems.map((skolem: AlloySkolem, i: number) => {
            return {
                color: colors[i%skolems.length],
                skolem: skolem
            }
        });

    };

    private _getVisibleItems = (): SigFieldSkolem[] => {

        const type = this.state.tables;

        const items = [...this.state.items];
        const itemsVisible =
            type === TablesType.All ? items :
                type === TablesType.Signatures ? items.filter(filtering.keepSignatures) :
                    type === TablesType.Fields ? items.filter(filtering.keepFields) :
                        type === TablesType.Skolems ? items.filter(filtering.keepSkolems) :
                            type === TablesType.Select ? [...this.state.itemsSelected] : [];


        const pass = () => true;
        const itemsFiltered = type === TablesType.Select
            ? itemsVisible
            : itemsVisible
                .filter(this.state.removeBuiltin ? filtering.removeBuiltins : pass)
                .filter(this.state.removeEmpty ? filtering.removeEmptys : pass);

        return itemsFiltered
            .sort(this.state.sortSecondary)
            .sort(this.state.sortPrimary);

    };
    
    private _onChooseLayoutDirection = (layout: LayoutDirection): void => {
        this.setState({layoutDirection: layout});
    };

    private _onChooseSortingFunctions = (primary: TableSortFunction, secondary: TableSortFunction): void => {
        this.setState({sortPrimary: primary, sortSecondary: secondary});
    };
    
    private _onChooseTableAlignment = (align: HorizontalAlignment): void => {
        this.setState({tableAlignment: align});
    };
    
    private _onChooseTablesType = (type: TablesType): void => {
        this.setState({tables: type});
    };
    
    private _onItemsSelected = (items: SigFieldSkolem[]): void => {
        this.setState({itemsSelected: items, tables: TablesType.Select});
    };
    
    private _onToggleBuiltin = (): void => {
        this.setState({removeBuiltin: !this.state.removeBuiltin});
    };

    private _onToggleCollapseSidebar = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

    private _onToggleCollapseData = (): void => {
        this.setState({collapseData: !this.state.collapseData});
    };

    private _onToggleCollapseLayout = (): void => {
        this.setState({collapseLayout: !this.state.collapseLayout});
    };

    private _onToggleCollapseSkolem = (): void => {
        this.setState({collapseSkolem: !this.state.collapseSkolem});
    };

    private _onToggleCollapseTables = (): void => {
        this.setState({collapseTables: !this.state.collapseTables});
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
