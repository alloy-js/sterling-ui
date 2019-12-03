import {
    Button,
    Classes,
    IconName,
    Navbar,
    NavbarDivider,
    NavbarHeading
} from '@blueprintjs/core';
import React from 'react';
import SterlingConnection from '../SterlingConnection';

export interface ISterlingNavbarProps {
    connection: SterlingConnection,
    onRequestView: (view: string) => void,
    view: string,
    views: {
        name: string,
        icon: IconName
    }[]
}

class SterlingNavbar extends React.Component<ISterlingNavbarProps> {

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
                {
                    props.children
                }
            </Navbar>
        )

    }

}

export default SterlingNavbar;
