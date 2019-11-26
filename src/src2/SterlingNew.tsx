import { NonIdealState } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import React from 'react';
import SterlingNavbarNew from './components/SterlingNavbarNew';
import { SterlingMetadata } from './SterlingMetadata';
import { SterlingConnection, SterlingViewProps } from './SterlingTypes';

export interface IViewProperties {
    name: string,
    icon: IconName,
    view: React.ComponentType<any>,
    transform?: (data: any) => any
}

interface ISterlingPropsNew {
    connection: SterlingConnection,
    message?: string,
    metadata: null | SterlingMetadata | ((data: any) => SterlingMetadata),
    views: IViewProperties[]
}

interface ISterlingStateNew {
    connected: boolean,
    data: any | null,
    ready: boolean,
    view: string
}

class SterlingNew extends React.Component<ISterlingPropsNew, ISterlingStateNew> {

    constructor (props: ISterlingPropsNew) {

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
        const meta = getMeta(props, state);
        const View = getCurrentView(props, state);

        const trans = getCurrentTransform(props, state);
        const data = trans ? trans(state.data) : state.data;

        return (
            <div className={'sterling'}>
                <SterlingNavbarNew
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

function getCurrentTransform (props: ISterlingPropsNew, state: ISterlingStateNew): ((data: any) => any) | null {

    const name = state.view;
    const views = props.views;
    const view = views.find(view => view.name === name);
    return view ? view.transform || null : null;

}

function getCurrentView (props: ISterlingPropsNew, state: ISterlingStateNew): React.ComponentType<any> | null {

    const name = state.view;
    const views = props.views;
    const view = views.find(view => view.name === name);
    return view ? view.view : null;

}

function getIcon (view: string, views: IViewProperties[]): IconName | null {
    const v = views.find(curr => curr.name === view);
    return v ? v.icon : null;
}

function getMeta (props: ISterlingPropsNew, state: ISterlingStateNew): SterlingMetadata {

    const meta = props.metadata;
    if (!meta) return new SterlingMetadata();
    if (typeof meta === 'function') return meta(state.data);
    return meta;

}

export default SterlingNew;
