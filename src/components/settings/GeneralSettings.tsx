import { HTMLSelect } from '@blueprintjs/core';
import * as React from 'react';
import SterlingSettings, { ViewType } from '../../SterlingSettings';
import { InlineFormGroup } from './InlineFormGroup';
import { capitalize } from './SettingsUtil';

export interface IGeneralSettingsState {
    defaultView: ViewType
}

class GeneralSettings extends React.Component<{}, IGeneralSettingsState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            defaultView: SterlingSettings.get('defaultView')
        };

        this.watchSettings();

    }

    render (): React.ReactNode {

        return (
            <>
                <InlineFormGroup
                    label='Default View'
                    helperText='The view to display when Sterling opens'>
                    <HTMLSelect
                        options={['Graph', 'Table', 'Tree', 'Source']}
                        onChange={this.onSelectDefaultView}
                        value={capitalize(this.state.defaultView)}/>
                </InlineFormGroup>
            </>);
    }

    private onSelectDefaultView = (event: React.ChangeEvent<HTMLSelectElement>) => {
        SterlingSettings.set('defaultView', event.currentTarget.value.toLowerCase());
    };

    private watchSettings () {

        SterlingSettings.watch('defaultView', (value: ViewType) => {
            this.setState({defaultView: value})
        });

    }

}

export default GeneralSettings;
