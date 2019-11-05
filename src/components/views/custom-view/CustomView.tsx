import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';
import View from '../View';
import CustomViewSidebar from './CustomViewSidebar';
import CustomViewStage from './CustomViewStage';

export interface ICustomViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ICustomViewState {
    sidebarSide: ViewSide
}

class CustomView extends React.Component<ICustomViewProps, ICustomViewState> {

    constructor (props: ICustomViewProps) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('customViewSidebarSide')
        }

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const sidebar = (
            <CustomViewSidebar
                instance={this.props.instance}
                side={this.state.sidebarSide}/>
        );

        const stage = (
            <CustomViewStage
                instance={this.props.instance}/>
        );

        return (
            <View icon='lightbulb' showPlaceholder={!this.props.instance}>
                {
                    this.state.sidebarSide === ViewSide.Left
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }

}

export default CustomView;
