import {
    Alignment,
    Button,
    ButtonGroup,
    Card,
    FormGroup,
    Switch
} from '@blueprintjs/core';
import React from 'react';
import SideBar from '../SideBar';

class TableViewSideBar extends React.Component {

    render (): React.ReactNode {

        return (
            <SideBar>
                <SideBar.Section label='Data Options'>
                    <Switch
                        alignIndicator={Alignment.RIGHT}
                        label='Show Built-in Signatures'/>
                    <Switch
                        alignIndicator={Alignment.RIGHT}
                        label='Show Empty Tables'/>
                </SideBar.Section>
                <SideBar.Section label='Layout Options'>
                    <Switch
                        alignIndicator={Alignment.RIGHT}
                        label='Group into Signatures and Fields'/>
                    <FormGroup
                        className='spread'
                        inline={true}
                        label='Layout'>
                        <ButtonGroup>
                            <Button
                                active={true}
                                icon='grid-view'>
                                Grid
                            </Button>
                            <Button
                                icon='list'>
                                List
                            </Button>
                        </ButtonGroup>
                    </FormGroup>
                </SideBar.Section>
            </SideBar>
        )

    }

}

export default TableViewSideBar;
