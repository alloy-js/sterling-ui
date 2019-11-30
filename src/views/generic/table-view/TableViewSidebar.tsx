import React from 'react';
import { HorizontalAlignment, LayoutDirection } from '../../../SterlingTypes';
import SterlingSidebar from '../../SterlingSidebar';
import DataSection from './sidebar-components/DataSection';
import LayoutSection from './sidebar-components/LayoutSection';
import { TableSortFn } from './Table';
import { ITableViewState } from './TableView';

export interface ITableViewSidebarProps extends ITableViewState {
    onChooseLayoutDirection: (dir: LayoutDirection) => void,
    onChooseTableAlignment: (align: HorizontalAlignment) => void,
    onChooseSortingFunctions: (primary: TableSortFn, secondary: TableSortFn) => void,
    onToggleCollapseData: () => void,
    onToggleCollapseLayout: () => void,
    onToggleCollapseSidebar: () => void,
    onToggleEmpty: () => void
}


class TableViewSidebar extends React.Component<ITableViewSidebarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar
                collapsed={props.collapseSidebar}
                onToggleCollapse={props.onToggleCollapseSidebar}
                sidebarSide={props.sidebarSide}
                title={'Table Settings'}>

                <DataSection {...props}/>
                <LayoutSection {...props}/>

            </SterlingSidebar>
        );

    }

}

export default TableViewSidebar;
