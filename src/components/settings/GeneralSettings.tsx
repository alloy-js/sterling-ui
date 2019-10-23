import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import * as React from 'react';
import SterlingSettings from '../../SterlingSettings';

export interface IGeneralSettingsProps {
    settings: SterlingSettings
}

class GeneralSettings extends React.Component<IGeneralSettingsProps> {

    render (): React.ReactNode {

        const settings: SterlingSettings = this.props.settings;

        return (
            <div>
                <FormGroup
                    label='Default View'>
                    <HTMLSelect
                        options={['graph', 'table', 'tree', 'source']}
                        onChange={(event) => {settings.set('defaultView', event.target.value)}}
                        value={settings.defaultView}/>
                </FormGroup>
            </div>);
    }

}

export default GeneralSettings;
