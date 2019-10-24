import * as React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';
import { Radio, RadioGroup } from '@blueprintjs/core';
import AlloyMultiSelect from './tables-section-components/AlloyMultiSelect';
import { SigFieldSkolem } from '../TableUtil';
import { ITableViewState, TablesType } from '../TableView';

export interface ITablesSectionProps extends ITableViewState {
    onChooseTablesType: (type: TablesType) => void,
    onItemsSelected: (items: SigFieldSkolem[]) => void
}

export interface ITablesSectionState {
    collapsed: boolean
}

class TablesSection extends React.Component<ITablesSectionProps, ITablesSectionState> {

    public state = {
        collapsed: false
    };


    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        return (
            <SterlingSidebar.Section
                collapsed={state.collapsed}
                onToggleCollapse={this._toggleCollapse}
                title='Tables'>

                <RadioGroup
                    onChange={this._handleRadioChange}
                    selectedValue={props.tables}>

                    <Radio label='All Tables' value={TablesType.All}/>
                    <Radio label='Signatures' value={TablesType.Signatures}/>
                    <Radio label='Fields' value={TablesType.Fields}/>
                    <Radio label='Skolems' value={TablesType.Skolems}/>
                    <Radio label='Choose Tables' value={TablesType.Select}/>
                    <AlloyMultiSelect
                        items={props.items}
                        onClearSelectedTables={this._clearTables}
                        onDeselectTable={this._removeTable}
                        onSelectTable={this._addTable}
                        nameFunction={props.nameFunction}
                        selectedTables={props.itemsSelected}/>

                </RadioGroup>

            </SterlingSidebar.Section>
        )

    }

    /**
     * Select a table by adding it to the list of selected tables
     * @param item The item to select
     * @private
     */
    private _addTable = (item: SigFieldSkolem): void => {

        const curr = this.props.itemsSelected;
        this.props.onItemsSelected([...curr, item]);

    };

    /**
     * Clear selected tables by selecting no items
     * @private
     */
    private _clearTables = (): void => {

        this.props.onItemsSelected([]);

    };

    /**
     * Deselect a currently selected table by removing it from the list of
     * selected tables.
     * @param item The item to deselect
     * @private
     */
    private _removeTable = (item: SigFieldSkolem): void => {

        const next: SigFieldSkolem[] = [...this.props.itemsSelected];
        const idx = next.indexOf(item);
        if (idx >= 0) {
            next.splice(idx, 1);
            this.props.onItemsSelected(next);
        }

    };

    /**
     * Callback used to handle changing of radio button selection. Radio buttons
     * determine which set of tables are visible and options are 'all',
     * 'signatures', 'fields', 'skolems', and 'select'.
     * @param event
     */
    private _handleRadioChange = (event: React.FormEvent<HTMLInputElement>): void => {

        this.props.onChooseTablesType(parseInt(event.currentTarget.value));

    };

    /**
     * Toggle the collapsed state of this section
     * @private
     */
    private _toggleCollapse = () => {

        const curr = this.state.collapsed;
        this.setState({collapsed: !curr});

    }

}

export default TablesSection;
