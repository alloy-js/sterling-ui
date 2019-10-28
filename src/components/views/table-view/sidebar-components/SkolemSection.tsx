import React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';
import { ITableViewState } from '../TableView';

export interface ISkolemSectionProps extends ITableViewState {
    onToggleCollapse: () => void
}

class SkolemSection extends React.Component<ISkolemSectionProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar.Section
                collapsed={props.collapseSkolem}
                onToggleCollapse={props.onToggleCollapse}
                title='Skolem Options'>

            </SterlingSidebar.Section>
        )

    }

}

export default SkolemSection;
