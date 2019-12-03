import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import { ITreeViewState } from './TreeView';

interface ITreeViewSidebarState {
    collapsed: boolean
}

class TreeViewSidebar extends React.Component<ITreeViewState, ITreeViewSidebarState> {

    constructor (props: ITreeViewState) {

        super(props);

        this.state = {
            collapsed: false
        };

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        return (
            <SterlingSidebar
                collapsed={state.collapsed}
                onToggleCollapse={this.onToggleCollapse}
                sidebarSide={props.sidebarSide}
                title={'Tree View Settings'}/>
        );

    }

    private onToggleCollapse = () => {
        this.setState({collapsed: !this.state.collapsed});
    }

}

export default TreeViewSidebar;
