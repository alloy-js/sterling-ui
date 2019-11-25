import React from 'react';
import SterlingTable from './SterlingTable';

interface ITableViewProps {
    tables: SterlingTable[]
    visible: boolean
}

interface ITableViewState {
    collapseLayout: boolean,
    collapseSidebar: boolean,
    collapseTables: boolean
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    constructor (props: ITableViewProps) {

        super(props);

    }

    render (): React.ReactNode {

        return <div></div>;

    }

}

export default TableView;
