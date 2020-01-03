import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import { ISterlingViewProps, ViewSide } from '../../../SterlingTypes';
import MeshViewSidebar from './MeshViewSidebar';
import MeshViewStage from './MeshViewStage';

interface IMeshViewProps extends ISterlingViewProps {
    data: AlloyInstance
}

export interface IMeshViewState {
    collapseSidebar: boolean,
    sidebarSide: ViewSide
}

class MeshView extends React.Component<IMeshViewProps, IMeshViewState> {

    constructor (props: IMeshViewProps) {

        super(props);

        this.state = {
            collapseSidebar: false,
            sidebarSide: ViewSide.Left
        };

    }

    render (): React.ReactNode {

        const state = this.state;
        const visible = !!this.props.visible;

        const sidebar = (
            <MeshViewSidebar
                {...state}
                onToggleCollapseSidebar={this._onToggleCollapseSidebar}
                visible={visible}/>
        );

        const stage = (
            <MeshViewStage
                instance={this.props.data}
                visible={visible}/>
        );

        return (
            state.sidebarSide === ViewSide.Left
                ? <>{sidebar}{stage}</>
                : <>{stage}{sidebar}</>
        );

    }

    private _onToggleCollapseSidebar = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    }

}

export default MeshView;
