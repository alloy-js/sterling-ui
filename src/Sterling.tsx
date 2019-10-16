import React from 'react';
import NavBar from './components/bars/NavBar';
import GraphView from './components/views/GraphView';
import TableView from './components/views/TableView';
import TreeView from './components/views/TreeView';
import SourceView from './components/views/SourceView';
import { AlloyConnection } from './alloy/AlloyConnection';
import { AlloyInstance } from 'alloy-ts';

interface ISterlingState {
    connected: boolean,
    instance: AlloyInstance | null,
    ready: boolean,
    view: string
}

interface ISterlingProps {

}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    alloy = new AlloyConnection();

    state = {
        connected: false,
        instance: null,
        ready: false,
        view: 'graph'
    };

    constructor (props: ISterlingProps) {
        super(props);
        this._initialize_alloy();
    }

    render(): React.ReactNode {

        const instance = this.state.instance;
        const view = this.state.view;

        return (
            <div className='sterling'>
                <NavBar
                    connected={this.state.connected}
                    ready={this.state.ready}
                    view={this.state.view}
                    onRequestNext={() => this._requestNext()}
                    onRequestView={(view: string) => this._setView(view)}/>
                <GraphView
                    instance={instance}
                    visible={view === 'graph'}/>
                <TableView
                    instance={instance}
                    visible={view === 'table'}/>
                <TreeView
                    instance={instance}
                    visible={view === 'tree'}/>
                <SourceView
                    instance={instance}
                    visible={view === 'source'}/>
            </div>
        )

    }

    private _initialize_alloy () {

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

    private _requestNext () {
        this.setState({
            ready: false
        });
        this.alloy.request_next();
    }

    private _setView (view: string) {
        this.setState({ view: view });
    }
}

export default Sterling;
