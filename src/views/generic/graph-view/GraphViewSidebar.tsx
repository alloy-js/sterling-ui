import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import { IGraphViewState } from './GraphView';

interface IGraphViewSidebarProps extends IGraphViewState {
    onToggleCollapseSidebar: () => void,
    visible: boolean
}

class GraphViewSidebar extends React.Component<IGraphViewSidebarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar
                collapsed={props.collapseSidebar}
                onToggleCollapse={props.onToggleCollapseSidebar}
                sidebarSide={props.sidebarSide}
                title={'Graph View Settings'}
                visible={props.visible}/>
        );

    }

}

export default GraphViewSidebar;
