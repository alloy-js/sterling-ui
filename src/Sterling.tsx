import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import { AlloyConnection } from './alloy/AlloyConnection';
import SterlingSettingsDialog
    from './components/settings/SterlingSettingsDialog';
import SterlingNavbar from './components/SterlingNavbar';
import GraphView from './components/views/graph-view/GraphView';
import SourceView from './components/views/source-view/SourceView';
import TableView from './components/views/table-view/TableView';
import TreeView from './components/views/tree-view/TreeView';
import SterlingSettings, { ViewType } from './SterlingSettings';

interface ISterlingState {
    connected: boolean,
    instance: AlloyInstance | null,
    ready: boolean,
    showSettings: boolean,
    view: ViewType
}

class Sterling extends React.Component<{}, ISterlingState> {

    alloy = new AlloyConnection();
    settings = new SterlingSettings();

    state: ISterlingState = {
        connected: false,
        instance: null,
        ready: false,
        showSettings: false,
        view: SterlingSettings.get('defaultView')
    };

    constructor (props: {}) {
        super(props);
        this._initializeAlloy();
    }

    render(): React.ReactNode {

        const instance: AlloyInstance | null = this.state.instance;
        const view: string = this.state.view;
        const command: string = instance ? instance!.command() : '';

        return (
            <div className='sterling'>
                <SterlingNavbar
                    connected={this.state.connected}
                    command={command}
                    ready={this.state.ready}
                    view={this.state.view}
                    onRequestNext={this._requestNext}
                    onRequestView={(view: ViewType) => this._setView(view)}
                    onRequestSettings={this._openSettingsDialog}/>
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
                <SterlingSettingsDialog
                    onClose={this._closeSettingsDialog}
                    isOpen={this.state.showSettings}/>
            </div>
        )

    }

    private _closeSettingsDialog = () => {
        this.setState({showSettings: false});
    };

    private _initializeAlloy = () => {
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
    };

    private _openSettingsDialog = () => {
        this.setState({showSettings: true});
    };

    private _requestNext = () => {
        this.setState({
            ready: false
        });
        this.alloy.request_next();
    };

    private _setView = (view: ViewType) => {
        this.setState({ view: view });
    };
}

export default Sterling;
