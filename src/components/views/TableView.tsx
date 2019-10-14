import React from 'react';
import PropTypes from 'prop-types';
import {
    NonIdealState
} from '@blueprintjs/core';

export interface TableViewProps {
    instance?: object
}

class TableView extends React.Component<TableViewProps> {

    static propTypes = {
        instance: PropTypes.object
    };

    render (): React.ReactNode {

        return (
            <div className='sterling-view'>
                <div className='sidebar'>
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
                    icon='th'
                    title='Welcome to Sterling'
                    description='Use Alloy to generate an instance.'/>}
        </div>);

    }

}

export default TableView;
