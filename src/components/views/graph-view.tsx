import React from 'react';
import SideBar from '../bars/side-bar';
import { Button, Card } from '@blueprintjs/core';


class GraphView extends React.Component {

    render (): React.ReactNode {

        return (
            <SideBar>
                <Card>
                    <h3>Sidebar</h3>
                    <p>This is in a sidebar.</p>
                    <Button>Click Here.</Button>
                </Card>
            </SideBar>
        );

    }

}

export default GraphView;
