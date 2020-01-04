import { Checkbox, FormGroup } from '@blueprintjs/core';
import React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';

class LabelsSection extends React.Component {

    render (): React.ReactNode {

        return (
            <SterlingSidebar.Section
                collapsed={false}
                onToggleCollapse={() => {}}
                title={'Label Options'}>

                <FormGroup
                    label={'Display Labels:'}>

                    <Checkbox checked={false} label={'Meshes'}/>
                    <Checkbox checked={true} label={'Elements'}/>
                    <Checkbox checked={true} label={'Nodes'}/>

                </FormGroup>

            </SterlingSidebar.Section>
        )

    }

}

export default LabelsSection;
