import { Button, Navbar, Tag } from '@blueprintjs/core';
import { Alignment } from '@blueprintjs/core/lib/esm/common/alignment';
import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import SterlingNavbar, { ISterlingNavbarProps } from '../SterlingNavbar';

interface IAlloyNavbarState {
    command: string,
    connected: boolean,
    ready: boolean,
}

class AlloyNavbar extends React.Component<ISterlingNavbarProps, IAlloyNavbarState> {

    state = {
        command: '',
        connected: false,
        ready: false
    };

    componentDidMount (): void {

        const connection = this.props.connection;

        connection.on('connect', () => {
            this.setState({connected: true});
            connection.request('current');
        });

        connection.on('disconnect', () => {
            this.setState({connected: false, ready: false});
        });

        connection.on('instance', (instance: AlloyInstance) => {
            this.setState({
                command: instance.command(),
                ready: this.state.connected
            });
        });

    }

    render (): React.ReactNode {
        
        const props = this.props;
        const state = this.state;
        
        return (
            <SterlingNavbar {...props}>
                <Navbar.Group className='collapsing' align={Alignment.RIGHT}>
                    {
                        state.command.length > 0 &&
                        <Tag
                            minimal={true}>
                            {state.command}
                        </Tag>
                    }
                    {
                        state.command.length > 0 &&
                        <Navbar.Divider />
                    }
                    <Button
                        large={true}
                        disabled={!state.ready}
                        intent={state.connected ? 'success' : 'danger'}
                        rightIcon='circle-arrow-right'
                        text='Next'
                        onClick={this._requestNext}/>
                </Navbar.Group>
            </SterlingNavbar>
        )

    }

    _requestNext = () => {

        this.props.connection.request('next');

    }

}

export default AlloyNavbar;
