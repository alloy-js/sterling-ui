import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarHeading,
    Tag
} from '@blueprintjs/core';
import React from 'react';
import { ViewType } from '../SterlingTypes';

interface ISterlingNavbarProps {
    connected: boolean,
    command: string,
    onRequestNext: () => void,
    onRequestView: (view: ViewType) => void,
    ready: boolean,
    view: ViewType
}

class SterlingNavbar extends React.Component<ISterlingNavbarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <Navbar fixedToTop className='nav bp3-dark'>
                <Navbar.Group>
                    <NavbarHeading className='nav-heading'>
                        Sterling
                    </NavbarHeading>
                    <NavbarDivider/>
                    <Button
                        className={Classes.MINIMAL}
                        active={props.view === ViewType.Graph}
                        large={true}
                        icon='graph'
                        text='Graph'
                        onClick={() => props.onRequestView(ViewType.Graph)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={props.view === ViewType.Table}
                        large={true}
                        icon='th'
                        text='Table'
                        onClick={() => props.onRequestView(ViewType.Table)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={props.view === ViewType.Tree}
                        large={true}
                        icon='diagram-tree'
                        text='Tree'
                        onClick={() => props.onRequestView(ViewType.Tree)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={props.view === ViewType.Source}
                        large={true}
                        icon='document'
                        text='Source'
                        onClick={() => props.onRequestView(ViewType.Source)}/>
                    <Button
                        className={Classes.MINIMAL}
                        active={props.view === ViewType.Script}
                        large={true}
                        icon='code'
                        text='Script'
                        onClick={() => props.onRequestView(ViewType.Script)}/>
                    <NavbarDivider/>
                </Navbar.Group>
                <Navbar.Group className='collapsing' align={Alignment.RIGHT}>
                    {
                        props.command.length > 0 &&
                        <Tag
                            minimal={true}>
                            {props.command}
                        </Tag>
                    }
                    {
                        props.command.length > 0 &&
                        <Navbar.Divider />
                    }
                    <Button
                        large={true}
                        disabled={!props.ready}
                        intent={props.connected ? 'success' : 'danger'}
                        rightIcon='circle-arrow-right'
                        text='Next'
                        onClick={() => props.onRequestNext()}/>
                </Navbar.Group>
            </Navbar>
        )

    }

}

export default SterlingNavbar;
