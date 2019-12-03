import React from 'react';
import { ISterlingViewProps, ViewSide } from '../../../SterlingTypes';
import TreeViewSidebar from './TreeViewSidebar';
import TreeViewStage from './TreeViewStage';

export interface ITreeViewState {
    sidebarSide: ViewSide
}

class TreeView extends React.Component<ISterlingViewProps, ITreeViewState> {

    constructor (props: ISterlingViewProps) {

        super(props);

        this.state = {
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const state = this.state;

        const sidebar = (
            <TreeViewSidebar {...state}/>
        );

        const stage = (
            <TreeViewStage/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

}

export default TreeView;
