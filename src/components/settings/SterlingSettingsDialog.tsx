import * as React from 'react';
import { Callout, Classes, Dialog, Intent, Tab, Tabs } from '@blueprintjs/core';
import SterlingSettings from '../../SterlingSettings';
import GeneralSettings from './GeneralSettings';

const STORAGE_API_LINK = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API';

export interface ISterlingSettingsProps {
    onClose: () => void,
    isOpen: boolean,
    settings: SterlingSettings
}

class SterlingSettingsDialog extends React.Component<ISterlingSettingsProps> {

    render (): React.ReactNode {

        return (
            <Dialog
                icon='cog'
                isOpen={this.props.isOpen}
                onClose={this.props.onClose}
                title='Sterling Settings'>
                <div className={Classes.DIALOG_BODY}>
                    {
                        !SterlingSettings.supportsPersistentStorage() &&
                        <Callout intent={Intent.WARNING}>
                            Your browser does not support the {
                                <a target='_blank'
                                   rel='noopener noreferrer'
                                   href={STORAGE_API_LINK}>Web Storage API</a>
                            }, so settings may not persist after this window is closed.
                            To ensure that settings are saved across sessions, please
                            upgrade your browser.
                        </Callout>
                    }
                    <Tabs
                        animate={true}
                        renderActiveTabPanelOnly={true}
                        vertical={true}>
                        <Tab id='views' title='General' panel={
                            <GeneralSettings settings={this.props.settings}/>
                        }/>
                        <Tab id='graph' title='Graph View' panel={<div/>}/>
                        <Tab id='table' title='Table View' panel={<div/>}/>
                        <Tab id='tree' title='Tree View' panel={<div/>}/>
                        <Tab id='source' title='Source View' panel={<div/>}/>
                    </Tabs>
                </div>
            </Dialog>
        );

    }

}

export default SterlingSettingsDialog;
