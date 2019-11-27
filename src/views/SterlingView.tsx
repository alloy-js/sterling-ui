import { IconName, NonIdealState } from '@blueprintjs/core';
import React from 'react';

export interface IViewProps {
    icon: IconName,
    showPlaceholder: boolean,
    welcome: string
}

class SterlingView extends React.Component<IViewProps> {

    render (): React.ReactNode {

        return this.props.showPlaceholder
            ? <NonIdealState
                icon={this.props.icon}
                title='Welcome to Sterling'
                description={this.props.welcome}/>
            : <div className='sterling-view'>
                {this.props.children}
              </div>;

    }

}

export default SterlingView;
