import { Radio, RadioGroup } from '@blueprintjs/core';
import React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';

class LayoutSection extends React.Component {

    render (): React.ReactNode {

        return (
            <SterlingSidebar.Section
                collapsed={false}
                onToggleCollapse={() => {}}
                title={'Layout Options'}>

                <RadioGroup
                    label={'Display As:'}
                    selectedValue={'embed'}
                    onChange={() => {}}>
                    <Radio label={'Planar Embedding'} value={'embed'}/>
                    <Radio label={'Directed Graph'} value={'graph'}/>
                </RadioGroup>

            </SterlingSidebar.Section>
        )

    }

}

export default LayoutSection;
