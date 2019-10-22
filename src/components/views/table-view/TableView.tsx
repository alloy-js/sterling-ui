import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import { ASigField, nameFunction } from './TableUtil';
import TableViewSideBar from './TableViewSideBar';
import TableViewStage from './TableViewStage';

export interface ITableViewProps {
    instance: AlloyInstance | null,
    sidebarLocation: 'left' | 'right',
    visible: boolean
}

export interface ITableViewState {
    align: 'left' | 'center' | 'right',
    lastAlphaSort: 'asc' | 'desc',
    lastNumSort: 'asc' | 'desc',
    lastSort: 'alpha' | 'num',
    nameFunction: (item: ASigField) => string,
    removeThis: boolean,
    showBuiltin: boolean,
    showEmpty: boolean,
    showGroups: boolean,
    table: ASigField | null,
    tables: 'all' | 'signatures' | 'fields' | 'one'
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    public state: ITableViewState = {
        align: 'left',
        removeThis: true,
        lastAlphaSort: 'asc',
        lastNumSort: 'asc',
        lastSort: 'alpha',
        nameFunction: nameFunction(true),
        showBuiltin: false,
        showEmpty: false,
        showGroups: true,
        table: null,
        tables: 'all'
    };

    componentDidUpdate (
        prevProps: Readonly<ITableViewProps>,
        prevState: Readonly<ITableViewState>): void {

        if (this.props.instance !== prevProps.instance) {

            // If no instance, clear the selected table
            if (this.props.instance === null) {
                this.setState({
                    table: null,
                    tables: 'all'
                });
                return;
            }

            // Otherwise, if a table was selected, look for it in the
            // new instance
            if (this.state.table !== null) {
                const id = this.state.table.id();
                const items = ([] as Array<ASigField>)
                    .concat(this.props.instance.signatures())
                    .concat(this.props.instance.fields());
                const same = items.find(item => item.id() === id);
                if (same) {
                    this.setState({table: same});
                } else {
                    this.setState({table: null, tables: 'all'});
                }
            }
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
                onChooseNumSort={this._onChooseSortNum}
                onChooseTable={this._onChooseTable}
                onChooseTables={this._onChooseTables}
                onToggleBuiltin={this._onToggleBuiltin}
                onToggleEmpty={this._onToggleEmpty}
                onToggleGroups={this._onToggleGroups}
                onToggleRemoveThis={this._onToggleRemoveThis}
                side={this.props.sidebarLocation}/>
        );

        return (
            <View icon='th' showPlaceholder={!this.props.instance}>
                {
                    this.props.sidebarLocation === 'left'
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }

    private _onToggleBuiltin = () => {
        const curr: boolean = this.state.showBuiltin;
        this.setState({showBuiltin: !curr});
    };

    private _onToggleEmpty = () => {
        const curr: boolean = this.state.showEmpty;
        this.setState({showEmpty: !curr});
    };

    private _onToggleGroups = () => {
        const curr: boolean = this.state.showGroups;
        this.setState({showGroups: !curr});
    };

    private _onToggleRemoveThis = () => {
        const next: boolean = !this.state.removeThis;
        this.setState({removeThis: next, nameFunction: nameFunction(next)});
    };

    private _onChooseAlign = (align: 'left' | 'center' | 'right') => {
        this.setState({align: align});
    };

    private _onChooseSortAlpha = (sort: 'asc' | 'desc') => {
        this.setState({lastAlphaSort: sort, lastSort: 'alpha'});
    };

    private _onChooseSortNum = (sort: 'asc' | 'desc') => {
        this.setState({lastNumSort: sort, lastSort: 'num'});
    };

    private _onChooseTable = (item: ASigField) => {
        this.setState({table: item});
    };

    private _onChooseTables = (tables: 'all' | 'signatures' | 'fields' | 'one') => {
        this.setState({tables: tables});
    }

}

export default TableView;
