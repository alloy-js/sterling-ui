import {
    Alignment,
    Button,
    ButtonGroup,
    FormGroup,
    Switch
} from '@blueprintjs/core';
import React from 'react';
import SideBar from '../SideBar';
import { ITableViewState } from './TableView';

export interface ITableViewSideBarProps extends ITableViewState{
    onToggleBuiltin: () => void,
    onToggleEmpty: () => void,
    onToggleGroups: () => void,
    onToggleRemoveThis: () => void,
    onChooseAlphaSort: (sort: 'asc' | 'desc') => void,
    onChooseNumSort: (sort: 'asc' | 'desc') => void
}

class TableViewSideBar extends React.Component<ITableViewSideBarProps> {

    render (): React.ReactNode {

        return (
            <SideBar>
                <SideBar.Section label='Data Options'>
                    <Switch
                        checked={this.props.show_builtin}
                        onChange={this.props.onToggleBuiltin}
                        alignIndicator={Alignment.RIGHT}
                        label='Show Built-in Signatures'/>
                    <Switch
                        checked={this.props.show_empty}
                        onChange={this.props.onToggleEmpty}
                        alignIndicator={Alignment.RIGHT}
                        label='Show Empty Tables'/>
                    <Switch
                        checked={this.props.remove_this}
                        onChange={this.props.onToggleRemoveThis}
                        alignIndicator={Alignment.RIGHT}
                        label={'Remove "this" from Signature Names'}/>
                </SideBar.Section>
                <SideBar.Section label='Layout Options'>
                    <Switch
                        checked={this.props.show_groups}
                        onChange={this.props.onToggleGroups}
                        alignIndicator={Alignment.RIGHT}
                        label='Group into Signatures and Fields'/>
                    <FormGroup
                        className='spread'
                        inline={true}
                        label='Sort'>
                        <ButtonGroup>
                            <Button
                                icon='sort-alphabetical'
                                onClick={() => this.props.onChooseAlphaSort('asc')}/>
                            <Button
                                icon='sort-alphabetical-desc'
                                onClick={() => this.props.onChooseAlphaSort('desc')}/>
                            <Button
                                icon='sort-numerical'
                                onClick={() => this.props.onChooseNumSort('asc')}/>
                            <Button
                                icon='sort-numerical-desc'
                                onClick={() => this.props.onChooseNumSort('desc')}/>
                        </ButtonGroup>
                    </FormGroup>
                </SideBar.Section>
            </SideBar>
        )

    }

}

export default TableViewSideBar;
