import React from 'react';
import NavBar from './components/bars/NavBar';
import GraphView from './components/views/GraphView';
import TableView from './components/views/TableView';
import TreeView from './components/views/TreeView';
import SourceView from './components/views/SourceView';
import { NonIdealState } from '@blueprintjs/core';
import { AlloyConnection } from './alloy/AlloyConnection';

interface ISterlingState {
    connected: boolean,
    ready: boolean,
    instance: any,
    view: string
}

interface ISterlingProps {

}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    alloy = new AlloyConnection();

    state = {
        connected: false,
        ready: false,
        instance: null,
        view: 'graph'
    };

    constructor (props: ISterlingProps) {
        super(props);
        this._initialize_alloy();
    }

    render(): React.ReactNode {

        return (
            <div className='sterling'>
                <NavBar
                    connected={this.state.connected}
                    ready={this.state.ready}
                    view={this.state.view}
                    onRequestNext={() => this._requestNext()}
                    onRequestView={(view: string) => this._setView(view)}/>
                {this._renderView()}
            </div>
        )

    }

    _initialize_alloy () {

        this.alloy
            .on_connected(() => {
                this.setState({connected: true});
                this.alloy.request_current();
            })
            .on_disconnected(() => {
                this.setState({connected: false, ready: false})
            })
            .on_instance((instance: any) => {
                this.setState({ready: this.state.connected, instance: instance});
            })
            .connect();

    }

    _renderView () {
        const view = this.state.view;
        if (view === 'graph') return <GraphView/>;
        if (view === 'table') return <TableView/>;
        if (view === 'tree') return <TreeView/>;
        if (view === 'source') return <SourceView/>;
        return <NonIdealState
            icon='heart-broken'
            title='Uh oh.'
            description='Something has gone horribly wrong.'/>;
    }

    _requestNext () {
        this.setState({
            ready: false
        });
        this.alloy.request_next();
    }

    _setView (view: string) {
        this.setState({ view: view });
    }
}

export default Sterling;
