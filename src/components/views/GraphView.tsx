import React from 'react';
import GraphViewSideBar from '../bars/GraphViewSideBar';
import { AlloyInstance } from 'alloy-ts';
import View from './View';

export interface GraphViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

class GraphView extends React.Component<GraphViewProps> {

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='graph' showPlaceholder={!this.props.instance}>
                <GraphViewSideBar/>
                <svg id='stage'/>
            </View>
        );

    }

}

export default GraphView;
