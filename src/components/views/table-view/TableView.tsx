import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import TableViewSideBar from './TableViewSideBar';
import TableViewStage from './TableViewStage';

export interface ITableViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ITableViewState {
    remove_this: boolean,
    last_alpha_sort: 'asc' | 'desc',
    last_num_sort: 'asc' | 'desc',
    last_sort: 'alpha' | 'num',
    show_builtin: boolean,
    show_empty: boolean,
    show_groups: boolean
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    public state: ITableViewState = {
        remove_this: true,
        last_alpha_sort: 'asc',
        last_num_sort: 'asc',
        last_sort: 'alpha',
        show_builtin: false,
        show_empty: false,
        show_groups: true
    };

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const state = this.state;

        return (
            <View icon='th' showPlaceholder={!this.props.instance}>
                <TableViewSideBar
                    {...state}
                    onToggleBuiltin={this._onToggleBuiltin}
                    onToggleEmpty={this._onToggleEmpty}
                    onToggleGroups={this._onToggleGroups}
                    onToggleRemoveThis={this._onToggleRemoveThis}
                    onChooseAlphaSort={this._onChooseSortAlpha}
                    onChooseNumSort={this._onChooseSortNum}/>
                <TableViewStage
                    {...state}
                    instance={this.props.instance}/>
            </View>
        );

    }

    private _onToggleBuiltin = () => {
        const curr: boolean = this.state.show_builtin;
        this.setState({show_builtin: !curr});
    };

    private _onToggleEmpty = () => {
        const curr: boolean = this.state.show_empty;
        this.setState({show_empty: !curr});
    };

    private _onToggleGroups = () => {
        const curr: boolean = this.state.show_groups;
        this.setState({show_groups: !curr});
    };

    private _onToggleRemoveThis = () => {
        const curr: boolean = this.state.remove_this;
        this.setState({remove_this: !curr});
    };

    private _onChooseSortAlpha = (sort: 'asc' | 'desc') => {
        this.setState({last_alpha_sort: sort, last_sort: 'alpha'});
    };

    private _onChooseSortNum = (sort: 'asc' | 'desc') => {
        this.setState({last_num_sort: sort, last_sort: 'num'});
    };

}

export default TableView;
