import * as React from 'react';
import SterlingSettings, { ViewSide } from '../../SterlingSettings';
import { InlineFormGroup } from './InlineFormGroup';
import { HTMLSelect } from '@blueprintjs/core';
import { capitalize } from './SettingsUtil';

interface ISourceViewSettingsState {
    sidebarSide: ViewSide
}

class SourceViewSettings extends React.Component<{}, ISourceViewSettingsState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            sidebarSide: SterlingSettings.get('sourceViewSidebarSide')
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
        SterlingSettings.set('sourceViewSidebarSide', event.currentTarget.value.toLowerCase());
    };

    private _watchSettings () {

        SterlingSettings.watch('sourceViewSidebarSide', (value: ViewSide) => {
            this.setState({sidebarSide: value});
        });

    }

}

export default SourceViewSettings;
