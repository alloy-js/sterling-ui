import { NonIdealState } from '@blueprintjs/core';
import { AlloyInstance, AlloySource } from 'alloy-ts';
import React from 'react';
import View from '../View';
import SourceViewSideBar from './SourceViewSideBar';
import SourceViewStage from './SourceViewStage';

export interface ISourceViewProps {
    instance: AlloyInstance | null,
    visible: boolean
}

export interface ISourceViewState {
    lastRequested: AlloySource | null
}

class SourceView extends React.Component<ISourceViewProps, ISourceViewState> {

    state = {
        lastRequested: null
    };

    render (): React.ReactNode {

        if (!this.props.visible) return null;

        const instance = this.props.instance;

        return (
            <View icon='document' showPlaceholder={!this.props.instance}>
                <SourceViewSideBar
                    active={this._getActive()}
                    files={instance
                        ? instance.sources()
                        : []}
                    xml={instance ? instance.xml() : null }
                    onChooseSource={this._onChooseSource.bind(this)}/>
                <SourceViewStage
                    source={this._getActive()}/>
            </View>
        );

    }

    private _getActive (): AlloySource | null {

        const instance: AlloyInstance | null = this.props.instance;
        const lastRequested: AlloySource | null = this.state.lastRequested;

        if (!instance) return null;
        let sources = instance.sources().concat(instance.xml());

        if (!sources.length) return null;
        if (!lastRequested) return sources[0];

        // Because TypeScript is getting confused...
        const lR: AlloySource = lastRequested;
        let samefile = sources.find(s => s.filename() === (lR.filename()));

        return samefile || sources[0];


    }

    private _onChooseSource (source: AlloySource) {

        this.setState({
            lastRequested: source
        });

    }

    private _renderStage () {

        return (<div className='stage'>
            {this.props.instance
                ? <svg id='stage'/>
                : <NonIdealState
                    icon='document'
                    title='Welcome to Sterling'
                    description='Use Alloy to generate an instance.'/>}
        </div>);

    }

}

export default SourceView;
