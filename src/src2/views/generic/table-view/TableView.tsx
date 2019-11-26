import React from 'react';
import {
    HorizonalAlignment,
    LayoutDirection,
    SterlingViewProps,
    ViewSide
} from '../../../SterlingTypes';
import SterlingTable from './SterlingTable';
import TableViewSidebar from './TableViewSidebar';
import TableViewStage from './TableViewStage';

interface ITableViewProps extends SterlingViewProps {
    transform: (data: any) => SterlingTable[]
}

interface ITableViewState {
    collapseLayout: boolean,
    collapseSidebar: boolean,
    collapseTables: boolean,
    sidebarSide: ViewSide
}

class TableView extends React.Component<SterlingViewProps, ITableViewState> {

    constructor (props: ITableViewProps) {

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
