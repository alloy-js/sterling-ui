import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import View from '../View';
import TreeViewSideBar from './TreeViewSideBar';
import TreeViewStage from './TreeViewStage';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';

export interface ITreeViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ITreeViewState {
    sidebarSide: ViewSide
}

class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {

    constructor (props: ITreeViewProps) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('treeViewSidebarSide')
        };

        this._watchSettings();

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const sidebar = (
            <TreeViewSideBar
                instance={this.props.instance}
                side={this.state.sidebarSide}/>
        );

        const stage = (
            <TreeViewStage/>
        );

        return (
            <View icon='diagram-tree' showPlaceholder={!this.props.instance}>
                {
                    this.state.sidebarSide === 'left'
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }

    private _watchSettings () {

        SterlingSettings.watch('treeViewSidebarSide', (side: ViewSide) => {
            this.setState({sidebarSide: side});
        });

    }

}

export default TreeView;
