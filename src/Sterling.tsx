import React from 'react';
import NavBar from './components/bars/NavBar';
import GraphView from './components/views/GraphView';
import TableView from './components/views/TableView';
import TreeView from './components/views/TreeView';
import SourceView from './components/views/SourceView';
import { NonIdealState } from '@blueprintjs/core';

interface ISterlingState {
    view: string
}

interface ISterlingProps {

}

class Sterling extends React.Component<ISterlingProps, ISterlingState> {

    state = {
        view: 'graph'
    };

    render(): React.ReactNode {

        return (
            <div className='sterling'>
                <NavBar
                    view={this.state.view}
                    onRequestView={(view: string) => this._setView(view)}/>
                {this._renderView()}
            </div>
        )

    }

    _renderView () {
        const view = this.state.view;
        if (view === 'graph') return <GraphView/>;
        if (view === 'table') return <TableView/>;
        if (view === 'tree') return <TreeView/>;
        if (view === 'source') return <SourceView/>;
        return <NonIdealState
            icon='heart-broken'
            title='Uh oh.'
            description='Something has gone horribly wrong.'/>;
    }

    _setView (view: string) {
        this.setState({ view: view });
    }
}

export default Sterling;
