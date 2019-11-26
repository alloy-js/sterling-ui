import React from 'react';
import { SterlingMetadata } from './SterlingMetadata';
import { SterlingConnection } from './SterlingTypes';

interface ISterlingViewProps {
    data: any
}

interface ISterlingProps {
    connection: SterlingConnection,
    metadata: null | SterlingMetadata | ((data: any) => SterlingMetadata),
    views: {
        name: string,
        icon: string,
        view: React.Component<ISterlingViewProps>
    }[]
}

interface ISterlingState {
    connected: boolean,
    data: any | null,
    ready: boolean
}

class SterlingTest extends React.Component {

}

export default SterlingTest;
