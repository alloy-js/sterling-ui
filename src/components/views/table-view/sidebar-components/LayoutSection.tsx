import * as React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';
import { Button, ButtonGroup, FormGroup } from '@blueprintjs/core';
import { ITableViewState, LayoutDirection, TableAlignment } from '../TableView';
import { TableSortFunction } from '../TableViewSidebar';
import { alphaSort, numSort } from '../TableUtil';

export enum TableSortDirection { Ascending, Descending}

export interface ILayoutSectionProps extends ITableViewState{
    onChooseLayoutDirection: (direction: LayoutDirection) => void,
    onChooseSortingFunctions: (primary: TableSortFunction, secondary: TableSortFunction) => void,
    onChooseTableAlignment: (alignment: TableAlignment) => void
}

export interface ILayoutSectionState {
    collapsed: boolean
}

class LayoutSection extends React.Component<ILayoutSectionProps, ILayoutSectionState> {

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
                title='Layout Options'>

                <FormGroup>
                    <FormGroup inline={true} label='Layout Direction'>
                        <ButtonGroup>
                            <Button
                                active={props.layoutDirection === LayoutDirection.Row}
                                icon='vertical-distribution'
                                onClick={() => props.onChooseLayoutDirection(LayoutDirection.Row)}/>
                            <Button
                                active={props.layoutDirection === LayoutDirection.Column}
                                icon='horizontal-distribution'
                                onClick={() => props.onChooseLayoutDirection(LayoutDirection.Column)}/>
                        </ButtonGroup>
                    </FormGroup>

                    <FormGroup inline={true} label='Align'>
                        <ButtonGroup>
                            <Button
                                active={props.tableAlignment === TableAlignment.Left}
                                icon='align-left'
                                onClick={() => props.onChooseTableAlignment(TableAlignment.Left)}/>
                            <Button
                                active={props.tableAlignment === TableAlignment.Center}
                                icon='align-center'
                                onClick={() => props.onChooseTableAlignment(TableAlignment.Center)}/>
                            <Button
                                active={props.tableAlignment === TableAlignment.Right}
                                icon='align-right'
                                onClick={() => props.onChooseTableAlignment(TableAlignment.Right)}/>
                        </ButtonGroup>
                    </FormGroup>

                    <FormGroup inline={true} label='Sort'>
                        <ButtonGroup>
                            <Button
                                icon='sort-alphabetical'
                                onClick={() => this._chooseAlphaSort(TableSortDirection.Ascending)}/>
                            <Button
                                icon='sort-alphabetical-desc'
                                onClick={() => this._chooseAlphaSort(TableSortDirection.Descending)}/>
                            <Button
                                icon='sort-numerical'
                                onClick={() => this._chooseNumSort(TableSortDirection.Ascending)}/>
                            <Button
                                icon='sort-numerical-desc'
                                onClick={() => this._chooseNumSort(TableSortDirection.Descending)}/>
                        </ButtonGroup>
                    </FormGroup>

                </FormGroup>

            </SterlingSidebar.Section>
        )

    }

    /**
     * Callback used to set the primary and secondary sorting function. The
     * current primary sorting function will be bumped down to act as the
     * new secondary sorting function
     * @param direction Sort alphabetically ascending or descending
     * @private
     */
    private _chooseAlphaSort = (direction: TableSortDirection): void => {

        const oldPrimary = this.props.sortPrimary;
        const newPrimary = direction === TableSortDirection.Ascending
            ? alphaSort(this.props.nameFunction, true)
            : alphaSort(this.props.nameFunction, false);
        this.props.onChooseSortingFunctions(newPrimary, oldPrimary);

    };

    /**
     * Callback used to set the primary and secondary sorting function. The
     * current primary sorting function will be bumped down to act as the
     * new secondary sorting function
     * @param direction Sort by size ascending or descending
     * @private
     */
    private _chooseNumSort = (direction: TableSortDirection): void => {

        const oldPrimary = this.props.sortPrimary;
        const newPrimary = direction === TableSortDirection.Ascending
            ? numSort(true)
            : numSort(false);
        this.props.onChooseSortingFunctions(newPrimary, oldPrimary);

    };

    /**
     * Toggle the collapsed state of this section
     * @private
     */
    private _toggleCollapse = (): void => {

        const curr = this.state.collapsed;
        this.setState({collapsed: !curr});

    }

}

export default LayoutSection;
