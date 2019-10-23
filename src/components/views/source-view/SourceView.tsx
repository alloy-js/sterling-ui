import { AlloyInstance, AlloySource } from 'alloy-ts';
import React from 'react';
import View from '../View';
import SourceViewSideBar from './SourceViewSideBar';
import SourceViewStage from './SourceViewStage';
import SterlingSettings, { ViewSide } from '../../../SterlingSettings';

export interface ISourceViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ISourceViewState {
    active: AlloySource | null,
    sidebarSide: ViewSide
}

class SourceView extends React.Component<ISourceViewProps, ISourceViewState> {

    constructor (props: ISourceViewProps) {

        super(props);

        this.state = {
            active: null,
            sidebarSide: SterlingSettings.get('sourceViewSidebarSide')
        };

        this._watchSettings();

    }

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

        const sidebar = (
            <SourceViewSideBar
                active={this.state.active}
                instance={this.props.instance}
                onChooseSource={this._onChooseSource.bind(this)}
                side={this.state.sidebarSide}/>
        );

        const stage = (
            <SourceViewStage
                source={this.state.active}/>
        );

        return (
            <View icon='document' showPlaceholder={!this.props.instance}>
                {
                    this.state.sidebarSide === 'left'
                        ? <>{sidebar}{stage}</>
                        : <>{stage}{sidebar}</>
                }
            </View>
        );

    }

    private _onChooseSource (source: AlloySource) {

        this.setState({
            active: source
        });

    }

    private _watchSettings () {

        SterlingSettings.watch('sourceViewSidebarSide', (side: ViewSide) => {
            this.setState({sidebarSide: side});
        });

    }

}

export default SourceView;
