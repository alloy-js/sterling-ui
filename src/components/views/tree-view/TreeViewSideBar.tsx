import React from 'react';
import { AlloyInstance } from 'alloy-ts';
import SterlingSidebar from '../SterlingSidebar';

export interface ITreeViewSidebarProps {
    instance: AlloyInstance | null,
    side: 'left' | 'right'
}

export interface ITreeViewSidebarState {
    collapseSidebar: boolean
}

class TreeViewSideBar extends React.Component<ITreeViewSidebarProps, ITreeViewSidebarState> {

    public state = {
        collapseSidebar: false
    };

    render(): React.ReactNode {

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this.onToggleCollapse}
                side={this.props.side}
                title='Tree View Settings'>
            </SterlingSidebar>
        )

    }

    private onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    }

}

export default TreeViewSideBar;
