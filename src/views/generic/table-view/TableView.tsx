import React from 'react';
import {
    HorizontalAlignment,
    ISterlingViewProps,
    LayoutDirection,
    ViewSide
} from '../../../SterlingTypes';
import Table, { TableSortFn } from './Table';
import TableViewSidebar from './TableViewSidebar';
import TableViewStage from './TableViewStage';

export interface ITableViewState {
    collapseData: boolean,
    collapseLayout: boolean,
    collapseSidebar: boolean,
    layoutDirection: LayoutDirection,
    removeEmpty: boolean,
    sidebarSide: ViewSide,
    sortPrimary: TableSortFn,
    sortSecondary: TableSortFn,
    tableAlignment: HorizontalAlignment
}

class TableView extends React.Component<ISterlingViewProps, ITableViewState> {

    constructor (props: ISterlingViewProps) {

        super(props);

        this.state = {
            collapseData: false,
            collapseLayout: false,
            collapseSidebar: false,
            layoutDirection: LayoutDirection.Row,
            removeEmpty: true,
            sidebarSide: ViewSide.Left,
            sortPrimary: Table.alphabeticalSort(),
            sortSecondary: Table.sizeSort(),
            tableAlignment: HorizontalAlignment.Left
        };

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        const tables = state.removeEmpty
            ? props.data.filter((table: Table) => table.data().length > 0)
            : props.data;

        const sorted = tables
            .sort(state.sortSecondary)
            .sort(state.sortPrimary);

        const stage = (
            <TableViewStage
                horizontalAlign={state.tableAlignment}
                layoutDirection={state.layoutDirection}
                tables={sorted} />
        );

        const sidebar = (
            <TableViewSidebar
                {...state}
                onChooseLayoutDirection={this._onChooseLayoutDirection}
                onChooseSortingFunctions={this._onChooseSortingFunctions}
                onChooseTableAlignment={this._onChooseTableAlignment}
                onToggleCollapseData={this._onToggleCollapseData}
                onToggleCollapseLayout={this._onToggleCollapseLayout}
                onToggleCollapseSidebar={this._onToggleCollapseSidebar}
                onToggleEmpty={this._onToggleEmpty}/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

    private _onChooseLayoutDirection = (layout: LayoutDirection): void => {
        this.setState({layoutDirection: layout});
    };

    private _onChooseSortingFunctions = (primary: TableSortFn, secondary: TableSortFn): void => {
        this.setState({sortPrimary: primary, sortSecondary: secondary});
    };

    private _onChooseTableAlignment = (align: HorizontalAlignment): void => {
        this.setState({tableAlignment: align});
    };

    private _onToggleCollapseData = (): void => {
        this.setState({collapseData: !this.state.collapseData});
    };

    private _onToggleCollapseSidebar = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

    private _onToggleCollapseLayout = (): void => {
        this.setState({collapseLayout: !this.state.collapseLayout});
    };

    private _onToggleEmpty = (): void => {
        this.setState({removeEmpty: !this.state.removeEmpty});
    };

}

export default TableView;
