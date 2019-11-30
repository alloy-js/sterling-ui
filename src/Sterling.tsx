import { NonIdealState } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import React from 'react';
import SterlingNavbar from './SterlingNavbar';
import { SterlingMetadata } from './SterlingMetadata';
import { ISterlingUIView, SterlingConnection } from './SterlingTypes';

interface ISterlingProps {
    connection: SterlingConnection,
    message?: string,
    metadata?: SterlingMetadata | ((data: any) => SterlingMetadata),
    views: ISterlingUIView[]
}

interface ISterlingState {
    connected: boolean,
    data: any | null,
    ready: boolean,
    view: string
}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    constructor (props: ISterlingProps) {

        super(props);

        this.state = {
            connected: false,
            data: null,
            ready: false,
            view: props.views.length ? props.views[0].name : ''
        };

        this._initializeConnection();

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        // The metadata associated with the current dataset
        const meta = getMeta(props, state);

        // The currently selected view
        const View = getCurrentView(props, state);

        // The function that will transform the current data in
        // to a form that is useable by the current view
        const trns = getCurrentTransform(props, state);

        // The transformed data
        const data = trns ? trns(state.data) : state.data;

        return (
            <div className={'sterling'}>
                <SterlingNavbar
                    connected={state.connected}
                    command={meta.attr('command') || ''}
                    onRequestNext={this._requestNext}
                    onRequestView={this._setView}
                    ready={state.ready}
                    view={state.view}
                    views={props.views}/>
                {
                    state.data === null
                        ? <NonIdealState
                            icon={getIcon(state.view, props.views) || 'lightbulb'}
                            title={'Welcome to Sterling'}
                            description={props.message}/>
                        : <div className={'sterling-view'}>
                            {
                                View &&
                                <View data={data}/>
                            }
                          </div>
                }
            </div>
        )

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
                    data: data
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
    private _setView = (view: string) => {

        this.setState({view: view});

    };

}

function getCurrentTransform (props: ISterlingProps, state: ISterlingState): ((data: any) => any) | null {

    const name = state.view;
    const views = props.views;
    const view = views.find(view => view.name === name);
    return view ? view.transform || null : null;

}

function getCurrentView (props: ISterlingProps, state: ISterlingState): React.ComponentType<any> | null {

    const name = state.view;
    const views = props.views;
    const view = views.find(view => view.name === name);
    return view ? view.view : null;

}

function getIcon (view: string, views: ISterlingUIView[]): IconName | null {
    const v = views.find(curr => curr.name === view);
    return v ? v.icon : null;
}

function getMeta (props: ISterlingProps, state: ISterlingState): SterlingMetadata {

    const meta = props.metadata;
    if (!meta) return new SterlingMetadata();
    if (typeof meta === 'function') return meta(state.data);
    return meta;

}

export default Sterling;
