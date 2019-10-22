import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import GraphViewSideBar from './GraphViewSideBar';
import GraphViewStage from './GraphViewStage';

export interface GraphViewProps {
    instance: AlloyInstance | null,
    sidebarLocation: 'left' | 'right',
    visible: boolean
}

class GraphView extends React.Component<GraphViewProps> {

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='graph' showPlaceholder={!this.props.instance}>
                <GraphViewSideBar
                    instance={this.props.instance}
                    side={this.props.sidebarLocation}/>
                <GraphViewStage/>
            </View>
        );

    }

}

export default GraphView;
