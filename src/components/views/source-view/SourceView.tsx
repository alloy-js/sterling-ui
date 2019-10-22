import { AlloyInstance, AlloySource } from 'alloy-ts';
import React from 'react';
import View from '../View';
import SourceViewSideBar from './SourceViewSideBar';
import SourceViewStage from './SourceViewStage';

export interface ISourceViewProps {
    instance: AlloyInstance | null,
    sidebarLocation: 'left' | 'right',
    visible: boolean
}

export interface ISourceViewState {
    active: AlloySource | null
}

class SourceView extends React.Component<ISourceViewProps, ISourceViewState> {

    state: ISourceViewState = {
        active: null
    };

    componentDidUpdate (
        prevProps: Readonly<ISourceViewProps>,
        prevState: Readonly<ISourceViewState>): void {

        if (this.props.instance !== prevProps.instance) {

            // If no instance, clear active source
            if (this.props.instance === null) {
                this.setState({
                    active: null
                });
                return;
            }

            // Otherwise, look for a source with the same filename
            if (this.state.active !== null) {
                const oldname = this.state.active.filename();
                const sources = this.props.instance.sources().concat(this.props.instance.xml());
                const same = sources.find(source => {
                    return source.filename() === oldname;
                });
                this.setState({active: same || null});
            }

        }

    }

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        return (
            <View icon='document' showPlaceholder={!this.props.instance}>
                <SourceViewSideBar
                    active={this.state.active}
                    instance={this.props.instance}
                    onChooseSource={this._onChooseSource.bind(this)}
                    side={this.props.sidebarLocation}/>
                <SourceViewStage
                    source={this.state.active}/>
            </View>
        );

    }

    private _onChooseSource (source: AlloySource) {

        this.setState({
            active: source
        });

    }

}

export default SourceView;
