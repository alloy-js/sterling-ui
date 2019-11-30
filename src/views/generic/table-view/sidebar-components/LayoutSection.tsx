import { Button, ButtonGroup, FormGroup } from '@blueprintjs/core';
import React from 'react';
import {
    HorizontalAlignment,
    LayoutDirection,
    SortDirection
} from '../../../../SterlingTypes';
import SterlingSidebar from '../../../SterlingSidebar';
import Table from '../Table';
import { ITableViewSidebarProps } from '../TableViewSidebar';

class LayoutSection extends React.Component<ITableViewSidebarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar.Section
                collapsed={props.collapseLayout}
                onToggleCollapse={props.onToggleCollapseLayout}
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
                                active={props.tableAlignment === HorizontalAlignment.Left}
                                icon='align-left'
                                onClick={() => props.onChooseTableAlignment(HorizontalAlignment.Left)}/>
                            <Button
                                active={props.tableAlignment === HorizontalAlignment.Center}
                                icon='align-center'
                                onClick={() => props.onChooseTableAlignment(HorizontalAlignment.Center)}/>
                            <Button
                                active={props.tableAlignment === HorizontalAlignment.Right}
                                icon='align-right'
                                onClick={() => props.onChooseTableAlignment(HorizontalAlignment.Right)}/>
                        </ButtonGroup>
                    </FormGroup>

                    <FormGroup inline={true} label='Sort'>
                        <ButtonGroup>
                            <Button
                                icon='sort-alphabetical'
                                onClick={() => this._chooseAlphaSort(SortDirection.Ascending)}/>
                            <Button
                                icon='sort-alphabetical-desc'
                                onClick={() => this._chooseAlphaSort(SortDirection.Descending)}/>
                            <Button
                                icon='sort-numerical'
                                onClick={() => this._chooseNumSort(SortDirection.Ascending)}/>
                            <Button
                                icon='sort-numerical-desc'
                                onClick={() => this._chooseNumSort(SortDirection.Descending)}/>
                        </ButtonGroup>
                    </FormGroup>

                </FormGroup>

            </SterlingSidebar.Section>
        );

    }

    /**
     * Callback used to set the primary and secondary sorting functions. The
     * current primary sorting function will be bumped down to act as the
     * new secondary sorting function
     * @param direction Sort alphabetically ascending or descending
     * @private
     */
    private _chooseAlphaSort = (direction: SortDirection): void => {

        const oldPrimary = this.props.sortPrimary;
        const newPrimary = direction === SortDirection.Ascending
            ? Table.alphabeticalSort(true)
            : Table.alphabeticalSort(false);
        this.props.onChooseSortingFunctions(newPrimary, oldPrimary);

    };

    /**
     * Callback used to set the primary and secondary sorting functions. The
     * current primary sorting function will be bumped down to act as the
     * new secondary sorting function
     * @param direction Sort by size ascending or descending
     * @private
     */
    private _chooseNumSort = (direction: SortDirection): void => {

        const oldPrimary = this.props.sortPrimary;
        const newPrimary = direction === SortDirection.Ascending
            ? Table.sizeSort(true)
            : Table.sizeSort(false);
        this.props.onChooseSortingFunctions(newPrimary, oldPrimary);

    };

}

export default LayoutSection;
