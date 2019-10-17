import { Navbar } from '@blueprintjs/core';
import React from 'react';
import SideBar from '../SideBar';

class TreeViewSideBar extends React.Component {

    render(): React.ReactNode {

        return (
            <SideBar>
                <SideBar.Navbar>
                    <Navbar.Group>
                        Tree
                    </Navbar.Group>
                </SideBar.Navbar>
            </SideBar>
        )

    }

}

export default TreeViewSideBar;