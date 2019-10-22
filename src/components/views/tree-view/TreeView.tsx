import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import TreeViewSideBar from './TreeViewSideBar';
import TreeViewStage from './TreeViewStage';

export interface TreeViewProps {
    instance: AlloyInstance | null,
    sidebarLocation: 'left' | 'right',
    visible: boolean
}

class TreeView extends React.Component<TreeViewProps> {

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='diagram-tree' showPlaceholder={!this.props.instance}>
                <TreeViewSideBar
                    instance={this.props.instance}
                    side={this.props.sidebarLocation}/>
                <TreeViewStage/>
            </View>
        );

    }

}

export default TreeView;
