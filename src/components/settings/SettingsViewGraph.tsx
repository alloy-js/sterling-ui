import * as React from 'react';
import SterlingSettings, { ViewSide } from '../../SterlingSettings';
import { InlineFormGroup } from './components/InlineFormGroup';
import { HTMLSelect } from '@blueprintjs/core';
import { capitalize } from './util';

interface ISettingsViewGraphState {
    sidebarSide: ViewSide
}

class SettingsViewGraph extends React.Component<{}, ISettingsViewGraphState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('graphViewSidebarSide')
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

        SterlingSettings.set('graphViewSidebarSide', event.currentTarget.value.toLowerCase());

    };

    private _watchSettings () {

        SterlingSettings.watch('graphViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        });

    }

}

export default SettingsViewGraph;
