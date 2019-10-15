import React from 'react';
import SideBar from './SideBar';
import { Alignment, Button, Classes, Navbar, Tooltip } from '@blueprintjs/core';

class GraphViewSideBar extends React.Component {

    render (): React.ReactNode {

        return (
            <SideBar>
                <SideBar.Navbar>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <Tooltip position='bottom' content='Force Layout'>
                            <Button
                                className={Classes.MINIMAL}
                                icon='layout-auto'/>
                        </Tooltip>
                        <Tooltip position='bottom' content='Dagre Layout'>
                            <Button
                                className={Classes.MINIMAL}
                                icon='layout-hierarchy'/>
                        </Tooltip>
                        <Tooltip position='bottom' content='Balloon Layout'>
                            <Button
                                className={Classes.MINIMAL}
                                icon='layout-balloon'/>
                        </Tooltip>
                        <Tooltip position='bottom' content='Circular Layout'>
                            <Button
                                className={Classes.MINIMAL}
                                icon='layout-circle'/>
                        </Tooltip>
                    </Navbar.Group>
                </SideBar.Navbar>
            </SideBar>
        )

    }

}

export default GraphViewSideBar;
