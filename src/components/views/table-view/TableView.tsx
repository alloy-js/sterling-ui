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
    show_builtin: boolean,
    show_empty: boolean,
    show_groups: boolean,
    layout: 'grid' | 'list'
}

class TableView extends React.Component<ITableViewProps, ITableViewState> {

    public state: ITableViewState = {
        show_builtin: false,
        show_empty: false,
        show_groups: true,
        layout: 'grid'
    };

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='th' showPlaceholder={!this.props.instance}>
                <TableViewSideBar
                    show_builtin={this.state.show_builtin}
                    show_empty={this.state.show_empty}
                    show_groups={this.state.show_groups}
                    layout={this.state.layout}
                    onToggleBuiltin={this._onToggleBuiltin}
                    onToggleEmpty={this._onToggleEmpty}
                    onToggleGroups={this._onToggleGroups}
                    onChooseLayout={this._onChooseLayout}/>
                <TableViewStage
                    instance={this.props.instance}
                    show_builtin={this.state.show_builtin}
                    show_empty={this.state.show_empty}
                    show_groups={this.state.show_groups}
                    layout={this.state.layout}/>
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

    private _onChooseLayout = (layout: 'grid' | 'list') => {
        this.setState({layout: layout});
    }

}

export default TableView;
