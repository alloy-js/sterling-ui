import React from 'react';
import { ISterlingViewProps, ViewSide } from '../../../SterlingTypes';
import { Graph } from './graph/types/Graph';
import GraphViewSidebar from './GraphViewSidebar';
import GraphViewStage from './GraphViewStage';

interface IGraphViewProps extends ISterlingViewProps {
    data: Graph
}

export interface IGraphViewState {
    collapseSidebar: boolean,
    sidebarSide: ViewSide
}

class GraphView extends React.Component<IGraphViewProps, IGraphViewState> {

    constructor (props: ISterlingViewProps) {

        super(props);

        this.state = {
            collapseSidebar: false,
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        const state = this.state;
        const visible = !!this.props.visible;

        const sidebar = (
            <GraphViewSidebar
                {...state}
                onToggleCollapseSidebar={this._onToggleCollapseSidebar}
                visible={visible}/>
        );

        const stage = (
            <GraphViewStage
                graph={this.props.data}
                visible={visible}/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

    private _onToggleCollapseSidebar = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

}

export default GraphView;

