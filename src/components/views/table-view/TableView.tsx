import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import { nameFunction, SigFieldSkolem } from './TableUtil';
import TableViewSideBar from './TableViewSideBar';
import TableViewStage from './TableViewStage';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';

export interface ITableViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ITableViewState {
    align: 'left' | 'center' | 'right',
    lastAlphaSort: 'asc' | 'desc',
    lastNumSort: 'asc' | 'desc',
    lastSort: 'alpha' | 'num',
    layout: 'row' | 'column',
    nameFunction: (item: SigFieldSkolem) => string,
    removeThis: boolean,
    selectedTables: SigFieldSkolem[],
    showBuiltin: boolean,
    showEmpty: boolean,
    sidebarSide: ViewSide,
    tables: 'all' | 'signatures' | 'fields' | 'skolems' | 'select'
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    constructor (props: ITableViewProps) {

        super(props);

        this.state = {
            align: 'left',
            removeThis: true,
            lastAlphaSort: 'asc',
            lastNumSort: 'asc',
            lastSort: 'alpha',
            layout: 'row',
            nameFunction: nameFunction(true),
            selectedTables: [],
            showBuiltin: false,
            showEmpty: false,
            sidebarSide: SterlingSettings.get('tableViewSidebarSide'),
            tables: 'all'
        };

        this._watchSettings();

    }

    componentDidUpdate (
        prevProps: Readonly<ITableViewProps>,
        prevState: Readonly<ITableViewState>): void {

        if (this.props.instance !== prevProps.instance) {

            // If either state didn't have an instance, clear the selected tables
            if (this.props.instance === null || prevProps.instance === null) {
                this.setState({
                    selectedTables: [],
                    tables: 'all'
                });
                return;
            }

            // Otherwise, if any tables were selected, look for them in the
            // new instance
            const oldInst: AlloyInstance = prevProps.instance;
            const newInst: AlloyInstance = this.props.instance;
            const oldTables = [
                ...oldInst.skolems(),
                ...oldInst.signatures(),
                ...oldInst.fields()]
                .map(item => item.id());

            const newTables = [
                ...newInst.skolems(),
                ...newInst.signatures(),
                ...newInst.fields()]
                .filter(item => oldTables.includes(item.id()));

            this.setState({selectedTables: newTables});

        }

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const state = this.state;
        const stage = (
            <TableViewStage
                {...state}
                instance={this.props.instance}/>
        );
        const sidebar = (
            <TableViewSideBar
                {...state}
                instance={this.props.instance}
                onChooseAlign={this._onChooseAlign}
                onChooseAlphaSort={this._onChooseSortAlpha}
                onChooseLayout={this._onChooseLayout}
                onChooseNumSort={this._onChooseSortNum}
                onChooseTables={this._onChooseTables}
                onClearSelectedTables={this._onClearSelectedTables}
                onDeselectTable={this._onDeselectTable}
                onSelectTable={this._onSelectTable}
                onToggleBuiltin={this._onToggleBuiltin}
                onToggleEmpty={this._onToggleEmpty}
                onToggleRemoveThis={this._onToggleRemoveThis}
                side={this.state.sidebarSide}/>
        );

        return (
            <View icon='th' showPlaceholder={!this.props.instance}>
                {
                    this.state.sidebarSide === 'left'
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }

    private _onChooseAlign = (align: 'left' | 'center' | 'right') => {
        this.setState({align: align});
    };

    private _onChooseLayout = (layout: 'row' | 'column') => {
        this.setState({layout: layout});
    };

    private _onChooseSortAlpha = (sort: 'asc' | 'desc') => {
        this.setState({lastAlphaSort: sort, lastSort: 'alpha'});
    };

    private _onChooseSortNum = (sort: 'asc' | 'desc') => {
        this.setState({lastNumSort: sort, lastSort: 'num'});
    };

    private _onChooseTables = (tables: 'all' | 'signatures' | 'fields' | 'skolems' | 'select') => {
        this.setState({tables: tables});
    };

    private _onClearSelectedTables = () => {
        this.setState({selectedTables: []});
    };

    private _onDeselectTable = (item: SigFieldSkolem) => {
        const next = [...this.state.selectedTables];
        const idx = next.indexOf(item);
        if (idx >= 0) {
            next.splice(idx, 1);
            this.setState({selectedTables: next});
        }
    };

    private _onSelectTable = (item: SigFieldSkolem) => {
        const curr = this.state.selectedTables;
        this.setState({selectedTables: [...curr, item]});
    };

    private _onToggleBuiltin = () => {
        const curr: boolean = this.state.showBuiltin;
        this.setState({showBuiltin: !curr});
    };

    private _onToggleEmpty = () => {
        const curr: boolean = this.state.showEmpty;
        this.setState({showEmpty: !curr});
    };

    private _onToggleRemoveThis = () => {
        const next: boolean = !this.state.removeThis;
        this.setState({removeThis: next, nameFunction: nameFunction(next)});
    };

    private _watchSettings () {

        SterlingSettings.watch('tableViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        });

    }

}

export default TableView;
