import { NonIdealState } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import React from 'react';
import { SterlingMetadata } from './SterlingMetadata';
import SterlingNavbar from './SterlingNavbar';
import { ISterlingUIView, SterlingConnection } from './SterlingTypes';

interface ISterlingProps {
    connection: SterlingConnection,
    message?: string,
    metadata?: SterlingMetadata | ((data: any) => SterlingMetadata),
    views: ISterlingUIView[]
}

interface ISterlingState {
    connected: boolean,
    dataRaw: any,
    dataTransformed: any[],
    ready: boolean,
    view: string
}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    constructor (props: ISterlingProps) {

        super(props);

        this.state = {
            connected: false,
            dataRaw: null,
            dataTransformed: [],
            ready: false,
            view: props.views.length ? props.views[0].name : ''
        };

        this._initializeConnection();

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;
        const meta = this._metadata();

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
                    state.dataTransformed.length
                        ? this._views()
                        : this._placeholder()
                }
            </div>
        )

    }

    /**
     * Get the icon associated with the currently selected view
     * @private
     */
    private _currentIcon = (): IconName | null => {

        const curr = this.state.view;
        const view = this.props.views.find(v => v.name === curr);
        return view ? view.icon : null;

    };

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
                const transforms = this.props.views.map(view => view.transform);
                const transformed = transforms.map(t => t ? t(data) : data);
                this.setState({
                    ready: this.state.connected,
                    dataRaw: data,
                    dataTransformed: transformed
                });
            })
            .connect();

    };

    /**
     * Get the current metadata
     * @private
     */
    private _metadata = () => {

        const meta = this.props.metadata;
        if (!meta) return new SterlingMetadata();
        if (typeof meta === 'function') return meta(this.state.dataRaw);
        return meta;

    };

    /**
     * Get the placeholder view that is used when there is no data
     * @private
     */
    private _placeholder = (): React.ReactNode => {

        const props = this.props;

        return <NonIdealState
            icon={this._currentIcon()}
            title={'Welcome to Sterling'}
            description={props.message}/>;
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
     * Get all views for display
     * @private
     */
    private _views = (): React.ReactNode => {

        const props = this.props;
        const state = this.state;

        return <div className={'sterling-view'}>
            {
                props.views.map((view: ISterlingUIView, i: number) => {

                    const View = view.view;
                    const data = state.dataTransformed[i];

                    return <View
                        key={view.name}
                        data={data}
                        visible={state.view === view.name}/>

                })
            }
        </div>;

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

export default Sterling;
