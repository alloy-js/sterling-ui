import React from 'react';
import { AlloyInstance } from 'alloy-ts';
import SterlingSidebar from '../../SterlingSidebar';
import { ViewSide } from '../../../SterlingSettings';

export interface ITreeViewSidebarProps {
    instance: AlloyInstance | null,
    side: ViewSide
}

export interface ITreeViewSidebarState {
    collapseSidebar: boolean
}

class TreeViewSidebar extends React.Component<ITreeViewSidebarProps, ITreeViewSidebarState> {

    public state = {
        collapseSidebar: false
    };

    render(): React.ReactNode {

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this.onToggleCollapse}
                sidebarSide={this.props.side}
                title='Tree View Settings'>
            </SterlingSidebar>
        )

    }

    private onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    }

}

export default TreeViewSidebar;
