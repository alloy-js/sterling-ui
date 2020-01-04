import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import { IMeshViewState } from './MeshView';
import LabelsSection from './sidebar-components/LabelsSection';
import LayoutSection from './sidebar-components/LayoutSection';

interface IMeshViewSidebarProps extends IMeshViewState {
    onToggleCollapseSidebar: () => void,
    visible: boolean
}

class MeshViewSidebar extends React.Component<IMeshViewSidebarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar
                collapsed={props.collapseSidebar}
                onToggleCollapse={props.onToggleCollapseSidebar}
                sidebarSide={props.sidebarSide}
                title={'Mesh View Settings'}
                visible={props.visible}>

                <LayoutSection/>
                <LabelsSection/>

            </SterlingSidebar>
        );

    }

}

export default MeshViewSidebar;
