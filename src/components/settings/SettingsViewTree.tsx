import * as React from 'react';
import SterlingSettings, { ViewSide } from '../../SterlingSettings';
import { InlineFormGroup } from './components/InlineFormGroup';
import { HTMLSelect } from '@blueprintjs/core';
import { capitalize } from './util';

interface ISettingsViewTreeState {
    sidebarSide: ViewSide
}

class SettingsViewTree extends React.Component<{}, ISettingsViewTreeState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('treeViewSidebarSide')
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
        SterlingSettings.set('treeViewSidebarSide', event.currentTarget.value.toLowerCase());
    };

    private _watchSettings () {

        SterlingSettings.watch('treeViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        });

    }

}

export default SettingsViewTree;
