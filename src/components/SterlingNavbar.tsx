import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarHeading,
    Position,
    Tag,
    Tooltip
} from '@blueprintjs/core';
import React from 'react';
import { ViewType } from '../SterlingSettings';

interface INavBarProps {
    connected: boolean,
    command: string,
    onRequestNext: () => void,
    onRequestView: (view: ViewType) => void,
    onRequestSettings: () => void,
    ready: boolean,
    view: string
}

class SterlingNavbar extends React.Component<INavBarProps> {

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
                        onClick={() => this.props.onRequestView(ViewType.Graph)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'table'}
                        large={true}
                        icon='th'
                        text='Table'
                        onClick={() => this.props.onRequestView(ViewType.Table)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'tree'}
                        large={true}
                        icon='diagram-tree'
                        text='Tree'
                        onClick={() => this.props.onRequestView(ViewType.Tree)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={this.props.view === 'source'}
                        large={true}
                        icon='document'
                        text='Source'
                        onClick={() => this.props.onRequestView(ViewType.Source)}/>
                    <NavbarDivider/>
                    <Tooltip
                        content='Sterling Settings'
                        position={Position.RIGHT}>
                        <Button
                            className={Classes.MINIMAL}
                            large={true}
                            icon='cog'
                            onClick={this.props.onRequestSettings}/>
                    </Tooltip>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    {
                        this.props.command.length > 0 &&
                        <Tag
                            minimal={true}>
                            {this.props.command}
                        </Tag>
                    }
                    {
                        this.props.command.length > 0 &&
                        <Navbar.Divider />
                    }
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

export default SterlingNavbar;
