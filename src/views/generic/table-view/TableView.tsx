import React from 'react';
import {
    HorizonalAlignment,
    ISterlingViewProps,
    LayoutDirection,
    ViewSide
} from '../../../SterlingTypes';
import TableViewSidebar from './TableViewSidebar';
import TableViewStage from './TableViewStage';

interface ITableViewState {
    collapseLayout: boolean,
    collapseSidebar: boolean,
    collapseTables: boolean,
    sidebarSide: ViewSide
}

class TableView extends React.Component<ISterlingViewProps, ITableViewState> {

    constructor (props: ISterlingViewProps) {

        super(props);

        this.state = {
            collapseLayout: false,
            collapseSidebar: false,
            collapseTables: false,
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;
        const tables = props.data;

        const stage = (
            <TableViewStage
                horizontalAlign={HorizonalAlignment.Left}
                layoutDirection={LayoutDirection.Row}
                tables={tables} />
        );

        const sidebar = (
            <TableViewSidebar/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

}

export default TableView;
