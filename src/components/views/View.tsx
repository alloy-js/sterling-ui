import React from 'react';
import { NonIdealState, IconName } from '@blueprintjs/core';

export interface IViewProps {
    icon: IconName,
    showPlaceholder: boolean
}

class View extends React.Component<IViewProps> {

    render (): React.ReactNode {

        if (this.props.showPlaceholder) {
            return <NonIdealState
                icon={this.props.icon}
                title='Welcome to Sterling'
                description='Use Alloy to generate an instance'/>
        }

        return <div className='sterling-view'>
            {this.props.children}
        </div>

    }

}

export default View;
