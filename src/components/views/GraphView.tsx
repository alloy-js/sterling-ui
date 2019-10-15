import React from 'react';
import PropTypes from 'prop-types';
import { NonIdealState } from '@blueprintjs/core';
import GraphViewSideBar from '../bars/GraphViewSideBar';

export interface GraphViewProps {
    instance?: object
}

class GraphView extends React.Component<GraphViewProps> {

    static propTypes = {
        instance: PropTypes.object
    };

    render (): React.ReactNode {

        return (
            <div className='sterling-view'>
                <GraphViewSideBar/>
                <div className='stage'>
                    {this.props.instance
                        ? <svg id='stage'/>
                        : <NonIdealState
                            icon='graph'
                            title='Welcome to Sterling'
                            description='Use Alloy to generate an instance.'/>}
                </div>
            </div>
        );

    }

}

export default GraphView;
