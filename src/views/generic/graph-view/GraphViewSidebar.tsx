import React from 'react';
import { SterlingMetadata } from '../../../SterlingMetadata';
import { ViewSide } from '../../../SterlingTypes';
import SterlingSidebar from '../../SterlingSidebar';

interface IGraphViewSidebarProps {
    dataset: SterlingMetadata | null,
    side: ViewSide
}

interface IGraphViewSidebarState {
    collapsed: boolean
}

class GraphViewSidebar extends React.Component<IGraphViewSidebarProps, IGraphViewSidebarState> {

    constructor (props: IGraphViewSidebarProps) {

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
                title={'Graph View Settings'}/>
        );

    }

    private onToggleCollapse = () => {
        this.setState({collapsed: !this.state.collapsed});
    }

}

export default GraphViewSidebar;
