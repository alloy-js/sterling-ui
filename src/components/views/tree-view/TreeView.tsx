import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import TreeViewSideBar from './TreeViewSideBar';
import TreeViewStage from './TreeViewStage';

export interface TreeViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

class TreeView extends React.Component<TreeViewProps> {

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='diagram-tree' showPlaceholder={!this.props.instance}>
                <TreeViewSideBar/>
                <TreeViewStage/>
            </View>
        );

    }

}

export default TreeView;
