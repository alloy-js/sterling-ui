import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import { AlloyConnection } from './alloy/AlloyConnection';
import alloyGraph from './alloy/alloyGraph';
import alloyMetadata from './alloy/alloyMetadata';
import alloySources from './alloy/alloySources';
import alloyTables from './alloy/alloyTables';
import * as serviceWorker from './serviceWorker';
import Sterling from './Sterling';
import { ISterlingUIView } from './SterlingTypes';
import GraphView from './views/generic/graph-view/GraphView';
import SourceView from './views/generic/source-view/SourceView';
import TableView from './views/generic/table-view/TableView';
import TreeView from './views/generic/tree-view/TreeView';

// Create the object that will be used to communicate
// with an external data provider
const alloy = new AlloyConnection();

// Create views
const graph: ISterlingUIView = {
    name: 'Graph',
    icon: 'graph',
    transform: alloyGraph,
    view: GraphView
};

const table: ISterlingUIView = {
    name: 'Table',
    icon: 'th',
    transform: alloyTables,
    view: TableView
};

const tree: ISterlingUIView = {
    name: 'Tree',
    icon: 'diagram-tree',
    view: TreeView
};

const source: ISterlingUIView = {
    name: 'Source',
    icon: 'document',
    transform: alloySources,
    view: SourceView
};

// Create the sterling interface
const sterling = (
    <Sterling
        connection={alloy}
        message={'Use Alloy to generate an instance.'}
        metadata={alloyMetadata}
        views={[graph, table, tree, source]}/>
);

// Tell React to render the Sterling UI
ReactDOM.render(sterling, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
