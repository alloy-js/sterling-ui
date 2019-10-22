import {
    Alignment,
    Button,
    ButtonGroup,
    FormGroup,
    Menu,
    MenuDivider,
    MenuItem,
    Radio,
    RadioGroup,
    Switch,
    Tag,
    Text
} from '@blueprintjs/core';
import {
    IItemListRendererProps,
    IItemRendererProps,
    Select
} from '@blueprintjs/select';
import { AlloyField, AlloyInstance, AlloySignature } from 'alloy-ts';
import React from 'react';
import SterlingSidebar from '../SterlingSidebar';
import { alphaSort, ASigField, builtinSort } from './TableUtil';
import { ITableViewState } from './TableView';

const AlloySelect = Select.ofType<ASigField>();

export interface ITableViewSideBarProps extends ITableViewState {
    instance: AlloyInstance | null,
    onToggleBuiltin: () => void,
    onToggleEmpty: () => void,
    onToggleGroups: () => void,
    onToggleRemoveThis: () => void,
    onChooseAlign: (align: 'left' | 'center' | 'right') => void,
    onChooseAlphaSort: (sort: 'asc' | 'desc') => void,
    onChooseNumSort: (sort: 'asc' | 'desc') => void,
    onChooseTable: (item: ASigField) => void,
    onChooseTables: (tables: 'all' | 'signatures' | 'fields' | 'one') => void,
    side: 'left' | 'right'
}

class TableViewSideBar extends React.Component<ITableViewSideBarProps> {

    render (): React.ReactNode {

        const sigs = this.props.instance ? this.props.instance.signatures() : [];
        const flds = this.props.instance ? this.props.instance.fields(): [];
        const items: Array<ASigField> = ([] as Array<ASigField>)
            .concat(sigs)
            .concat(flds)
            .filter(item => item.id() !== 'univ');

        return (
            <SterlingSidebar side={this.props.side} title='Table View Settings'>
                <SterlingSidebar.Section title='Tables'>
                    <RadioGroup
                        selectedValue={this.props.tables}
                        onChange={(event) => this.props.onChooseTables(event.currentTarget.value as 'all' | 'signatures' | 'fields' | 'one')}>
                        <Radio label='All Tables' value='all'/>
                        <Radio label='Signatures Only' value='signatures'/>
                        <Radio label='Fields Only' value='fields'/>
                        <Radio value='one'>
                            <AlloySelect
                                activeItem={this.props.table}
                                items={items}
                                itemRenderer={this.renderItem}
                                itemListRenderer={this.renderMenu}
                                onItemSelect={this.onMenuItemChange}>
                                <Button
                                    fill={true}
                                    icon={
                                        this.props.table && this.props.table.expressionType() === 'field'
                                            ? <Tag>{this.props.nameFunction(this.props.table).split('<:')[0]}</Tag>
                                            : null
                                    }
                                    rightIcon='caret-down'
                                    text={
                                        this.props.table
                                            ? this.props.table.expressionType() === 'field'
                                                ? this.props.nameFunction(this.props.table).split('<:')[1]
                                                : this.props.nameFunction(this.props.table)
                                            : 'Choose a Table'
                                    }/>
                            </AlloySelect></Radio>
                    </RadioGroup>
                </SterlingSidebar.Section>
                <SterlingSidebar.Section title='Data Options'>
                    <Switch
                        checked={this.props.showBuiltin}
                        disabled={this.props.tables === 'one'}
                        onChange={this.props.onToggleBuiltin}
                        alignIndicator={Alignment.LEFT}
                        label='Show Built-in Signatures'/>
                    <Switch
                        checked={this.props.showEmpty}
                        disabled={this.props.tables === 'one'}
                        onChange={this.props.onToggleEmpty}
                        alignIndicator={Alignment.LEFT}
                        label='Show Empty Tables'/>
                    <Switch
                        checked={this.props.removeThis}
                        onChange={this.props.onToggleRemoveThis}
                        alignIndicator={Alignment.LEFT}
                        label={'Remove "this" from Signature Names'}/>
                </SterlingSidebar.Section>
                <SterlingSidebar.Section title='Layout Options'>
                    <FormGroup>
                        <FormGroup inline={true} label='Align'>
                            <ButtonGroup>
                                <Button
                                    icon='align-left'
                                    active={this.props.align === 'left'}
                                    onClick={() => this.props.onChooseAlign('left')}/>
                                <Button
                                    icon='align-center'
                                    active={this.props.align === 'center'}
                                    onClick={() => this.props.onChooseAlign('center')}/>
                                <Button
                                    icon='align-right'
                                    active={this.props.align === 'right'}
                                    onClick={() => this.props.onChooseAlign('right')}/>
                            </ButtonGroup>
                        </FormGroup>
                        <FormGroup inline={true} label='Sort' disabled={this.props.tables === 'one'}>
                            <ButtonGroup>
                                <Button
                                    icon='sort-alphabetical'
                                    disabled={this.props.tables === 'one'}
                                    onClick={() => this.props.onChooseAlphaSort('asc')}/>
                                <Button
                                    icon='sort-alphabetical-desc'
                                    disabled={this.props.tables === 'one'}
                                    onClick={() => this.props.onChooseAlphaSort('desc')}/>
                                <Button
                                    icon='sort-numerical'
                                    disabled={this.props.tables === 'one'}
                                    onClick={() => this.props.onChooseNumSort('asc')}/>
                                <Button
                                    icon='sort-numerical-desc'
                                    disabled={this.props.tables === 'one'}
                                    onClick={() => this.props.onChooseNumSort('desc')}/>
                            </ButtonGroup>
                        </FormGroup>
                        <Switch
                            checked={this.props.showGroups}
                            onChange={this.props.onToggleGroups}
                            alignIndicator={Alignment.LEFT}
                            disabled={this.props.tables !== 'all'}
                            label='Group into Signatures and Fields'/>
                    </FormGroup>
                </SterlingSidebar.Section>
            </SterlingSidebar>
        );

    }

    // const name = this.props.nameFunction(item);
    // const tokens = name.split('<:');

    private onMenuItemChange = (item: ASigField) => {
        this.props.onChooseTable(item);
        this.props.onChooseTables('one');
    };

    private renderMenu = (props: IItemListRendererProps<ASigField>) => {
        const sigs = props.items.filter(item => item.expressionType() === 'signature');
        const flds = props.items.filter(item => item.expressionType() === 'field');
        const alpha = alphaSort(this.props.nameFunction);
        (sigs as Array<AlloySignature>).sort(alpha).sort(builtinSort);
        (flds as Array<AlloyField>).sort(alpha);
        const renderedSigs = sigs.map(props.renderItem).filter(item => item != null);
        const renderedFlds = flds.map(props.renderItem).filter(item => item != null);
        return (
            <Menu ulRef={props.itemsParentRef}>
                <MenuDivider title='Signatures'/>
                {renderedSigs}
                <MenuDivider title='Fields'/>
                {renderedFlds}
            </Menu>
        );
    };

    private renderItem = (item: ASigField, props: IItemRendererProps) => {
        return item.expressionType() === 'signature'
            ? this.renderSignature(item as AlloySignature, props)
            : this.renderField(item as AlloyField, props);
    };

    private renderSignature = (item: AlloySignature, props: IItemRendererProps) => {
        return (
            <MenuItem
                active={props.modifiers.active}
                disabled={props.modifiers.disabled}
                key={item.id()}
                label={this.props.nameFunction(item)}
                icon={item.isBuiltin() ? 'build' : null}
                onClick={props.handleClick}/>
        )
    };

    private renderField = (item: AlloyField, props: IItemRendererProps) => {
        const name = this.props.nameFunction(item);
        const tokens = name.split('<:');
        return (
            <MenuItem
                active={props.modifiers.active}
                disabled={props.modifiers.disabled}
                key={item.id()}
                icon={<Text>{tokens[0]}</Text>}
                label={tokens[1]}
                onClick={props.handleClick}/>
        )
    };

}

export default TableViewSideBar;
