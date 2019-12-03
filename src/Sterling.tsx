import { NonIdealState } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import React from 'react';
import SterlingConnection from './SterlingConnection';
import { ISterlingUIView } from './SterlingTypes';
import { ISterlingNavbarProps } from './views/SterlingNavbar';

interface ISterlingProps {
    connection: SterlingConnection,
    navbar: React.ComponentType<ISterlingNavbarProps>,
    views: ISterlingUIView[],
    message?: string
}

interface ISterlingState {
    data: any[],
    view: string
}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    constructor (props: ISterlingProps) {

        super(props);

        this.state = {
            data: [],
            view: props.views.length ? props.views[0].name : ''
        };

    }

    componentDidMount (): void {

        this._initializeConnection();

    }

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;
        const Navbar = props.navbar;

        return (
            <div className={'sterling'}>
                <Navbar
                    connection={props.connection}
                    onRequestView={this._setView}
                    view={state.view}
                    views={props.views}/>
                {
                    state.data.length
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
            .on('instance', (instance: any) => {
                const transforms = this.props.views.map(view => view.transform);
                const transformed = transforms.map(t => t ? t(instance) : instance);
                this.setState({
                    data: transformed
                });
            });

        connection.connect();

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
                    const data = state.data[i];

                    return <View
                        key={view.name}
                        connection={props.connection}
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
