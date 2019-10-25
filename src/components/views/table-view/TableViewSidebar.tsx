import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import DataSection from './sidebar-components/DataSection';
import LayoutSection from './sidebar-components/LayoutSection';
import TablesSection from './sidebar-components/TablesSection';
import { ITableViewState } from './TableView';
import {
    HorizontalAlignment,
    LayoutDirection,
    SigFieldSkolem,
    TableSortFunction,
    TablesType
} from '../../../util/SterlingTypes';


export interface ITableViewSidebarProps extends ITableViewState {
    onChooseLayoutDirection: (layout: LayoutDirection) => void,
    onChooseSortingFunctions: (primary: TableSortFunction, secondary: TableSortFunction) => void,
    onChooseTableAlignment: (align: HorizontalAlignment) => void,
    onChooseTablesType: (type: TablesType) => void,
    onItemsSelected: (items: SigFieldSkolem[]) => void,
    onToggleBuiltin: () => void,
    onToggleCollapseData: () => void,
    onToggleCollapseLayout: () => void,
    onToggleCollapseSidebar: () => void,
    onToggleCollapseTables: () => void,
    onToggleEmpty: () => void,
    onToggleRemoveThis: () => void
}

class TableViewSidebar extends React.Component<ITableViewSidebarProps> {

    render (): React.ReactNode {

        const {
            onChooseLayoutDirection,
            onChooseSortingFunctions,
            onChooseTableAlignment,
            onChooseTablesType,
            onItemsSelected,
            onToggleBuiltin,
            onToggleCollapseData,
            onToggleCollapseLayout,
            onToggleCollapseSidebar,
            onToggleCollapseTables,
            onToggleEmpty,
            onToggleRemoveThis,
            ...viewState
        } = this.props;

        return (
            <SterlingSidebar
                collapsed={viewState.collapseSidebar}
                onToggleCollapse={onToggleCollapseSidebar}
                sidebarSide={this.props.sidebarSide}
                title='Table View Settings'>

                <TablesSection
                    {...viewState}
                    onChooseTablesType={onChooseTablesType}
                    onItemsSelected={onItemsSelected}
                    onToggleCollapse={onToggleCollapseTables}/>

                <DataSection
                    {...viewState}
                    onToggleBuiltin={onToggleBuiltin}
                    onToggleCollapse={onToggleCollapseData}
                    onToggleEmpty={onToggleEmpty}
                    onToggleRemoveThis={onToggleRemoveThis}/>

                <LayoutSection
                    {...viewState}
                    onChooseLayoutDirection={onChooseLayoutDirection}
                    onChooseSortingFunctions={onChooseSortingFunctions}
                    onChooseTableAlignment={onChooseTableAlignment}
                    onToggleCollapse={onToggleCollapseLayout}/>

            </SterlingSidebar>
        );

    }


}

export default TableViewSidebar;
