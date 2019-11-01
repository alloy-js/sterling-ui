import * as React from 'react';
import { Callout, Classes, Dialog, Intent, Tab, Tabs } from '@blueprintjs/core';
import SterlingSettings from '../../SterlingSettings';
import SettingsViewCustom from './SettingsViewCustom';
import SettingsViewGeneral from './SettingsViewGeneral';
import SettingsViewGraph from './SettingsViewGraph';
import SettingsViewTable from './SettingsViewTable';
import SettingsViewTree from './SettingsViewTree';
import SettingsViewSource from './SettingsViewSource';

const STORAGE_API_LINK = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API';

export interface ISterlingSettingsProps {
    onClose: () => void,
    isOpen: boolean
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
                        id='settings'
                        vertical={true}>
                        <Tab id='general' title='General' panel={<SettingsViewGeneral/>}/>
                        <Tab id='graph' title='Graph View' panel={<SettingsViewGraph/>}/>
                        <Tab id='table' title='Table View' panel={<SettingsViewTable/>}/>
                        <Tab id='tree' title='Tree View' panel={<SettingsViewTree/>}/>
                        <Tab id='source' title='Source View' panel={<SettingsViewSource/>}/>
                        <Tab id='custom' title='Custom View' panel={<SettingsViewCustom/>}/>
                    </Tabs>
                </div>
            </Dialog>
        );

    }

}

export default SterlingSettingsDialog;
