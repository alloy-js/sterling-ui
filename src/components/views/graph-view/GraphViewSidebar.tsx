import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import { AlloyInstance } from 'alloy-ts';
import { ViewSide } from '../../../SterlingSettings';

export interface IGraphViewSidebarProps {
    instance: AlloyInstance | null,
    side: ViewSide
}

export interface IGraphViewSidebarState {
    collapseSidebar: boolean
}

class GraphViewSidebar extends React.Component<IGraphViewSidebarProps, IGraphViewSidebarState> {

    public state: IGraphViewSidebarState = {
        collapseSidebar: false
    };

    render (): React.ReactNode {

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this.onToggleCollapse}
                sidebarSide={this.props.side}
                title='Graph View Settings'>
            </SterlingSidebar>
        )

    }

    private onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    }

}

export default GraphViewSidebar;
