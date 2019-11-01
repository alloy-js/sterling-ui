import { HTMLSelect } from '@blueprintjs/core';
import React from 'react';
import SterlingSettings, { ViewSide } from '../../SterlingSettings';
import { InlineFormGroup } from './components/InlineFormGroup';
import { capitalize } from './util';

interface ISettingsViewCustomState {
    sidebarSide: ViewSide
}

class SettingsViewCustom extends React.Component<{}, ISettingsViewCustomState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('customViewSidebarSide')
        };

        this._watchSettings();

    }

    render (): React.ReactNode {

        return (
            <>
                <InlineFormGroup
                    label='Sidebar Side'>
                    <HTMLSelect
                        options={['Left', 'Right']}
                        onChange={this._onSelectSidebarSide}
                        value={capitalize(this.state.sidebarSide)}/>
                </InlineFormGroup>
            </>
        );

    }

    private _onSelectSidebarSide = (event: React.ChangeEvent<HTMLSelectElement>) => {

        SterlingSettings.set('customViewSidebarSide', event.currentTarget.value.toLowerCase());

    };

    private _watchSettings () {

        SterlingSettings.watch('customViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        })

    }

}

export default SettingsViewCustom;
