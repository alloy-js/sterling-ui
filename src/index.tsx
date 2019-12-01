import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import * as serviceWorker from './serviceWorker';

import { AlloyConnection } from './alloy/AlloyConnection';
import { alloyMetadata } from './alloy/alloyMetadata';
import alloyTables from './alloy/alloyTables';
import Sterling  from './Sterling';
import { ISterlingUIView } from './SterlingTypes';
import GraphView from './views/generic/graph-view/GraphView';
import TableView from './views/generic/table-view/TableView';

// Create the object that will be used to communicate with an external tool
const alloy = new AlloyConnection();

// Create all views that will be available in the Sterling UI
const tableView: ISterlingUIView = {
    name: 'Table',
    icon: 'th',
    view: TableView,
    transform: alloyTables
};

const graphView: ISterlingUIView = {
    name: 'Graph',
    icon: 'graph',
    view: GraphView
};

// Create Sterling
const sterling = (
    <Sterling
        connection={alloy}
        message={'Use Alloy to generate an instance.'}
        metadata={alloyMetadata}
        views={[
            tableView,
            graphView
        ]}/>
);

// Tell React to render the Sterling UI
ReactDOM.render(sterling, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

