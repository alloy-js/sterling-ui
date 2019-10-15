import React from 'react';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarHeading
} from '@blueprintjs/core';

interface INavBarProps {
    connected: boolean,
    onRequestNext: Function,
    onRequestView: Function,
    ready: boolean,
    view: string
}

class NavBar extends React.Component<INavBarProps> {

    render (): React.ReactNode {

        return (
            <Navbar fixedToTop className='nav bp3-dark'>
                <Navbar.Group>
                    <NavbarHeading className='nav-heading'>
                        Sterling
                    </NavbarHeading>
                    <NavbarDivider/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'graph'}
                        large={true}
                        icon='graph'
                        text='Graph'
                        onClick={() => this.props.onRequestView('graph')}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'table'}
                        large={true}
                        icon='th'
                        text='Table'
                        onClick={() => this.props.onRequestView('table')}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'tree'}
                        large={true}
                        icon='diagram-tree'
                        text='Tree'
                        onClick={() => this.props.onRequestView('tree')}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'source'}
                        large={true}
                        icon='document'
                        text='Source'
                        onClick={() => this.props.onRequestView('source')}/>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button
                        large={true}
                        disabled={!this.props.ready}
                        intent={this.props.connected ? 'success' : 'danger'}
                        rightIcon='circle-arrow-right'
                        text='Next'
                        onClick={() => this.props.onRequestNext()}/>
                </Navbar.Group>
            </Navbar>
        )

    }

}

export default NavBar;
