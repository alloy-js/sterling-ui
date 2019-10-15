import React from 'react';
import PropTypes from 'prop-types';
import {
    Alignment, Button, Classes,
    Navbar,
    NonIdealState, Tooltip
} from '@blueprintjs/core';

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
                <div className='sidebar'>
                    <Navbar>
                        <div style={{margin: '0 auto', width: '100%'}}>
                            <Navbar.Group align={Alignment.RIGHT}>
                                <Tooltip position='bottom' content='Default Layout'>
                                    <Button className={Classes.MINIMAL} icon='layout-auto'/>
                                </Tooltip>
                                <Tooltip position='bottom' content='Balloon Layout'>
                                    <Button className={Classes.MINIMAL} icon='layout-balloon'/>
                                </Tooltip>
                                <Tooltip position='bottom' content='Circular Layout'>
                                    <Button className={Classes.MINIMAL} icon='layout-circle'/>
                                </Tooltip>
                            </Navbar.Group>
                        </div>
                    </Navbar>
                </div>
                {this._renderStage()}
            </div>
        );

    }

    _renderStage () {

        return (<div className='stage'>
            {this.props.instance
                ? <svg id='stage'/>
                : <NonIdealState
                    icon='graph'
                    title='Welcome to Sterling'
                    description='Use Alloy to generate an instance.'/>}
        </div>);

    }

}

export default GraphView;
