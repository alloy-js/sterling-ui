import React from 'react';
import { Navbar } from '@blueprintjs/core';

class SideBarNavBar extends React.Component {

    render (): React.ReactNode {

        return (
            <Navbar>
                <div style={{margin: '0 auto', width: '100%'}}>
                    {this.props.children}
                </div>
            </Navbar>
        )

    }

}

class SideBar extends React.Component {

    static Navbar = SideBarNavBar;

    render (): React.ReactNode {

        return (
            <div className='sidebar'>
                {this.props.children}
            </div>
        )

    }

}

export default SideBar;
