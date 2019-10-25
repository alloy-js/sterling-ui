import React from 'react';
import MatrixView from './MatrixView';
import { AlloyInstance } from 'alloy-ts';

interface IGraphViewStageProps {
    instance: AlloyInstance | null
}

class GraphViewStage extends React.Component<IGraphViewStageProps> {

    render (): React.ReactNode {

        return <MatrixView instance={this.props.instance}/>;

    }

}

export default GraphViewStage;
