import React from 'react';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarHeading
} from '@blueprintjs/core';

class NavBar extends React.Component {

    render (): React.ReactNode {

        return (
            <Navbar fixedToTop>
                <Navbar.Group>
                    <NavbarHeading className='nav-heading'>
                        Sterling
                    </NavbarHeading>
                    <NavbarDivider/>
                    <Button className={Classes.MINIMAL} active={true} large={true} icon='graph' text='Graph'/>
                    <Button className={Classes.MINIMAL} large={true} icon='th' text='Table'/>
                    <Button className={Classes.MINIMAL} large={true} icon='diagram-tree' text='Tree'/>
                    <Button className={Classes.MINIMAL} large={true} icon='document' text='Source'/>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Button large={true} intent='success' rightIcon='circle-arrow-right' text='Next'/>
                </Navbar.Group>
            </Navbar>
        )

    }

}

export default NavBar;
