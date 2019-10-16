import React from 'react';
import View from './View';
import { AlloyInstance } from 'alloy-ts';

export interface TreeViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

class TreeView extends React.Component<TreeViewProps> {

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='diagram-tree' showPlaceholder={!this.props.instance}>
                <div className='sidebar'></div>
                <svg id='stage'></svg>
            </View>
        );

    }

}

export default TreeView;
