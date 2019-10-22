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
    ItemPredicate,
    Select
} from '@blueprintjs/select';
import { AlloyField, AlloyInstance, AlloySignature } from 'alloy-ts';
import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
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

export interface ITableViewSidebarState {
    collapseSidebar: boolean,
    collapseTableOptions: boolean,
    collapseDataOptions: boolean,
    collapseLayoutOptions: boolean,
    items: Array<ASigField>
}

class TableViewSideBar extends React.Component<ITableViewSideBarProps, ITableViewSidebarState> {

    public state = {
        collapseSidebar: false,
        collapseTableOptions: false,
        collapseDataOptions: false,
        collapseLayoutOptions: false,
        items: getSortedItems(this.props.instance, this.props.nameFunction)
    };

    componentDidUpdate (prevProps: Readonly<ITableViewSideBarProps>, prevState: Readonly<ITableViewSidebarState>): void {

        if (this.props.instance !== prevProps.instance) {

            if (this.props.instance === null) {
                this.setState({items: []});
                return;
            }

            this.setState({items: getSortedItems(this.props.instance, this.props.nameFunction)});

        }

    }

    render (): React.ReactNode {

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this.onToggleCollapse}
                side={this.props.side}
                title='Table View Settings'>
                <SterlingSidebar.Section
                    title='Tables'
                    collapsed={this.state.collapseTableOptions}
                    onToggleCollapse={this.onToggleTablesOptions}>
                    <RadioGroup
                        selectedValue={this.props.tables}
                        onChange={(event) => this.props.onChooseTables(event.currentTarget.value as 'all' | 'signatures' | 'fields' | 'one')}>
                        <Radio label='All Tables' value='all'/>
                        <Radio label='Signatures Only' value='signatures'/>
                        <Radio label='Fields Only' value='fields'/>
                        <Radio value='one'>
                            <AlloySelect
                                items={this.state.items}
                                itemPredicate={this.filterItem}
                                itemRenderer={this.renderItem}
                                itemListRenderer={this.renderMenu}
                                onItemSelect={this.onMenuItemChange}
                                resetOnClose={true}>
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
                <SterlingSidebar.Section
                    title='Data Options'
                    collapsed={this.state.collapseDataOptions}
                    onToggleCollapse={this.onToggleDataOptions}>
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
                <SterlingSidebar.Section
                    title='Layout Options'
                    collapsed={this.state.collapseLayoutOptions}
                    onToggleCollapse={this.onToggleLayoutOptions}>
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

    private filterItem: ItemPredicate<ASigField> = (query: string, item: ASigField): boolean => {

        const name = item.expressionType() === 'signature'
            ? this.props.nameFunction(item)
            : this.props.nameFunction(item).split('<:')[1];

        return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;

    };

    private onMenuItemChange = (item: ASigField) => {
        this.props.onChooseTable(item);
        this.props.onChooseTables('one');
    };

    private onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

    private onToggleDataOptions = () => {
        const curr = this.state.collapseDataOptions;
        this.setState({collapseDataOptions: !curr});
    };

    private onToggleLayoutOptions = () => {
        const curr = this.state.collapseLayoutOptions;
        this.setState({collapseLayoutOptions: !curr});
    };

    private onToggleTablesOptions = () => {
        const curr = this.state.collapseTableOptions;
        this.setState({collapseTableOptions: !curr});
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
                {renderedSigs.length ? renderedSigs : <MenuItem disabled={true} text='None'/>}
                <MenuDivider title='Fields'/>
                {renderedFlds.length ? renderedFlds : <MenuItem disabled={true} text='None'/>}
            </Menu>
        );
    };

    private renderItem = (item: ASigField, props: IItemRendererProps) => {
        if (!props.modifiers.matchesPredicate) return null;
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
                labelElement={highlightText(this.props.nameFunction(item), props.query)}
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
                labelElement={highlightText(tokens[1], props.query)}
                onClick={props.handleClick}/>
        )
    };

}

function getSortedItems (instance: AlloyInstance | null, nameFunction: (item: ASigField) => string): Array<ASigField> {
    if (instance === null) return [];
    const sigs = instance.signatures().filter(sig => sig.id() !== 'univ');
    const flds = instance.fields();
    const alpha = alphaSort(nameFunction);
    (sigs as Array<AlloySignature>).sort(alpha).sort(builtinSort);
    (flds as Array<AlloyField>).sort(alpha);
    return ([] as Array<ASigField>).concat(sigs).concat(flds);
}

function highlightText (text: string, query: string) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens: React.ReactNode[] = [];
    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}

function escapeRegExpChars (text: string) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export default TableViewSideBar;
