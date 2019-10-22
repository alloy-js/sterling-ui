import * as React from 'react';

interface IGeneralSettingsProps {
    initialView: 'graph' | 'table' | 'tree' | 'source'
}

class GeneralSettings extends React.Component<IGeneralSettingsProps> {

    render (): React.ReactNode {
        return (
            <div>
                General Settings
            </div>);
    }

}

export default GeneralSettings;
