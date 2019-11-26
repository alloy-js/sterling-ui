import {
    Alignment,
    Button,
    Classes, IconName,
    Navbar,
    NavbarDivider,
    NavbarHeading,
    Tag
} from '@blueprintjs/core';
import React from 'react';

interface ISterlingNavbarProps {
    connected: boolean,
    command: string,
    onRequestNext: () => void,
    onRequestView: (view: string) => void,
    ready: boolean,
    view: string,
    views: {
        name: string,
        icon: IconName
    }[]
}

class SterlingNavbarNew extends React.Component<ISterlingNavbarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <Navbar fixedToTop className={'nav bp3-dark'}>
                <Navbar.Group>
                    <NavbarHeading className='nav-heading'>
                        Sterling
                    </NavbarHeading>
                    <NavbarDivider/>
                    {
                        props.views.map(view => (
                            <Button
                                key={view.name}
                                className={Classes.MINIMAL}
                                active={view.name === props.view}
                                large={true}
                                icon={view.icon}
                                text={view.name}
                                onClick={() => props.onRequestView(view.name)}/>
                        ))
                    }
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

export default SterlingNavbarNew;
