import React from 'react';
import { SterlingMetadata } from '../../../SterlingMetadata';
import { ViewSide } from '../../../SterlingTypes';
import SterlingView from '../../SterlingView';
import GraphViewSidebar from './GraphViewSidebar';
import GraphViewStage from './GraphViewStage';

interface IGraphViewProps {
    dataset: SterlingMetadata | null,
    visible: boolean,
    welcome: string
}

interface IGraphViewState {
    sidebarSide: ViewSide
}

class GraphView extends React.Component<IGraphViewProps, IGraphViewState> {

    constructor (props: IGraphViewProps) {

        super(props);

        this.state = {
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        if (!props.visible) return null;

        const sidebar = (
            <GraphViewSidebar
                side={state.sidebarSide}
                dataset={props.dataset}/>
        );
        const stage = <GraphViewStage/>;

        return (
            <SterlingView
                icon={'graph'}
                showPlaceholder={!props.dataset}
                welcome={props.welcome}>
                {
                    this.state.sidebarSide === ViewSide.Left
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </SterlingView>
        )

    }

}

export default GraphView;

