import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import TableViewSideBar from './TableViewSideBar';
import TableViewStage from './TableViewStage';

export interface TableViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

class TableView extends React.Component<TableViewProps> {

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='th' showPlaceholder={!this.props.instance}>
                <TableViewSideBar/>
                <TableViewStage/>
            </View>
        );

    }

}

export default TableView;
