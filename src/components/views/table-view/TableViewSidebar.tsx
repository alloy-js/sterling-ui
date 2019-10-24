import {
    AlloyField,
    AlloyInstance,
    AlloySignature,
    AlloySkolem
} from 'alloy-ts';
import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import { alphaSort, builtinSort, SigFieldSkolem } from './TableUtil';
import {
    ITableViewState,
    LayoutDirection,
    TableAlignment,
    TablesType
} from './TableView';
import TablesSection from './sidebar-components/TablesSection';
import DataSection from './sidebar-components/DataSection';
import LayoutSection from './sidebar-components/LayoutSection';

export type TableSortFunction = (a: SigFieldSkolem, b: SigFieldSkolem) => number;

export interface ITableViewSidebarProps extends ITableViewState {
    onChooseLayoutDirection: (layout: LayoutDirection) => void,
    onChooseSortingFunctions: (primary: TableSortFunction, secondary: TableSortFunction) => void,
    onChooseTableAlignment: (align: TableAlignment) => void,
    onChooseTablesType: (type: TablesType) => void,
    onItemsSelected: (items: SigFieldSkolem[]) => void,
    onItemsVisible: (items: SigFieldSkolem[]) => void,
    onSelectItems: (items: SigFieldSkolem[]) => void,
    onToggleBuiltin: () => void,
    onToggleEmpty: () => void,
    onToggleRemoveThis: () => void
}

export interface ITableViewSidebarState {
    collapseSidebar: boolean
}

class TableViewSidebar extends React.Component<ITableViewSidebarProps, ITableViewSidebarState> {

    public state = {
        collapseSidebar: false
    };

    render (): React.ReactNode {

        const {
            onChooseLayoutDirection,
            onChooseSortingFunctions,
            onChooseTableAlignment,
            onChooseTablesType,
            onItemsSelected,
            onItemsVisible,
            onToggleBuiltin,
            onToggleEmpty,
            onToggleRemoveThis,
            ...viewProps
        } = this.props;

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this._onToggleCollapse}
                sidebarSide={this.props.sidebarSide}
                title='Table View Settings'>

                <TablesSection
                    {...viewProps}
                    onChooseTablesType={onChooseTablesType}
                    onItemsSelected={onItemsSelected}/>

                <DataSection
                    {...viewProps}
                    onToggleBuiltin={onToggleBuiltin}
                    onToggleEmpty={onToggleEmpty}
                    onToggleRemoveThis={onToggleRemoveThis}/>

                <LayoutSection
                    {...viewProps}
                    onChooseLayoutDirection={onChooseLayoutDirection}
                    onChooseSortingFunctions={onChooseSortingFunctions}
                    onChooseTableAlignment={onChooseTableAlignment}/>

            </SterlingSidebar>
        );

    }

    // private _getItems = (): SigFieldSkolem[] => {
    //
    //     const instance = this.props.instance;
    //     if (!instance) return [];
    //
    //     const items = [
    //         ...instance.signatures(),
    //         ...instance.fields(),
    //         ...instance.skolems()
    //     ];
    //
    //     if (this.state.removeBuiltin) items.filter(filterBuiltin);
    //     if (this.state.removeEmpty) items.filter(filterEmpty);
    //
    //     return items;
    //
    // };

    private _onSelectItems = (items: SigFieldSkolem[]): void => {

        // Filter items based on state flags


    };

    private _onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

    // private _onToggleDataOptions = () => {
    //     const curr = this.state.collapseDataOptions;
    //     this.setState({collapseDataOptions: !curr});
    // };
    //
    // private _onToggleLayoutOptions = () => {
    //     const curr = this.state.collapseLayoutOptions;
    //     this.setState({collapseLayoutOptions: !curr});
    // };

}

function getSortedItems (instance: AlloyInstance | null, nameFunction: (item: SigFieldSkolem) => string): Array<SigFieldSkolem> {
    if (instance === null) return [];
    const sigs = instance.signatures().filter(sig => sig.id() !== 'univ');
    const flds = instance.fields();
    const skls = instance.skolems();
    const alpha = alphaSort(nameFunction);
    (sigs as Array<AlloySignature>).sort(alpha).sort(builtinSort);
    (flds as Array<AlloyField>).sort(alpha);
    (skls as Array<AlloySkolem>).sort(alpha);
    return ([] as Array<SigFieldSkolem>).concat(skls).concat(sigs).concat(flds);
}

export default TableViewSidebar;
