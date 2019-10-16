import React from 'react';
import TableViewSideBar from '../bars/TableViewSideBar';
import View from './View';
import { AlloyInstance } from 'alloy-ts';

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
                <svg id='stage'/>
            </View>
        );

    }

}

export default TableView;
