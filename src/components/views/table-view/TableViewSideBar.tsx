import {
    Alignment,
    Button,
    ButtonGroup,
    FormGroup,
    Switch
} from '@blueprintjs/core';
import React from 'react';
import SideBar from '../SideBar';

export interface ITableViewSideBarProps {
    show_builtin: boolean,
    show_empty: boolean,
    show_groups: boolean,
    layout: 'grid' | 'list',
    onToggleBuiltin: () => void,
    onToggleEmpty: () => void,
    onToggleGroups: () => void,
    onChooseLayout: (layout: 'grid' | 'list') => void
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
                        label='Layout'>
                        <ButtonGroup>
                            <Button
                                active={this.props.layout === 'grid'}
                                onClick={() => this.props.onChooseLayout('grid')}
                                icon='grid-view'>
                                Grid
                            </Button>
                            <Button
                                active={this.props.layout === 'list'}
                                onClick={() => this.props.onChooseLayout('list')}
                                icon='list'>
                                List
                            </Button>
                        </ButtonGroup>
                    </FormGroup>
                    <FormGroup
                        className='spread'
                        inline={true}
                        label='Sort'>
                        <ButtonGroup>
                            <Button
                                icon='sort-alphabetical'/>
                            <Button
                                icon='sort-alphabetical-desc'/>
                            <Button
                                icon='sort-numerical'/>
                            <Button
                                icon='sort-numerical-desc'/>
                        </ButtonGroup>
                    </FormGroup>
                </SideBar.Section>
            </SideBar>
        )

    }

}

export default TableViewSideBar;
