import React from 'react';
import { SterlingMetadata } from '../../../SterlingMetadata';
import { ViewSide } from '../../../SterlingTypes';
import SterlingSidebar from '../../SterlingSidebar';

interface ITreeViewSidebarProps {
    dataset: SterlingMetadata | null,
    side: ViewSide
}

interface ITreeViewSidebarState {
    collapsed: boolean
}

class TreeViewSidebar extends React.Component<ITreeViewSidebarProps, ITreeViewSidebarState> {

    constructor (props: ITreeViewSidebarProps) {

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
                sidebarSide={props.side}
                title={'Tree View Settings'}/>
        );

    }

    private onToggleCollapse = () => {
        this.setState({collapsed: !this.state.collapsed});
    }

}

export default TreeViewSidebar;
