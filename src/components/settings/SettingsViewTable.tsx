import * as React from 'react';
import SterlingSettings, { ViewSide } from '../../SterlingSettings';
import { InlineFormGroup } from './components/InlineFormGroup';
import { HTMLSelect } from '@blueprintjs/core';
import { capitalize } from './util';

interface ISettingsViewTableState {
    sidebarSide: ViewSide
}

class SettingsViewTable extends React.Component<{}, ISettingsViewTableState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('tableViewSidebarSide')
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
        SterlingSettings.set('tableViewSidebarSide', event.currentTarget.value.toLowerCase());
    };

    private _watchSettings () {

        SterlingSettings.watch('tableViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        });

    }

}

export default SettingsViewTable;
