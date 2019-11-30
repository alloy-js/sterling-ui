import { Alignment, FormGroup, Switch } from '@blueprintjs/core';
import React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';
import { ITableViewSidebarProps } from '../TableViewSidebar';

class DataSection extends React.Component<ITableViewSidebarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar.Section
                collapsed={props.collapseData}
                onToggleCollapse={props.onToggleCollapseData}
                title={'Data Options'}>

                <FormGroup>

                    <Switch
                        alignIndicator={Alignment.LEFT}
                        checked={props.removeEmpty}
                        label='Hide Empty Tables'
                        onChange={props.onToggleEmpty}/>

                </FormGroup>

            </SterlingSidebar.Section>
        )

    }

}

export default DataSection;
