import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import { ViewSide } from '../../../SterlingSettings';
import SterlingSidebar from '../../SterlingSidebar';

export interface ICustomViewSidebarProps {
    instance: AlloyInstance | null,
    side: ViewSide
}

export interface ICustomViewSidebarState {
    collapseSidebar: boolean
}

class CustomViewSidebar extends React.Component<ICustomViewSidebarProps, ICustomViewSidebarState> {

    public state: ICustomViewSidebarState = {
        collapseSidebar: true
    };

    render (): React.ReactNode {

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this._onToggleCollapse}
                sidebarSide={this.props.side}
                title='Custom View Settings'/>
        );

    }

    private _onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    }

}

export default CustomViewSidebar;
