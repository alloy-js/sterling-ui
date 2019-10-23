import * as React from 'react';
import { Callout, Classes, Dialog, Intent, Tab, Tabs } from '@blueprintjs/core';
import SterlingSettings from '../../SterlingSettings';
import GeneralSettings from './GeneralSettings';
import GraphViewSettings from './GraphViewSettings';
import TableViewSettings from './TableViewSettings';
import TreeViewSettings from './TreeViewSettings';
import SourceViewSettings from './SourceViewSettings';

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
                        <Tab id='general' title='General' panel={<GeneralSettings/>}/>
                        <Tab id='graph' title='Graph View' panel={<GraphViewSettings/>}/>
                        <Tab id='table' title='Table View' panel={<TableViewSettings/>}/>
                        <Tab id='tree' title='Tree View' panel={<TreeViewSettings/>}/>
                        <Tab id='source' title='Source View' panel={<SourceViewSettings/>}/>
                    </Tabs>
                </div>
            </Dialog>
        );

    }

}

export default SterlingSettingsDialog;
