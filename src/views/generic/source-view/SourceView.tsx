import { ITreeNode } from '@blueprintjs/core';
import React from 'react';
import { ISterlingViewProps, ViewSide } from '../../../SterlingTypes';
import Source from './Source';
import SourceViewSidebar from './SourceViewSidebar';
import SourceViewStage from './SourceViewStage';

interface ISourceViewProps extends ISterlingViewProps {
    data: Source[]
}

export interface ISourceViewState {
    collapseSidebar: boolean,
    selected: Source | null,
    sidebarSide: ViewSide
}

class SourceView extends React.Component<ISourceViewProps, ISourceViewState> {

    constructor (props: ISourceViewProps) {

        super(props);

        this.state = {
            collapseSidebar: false,
            selected: null,
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const props = this.props;
        const state = this.state;

        const sidebar = (
            <SourceViewSidebar
                {...state}
                onChooseSource={this._onChooseSource}
                onToggleCollapseSidebar={this._onToggleCollapseSidebar}
                sources={props.data}/>
        );

        const stage = (
            <SourceViewStage {...state}/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

    private _onChooseSource = (node: ITreeNode<Source>) => {

        const source: Source | undefined = node.nodeData;
        this.setState({selected: source || null})

    };

    private _onToggleCollapseSidebar = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

}

export default SourceView;
