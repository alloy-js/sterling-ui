import {
    Alignment,
    Button,
    ButtonGroup,
    FormGroup, Icon, ITagProps,
    Menu,
    MenuDivider,
    MenuItem, PopoverPosition,
    Radio,
    RadioGroup,
    Switch,
    Text
} from '@blueprintjs/core';
import {
    IItemListRendererProps,
    IItemRendererProps,
    ItemPredicate,
    MultiSelect
} from '@blueprintjs/select';
import {
    AlloyField,
    AlloyInstance,
    AlloySignature,
    AlloySkolem
} from 'alloy-ts';
import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import {
    alphaSort,
    builtinSort,
    itemsEqual,
    SigFieldSkolem
} from './TableUtil';
import { ITableViewState } from './TableView';
import { FieldTag, SignatureTag, SkolemTag } from './TableTags';

const AlloySelect = MultiSelect.ofType<SigFieldSkolem>();

export interface ITableViewSideBarProps extends ITableViewState {
    instance: AlloyInstance | null,
    onToggleBuiltin: () => void,
    onToggleEmpty: () => void,
    onToggleRemoveThis: () => void,
    onChooseAlign: (align: 'left' | 'center' | 'right') => void,
    onChooseAlphaSort: (sort: 'asc' | 'desc') => void,
    onChooseLayout: (layout: 'row' | 'column') => void,
    onChooseNumSort: (sort: 'asc' | 'desc') => void,
    onChooseTables: (tables: 'all' | 'signatures' | 'fields' | 'select') => void,
    onClearSelectedTables: () => void,
    onDeselectTable: (item: SigFieldSkolem) => void,
    onSelectTable: (item: SigFieldSkolem) => void,
    side: 'left' | 'right'
}

export interface ITableViewSidebarState {
    collapseSidebar: boolean,
    collapseTableOptions: boolean,
    collapseDataOptions: boolean,
    collapseLayoutOptions: boolean,
    items: Array<SigFieldSkolem>
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

        const clearButton = this.props.selectedTables.length
            ? <Button icon='cross' minimal={true} onClick={this.props.onClearSelectedTables}/>
            : undefined;

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this._onToggleCollapse}
                side={this.props.side}
                title='Table View Settings'>
                <SterlingSidebar.Section
                    title='Tables'
                    collapsed={this.state.collapseTableOptions}
                    onToggleCollapse={this._onToggleTablesOptions}>
                    <RadioGroup
                        selectedValue={this.props.tables}
                        onChange={(event) => {
                            console.log(event.target);
                            this.props.onChooseTables(event.currentTarget.value as 'all' | 'signatures' | 'fields' | 'select')
                        }}>
                        <Radio label='All Tables' value='all'/>
                        <Radio label='Signatures' value='signatures'/>
                        <Radio label='Fields' value='fields'/>
                        <Radio label='Skolems' value='skolems'/>
                        <Radio label='Choose Tables' value='select'/>
                        <AlloySelect
                            fill={true}
                            items={this.state.items}
                            itemsEqual={itemsEqual}
                            itemPredicate={this._filterItem}
                            itemRenderer={this._renderItem}
                            itemListRenderer={this._renderMenu}
                            popoverProps={{
                                minimal: false,
                                position: this.props.sidebarSide === 'left'
                                    ? PopoverPosition.BOTTOM_RIGHT
                                    : PopoverPosition.BOTTOM_LEFT,
                                fill: true
                            }}
                            onItemSelect={this._onMenuItemSelect}
                            placeholder='Choose Tables...'
                            resetOnSelect={true}
                            selectedItems={this.props.selectedTables}
                            tagInputProps={{
                                onRemove: this._onRemoveTag,
                                rightElement: clearButton,
                                tagProps: this._tagProps
                            }}
                            tagRenderer={this._renderTag}/>
                    </RadioGroup>
                </SterlingSidebar.Section>
                <SterlingSidebar.Section
                    title='Data Options'
                    collapsed={this.state.collapseDataOptions}
                    onToggleCollapse={this._onToggleDataOptions}>
                    <Switch
                        checked={this.props.showBuiltin}
                        disabled={this.props.tables === 'select'}
                        onChange={this.props.onToggleBuiltin}
                        alignIndicator={Alignment.LEFT}
                        label='Show Built-in Signatures'/>
                    <Switch
                        checked={this.props.showEmpty}
                        disabled={this.props.tables === 'select'}
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
                    onToggleCollapse={this._onToggleLayoutOptions}>
                    <FormGroup>
                        <FormGroup inline={true} label='Layout Direction'>
                            <ButtonGroup>
                                <Button
                                    icon='vertical-distribution'
                                    active={this.props.layout === 'row'}
                                    onClick={() => this.props.onChooseLayout('row')}/>
                                <Button
                                    icon='horizontal-distribution'
                                    active={this.props.layout === 'column'}
                                    onClick={() => this.props.onChooseLayout('column')}/>
                            </ButtonGroup>
                        </FormGroup>
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
                        <FormGroup inline={true} label='Sort'>
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
                    </FormGroup>
                </SterlingSidebar.Section>
            </SterlingSidebar>
        );

    }

    private _filterItem: ItemPredicate<SigFieldSkolem> = (query: string, item: SigFieldSkolem): boolean => {

        const name = item.expressionType() === 'field'
            ? this.props.nameFunction(item).split('<:')[1]
            : this.props.nameFunction(item);

        return name.toLowerCase().indexOf(query.toLowerCase()) >= 0;

    };

    private _isItemSelected = (item: SigFieldSkolem) => {
        return this.props.selectedTables.includes(item);
    };

    private _onMenuItemSelect = (item: SigFieldSkolem) => {
        if (!this._isItemSelected(item)) {
            this.props.onSelectTable(item);
        } else {
            this.props.onDeselectTable(item);
        }
        this.props.onChooseTables('select');
    };

    private _onRemoveTag = (tag: string, index: number) => {
        this.props.onDeselectTable(this.props.selectedTables[index]);
    };

    private _onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

    private _onToggleDataOptions = () => {
        const curr = this.state.collapseDataOptions;
        this.setState({collapseDataOptions: !curr});
    };

    private _onToggleLayoutOptions = () => {
        const curr = this.state.collapseLayoutOptions;
        this.setState({collapseLayoutOptions: !curr});
    };

    private _onToggleTablesOptions = () => {
        const curr = this.state.collapseTableOptions;
        this.setState({collapseTableOptions: !curr});
    };

    private _renderMenu = (props: IItemListRendererProps<SigFieldSkolem>) => {
        const skls = props.items.filter(item => item.expressionType() === 'skolem');
        const sigs = props.items.filter(item => item.expressionType() === 'signature');
        const flds = props.items.filter(item => item.expressionType() === 'field');
        const alpha = alphaSort(this.props.nameFunction);
        (skls as AlloySkolem[]).sort(alpha);
        (sigs as AlloySignature[]).sort(alpha).sort(builtinSort);
        (flds as AlloyField[]).sort(alpha);
        const renderedSkls = skls.map(props.renderItem).filter(item => item != null);
        const renderedSigs = sigs.map(props.renderItem).filter(item => item != null);
        const renderedFlds = flds.map(props.renderItem).filter(item => item != null);
        return (
            <Menu ulRef={props.itemsParentRef}>
                <MenuDivider title='Skolems'/>
                {renderedSkls.length ? renderedSkls : <MenuItem disabled={true} text='None'/>}
                <MenuDivider title='Signatures'/>
                {renderedSigs.length ? renderedSigs : <MenuItem disabled={true} text='None'/>}
                <MenuDivider title='Fields'/>
                {renderedFlds.length ? renderedFlds : <MenuItem disabled={true} text='None'/>}
            </Menu>
        );
    };

    private _renderItem = (item: SigFieldSkolem, props: IItemRendererProps) => {
        if (!props.modifiers.matchesPredicate) return null;
        switch (item.expressionType()) {
            case 'signature':
                return this._renderSignature(item as AlloySignature, props);
            case 'field':
                return this._renderField(item as AlloyField, props);
            case 'skolem':
                return this._renderSkolem(item as AlloySkolem, props);
            default:
                return null;
        }
    };

    private _renderSignature = (item: AlloySignature, props: IItemRendererProps) => {
        const selected = this._isItemSelected(item);
        return (
            <MenuItem
                active={props.modifiers.active}
                disabled={props.modifiers.disabled}
                key={item.id()}
                labelElement={highlightText(this.props.nameFunction(item), props.query)}
                icon={selected ? 'tick' : 'blank'}
                onClick={props.handleClick}/>
        );
    };

    private _renderField = (item: AlloyField, props: IItemRendererProps) => {
        const name = this.props.nameFunction(item);
        const tokens = name.split('<:');
        const selected = this._isItemSelected(item);
        return (
            <MenuItem
                active={props.modifiers.active}
                disabled={props.modifiers.disabled}
                key={item.id()}
                icon={<>
                    { selected && <Icon icon='tick'/>}
                    <Text>{tokens[0]}</Text>
                </>}
                labelElement={highlightText(tokens[1], props.query)}
                onClick={props.handleClick}/>
        );
    };

    private _renderSkolem = (item: AlloySkolem, props: IItemRendererProps) => {
        const selected = this._isItemSelected(item);
        return (
            <MenuItem
                active={props.modifiers.active}
                disabled={props.modifiers.disabled}
                icon={selected ? 'tick' : 'blank'}
                key={item.id()}
                labelElement={highlightText(item.name(), props.query)}
                onClick={props.handleClick}/>
        );
    };

    private _renderTag = (item: SigFieldSkolem): React.ReactNode => {
        const name = this.props.nameFunction(item);
        return item.expressionType() === 'field'
            ? name.split('<:').join(' \u2BC7 ')
            : name;
    };

    private _tagProps = (value: React.ReactNode, index: number): ITagProps => {
        const itemType = this.props.selectedTables[index].expressionType();
        const tag = itemType === 'signature' ? 'sig-tag'
            : itemType === 'field' ? 'field-tag'
            : itemType === 'skolem' ? 'skolem-tag'
            : '';
        return {
            className: tag
        };
    }

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
    return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}

export default TableViewSideBar;
