import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import GraphViewSideBar from './GraphViewSideBar';
import GraphViewStage from './GraphViewStage';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';

export interface IGraphViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface IGraphViewState {
    sidebarSide: ViewSide
}

class GraphView extends React.Component<IGraphViewProps, IGraphViewState> {

    constructor (props: IGraphViewProps) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('graphViewSidebarSide')
        };

        this._watchSettings();

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const sidebar = (
            <GraphViewSideBar
                instance={this.props.instance}
                side={this.state.sidebarSide}/>
        );

        const stage = (
            <GraphViewStage instance={this.props.instance}/>
        );

        return (
            <View icon='graph' showPlaceholder={!this.props.instance}>
                {
                    this.state.sidebarSide === 'left'
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }

    private _watchSettings () {

        SterlingSettings.watch('graphViewSidebarSide', (side: ViewSide) => {
            this.setState({sidebarSide: side});
        });

    }

}

export default GraphView;
