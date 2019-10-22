import React from 'react';
import SterlingNavbar from './components/SterlingNavbar';
import GraphView from './components/views/graph-view/GraphView';
import TableView from './components/views/table-view/TableView';
import TreeView from './components/views/tree-view/TreeView';
import SourceView from './components/views/source-view/SourceView';
import { AlloyConnection } from './alloy/AlloyConnection';
import { AlloyInstance } from 'alloy-ts';
import SterlingSettingsDialog
    from './components/settings/SterlingSettingsDialog';

interface ISterlingState {
    connected: boolean,
    instance: AlloyInstance | null,
    ready: boolean,
    showSettings: boolean,
    view: 'graph' | 'table' | 'tree' | 'source'
}

interface ISterlingProps {

}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    alloy = new AlloyConnection();

    state: ISterlingState = {
        connected: false,
        instance: null,
        ready: false,
        showSettings: false,
        view: 'table'
    };

    constructor (props: ISterlingProps) {
        super(props);
        this.initializeAlloy();
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
                    onRequestNext={this.requestNext}
                    onRequestView={(view: 'graph' | 'table' | 'tree' | 'source') => this.setView(view)}
                    onRequestSettings={this.openSettingsDialog}/>
                <GraphView
                    instance={instance}
                    sidebarLocation='left'
                    visible={view === 'graph'}/>
                <TableView
                    instance={instance}
                    sidebarLocation='left'
                    visible={view === 'table'}/>
                <TreeView
                    instance={instance}
                    sidebarLocation='left'
                    visible={view === 'tree'}/>
                <SourceView
                    instance={instance}
                    sidebarLocation='left'
                    visible={view === 'source'}/>
                <SterlingSettingsDialog
                    onClose={this.closeSettingsDialog}
                    isOpen={this.state.showSettings}/>
            </div>
        )

    }

    private closeSettingsDialog = () => {
        this.setState({showSettings: false});
    };

    private initializeAlloy = () => {

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

    private openSettingsDialog = () => {
        this.setState({showSettings: true});
    };

    private requestNext = () => {
        this.setState({
            ready: false
        });
        this.alloy.request_next();
    };

    private setView = (view: 'graph' | 'table' | 'tree' | 'source') => {
        this.setState({ view: view });
    };
}

export default Sterling;
