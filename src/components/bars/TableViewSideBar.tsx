import React from 'react';
import SideBar from './SideBar';
import { Navbar } from '@blueprintjs/core';

class TableViewSideBar extends React.Component {

    render (): React.ReactNode {

        return (
            <SideBar>
                <SideBar.Navbar>
                    <Navbar.Group>
                        Table
                    </Navbar.Group>
                </SideBar.Navbar>
            </SideBar>
        )

    }

}

export default TableViewSideBar;
