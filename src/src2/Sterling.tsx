import React from 'react';
import SterlingNavbar from './components/SterlingNavbar';
import GraphView from './components/views/graph-view/GraphView';
import TableView from './components/views/table-view/TableView';
import { SterlingMetadata } from './SterlingMetadata';
import { SterlingConnection, ViewType } from './SterlingTypes';

interface ISterlingProps {
    connection: SterlingConnection,
    metadata: (data: any) => SterlingMetadata,
    welcome: string
}

interface ISterlingState {
    connected: boolean,
    dataset: SterlingMetadata | null,
    ready: boolean,
    view: ViewType
}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    constructor (props: ISterlingProps) {

        super(props);

        this.state = {
            connected: false,
            dataset: null,
            ready: false,
            view: ViewType.Graph
        };

        this._initializeConnection();
    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;
        const command = state.dataset
            ? state.dataset.attr('command') || ''
            : '';

        return (
            <div className={'sterling'}>
                <SterlingNavbar
                    connected={state.connected}
                    command={command}
                    onRequestNext={this._requestNext}
                    onRequestView={this._setView}
                    ready={state.ready}
                    view={state.view}/>
                <GraphView
                    dataset={state.dataset}
                    visible={state.view === ViewType.Graph}
                    welcome={props.welcome}/>
                <TableView
                    tables={null}
                    visible={state.view === ViewType.Table}
                    welcome={props.welcome}/>
            </div>
        );

    }

    /**
     * Initialize the connection with the data provider.
     *
     * @remarks
     * Sets up monitoring of the connection between Sterling and the data
     * provider by providing callbacks that are called when the connection is
     * established, when the connection is lost, and when data is received.
     *
     * @private
     */
    private _initializeConnection = () => {

        const connection = this.props.connection;
        const metadata = this.props.metadata;

        connection
            .onConnected(() => {
                this.setState({connected: true});
                connection.requestCurrent();
            })
            .onDisconnected(() => {
                this.setState({connected: false});
            })
            .onData((data: any) => {
                this.setState({
                    ready: this.state.connected,
                    dataset: metadata(data)
                });
            })
            .connect();

    };

    /**
     * Request the next dataset from the data provider.
     *
     * @remarks
     * Sets the 'ready' state to false, deactivating the 'Next' button. The
     * 'ready' state will remain false until we receive a dataset from the
     * provider.
     *
     * @private
     */
    private _requestNext = () => {

        this.setState({ready: false});
        this.props.connection.requestNext();

    };

    /**
     * Sets the view that is visible to the user.
     * @param view The view to make visible to the user
     * @private
     */
    private _setView = (view: ViewType) => {

        this.setState({view: view});

    };

}


export default Sterling;
