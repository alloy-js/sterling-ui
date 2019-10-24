import * as React from 'react';
import SterlingSidebar from '../../../SterlingSidebar';
import { Alignment, Switch } from '@blueprintjs/core';
import { ITableViewState, TablesType } from '../TableView';

export interface IDataSectionProps extends ITableViewState {
    onToggleBuiltin: () => void,
    onToggleEmpty: () => void,
    onToggleRemoveThis: () => void
}

export interface IDataSectionState {
    collapsed: boolean
}

class DataSection extends React.Component<IDataSectionProps, IDataSectionState> {

    public state = {
        collapsed: false
    };

    render (): React.ReactNode {

        const props = this.props;
        const state = this.state;

        return (
            <SterlingSidebar.Section
                collapsed={state.collapsed}
                onToggleCollapse={this._toggleCollapse}
                title='Data Options'>

                <Switch
                    alignIndicator={Alignment.LEFT}
                    checked={props.removeBuiltin}
                    disabled={props.tables === TablesType.Select}
                    label='Hide Built-in Signatures'
                    onChange={props.onToggleBuiltin}/>

                <Switch
                    alignIndicator={Alignment.LEFT}
                    checked={props.removeEmpty}
                    disabled={props.tables === TablesType.Select}
                    label='Hide Empty Tables'
                    onChange={props.onToggleEmpty}/>

                <Switch
                    alignIndicator={Alignment.LEFT}
                    checked={props.removeThis}
                    label='Remove "this" from Signature names'
                    onChange={props.onToggleRemoveThis}/>

            </SterlingSidebar.Section>
        )

    }

    /**
     * Toggle the collapsed state of this section
     * @private
     */
    private _toggleCollapse = (): void => {

        const curr = this.state.collapsed;
        this.setState({collapsed: !curr});

    }

}

export default DataSection;
