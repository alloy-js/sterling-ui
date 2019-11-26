import { IconName } from '@blueprintjs/icons';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import { AlloyConnection } from './src2/alloy/AlloyConnection';
import { alloyMetadata } from './src2/alloy/alloyMetadata';
import * as serviceWorker from './serviceWorker';
// import Sterling from './src2/Sterling';
import SterlingNew, { IViewProperties } from './src2/SterlingNew';
import SterlingTable from './src2/views/generic/table-view/SterlingTable';
import TableView from './src2/views/generic/table-view/TableView';

const alloy = new AlloyConnection();
// const sterling = (
//     <Sterling
//         connection={alloy}
//         metadata={alloyMetadata}
//         welcome={'Use Alloy to generate an instance'}/>
// );

function transform () {
    const table0 = new SterlingTable(
        ['Col 1', 'Col 2', 'Col 3'],
        [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ]
    );

    table0.title('Test Table');
    table0.highlightRow(1, 'steelblue', 'Test');

    const table1 = new SterlingTable(
        ['Col 1', 'Col 2', 'Col 3'],
        [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ]
    );

    table1.title(<div>Table 2</div>);
    table1.highlightRow(2, 'red', 'Test');

    return [table0, table1];
}

const tableView: IViewProperties = {
    name: 'Table',
    icon: 'th',
    view: TableView,
    transform: transform
};

const sterlingNew = (
    <SterlingNew
        connection={alloy}
        metadata={alloyMetadata}
        views={[tableView]}/>
);

ReactDOM.render(sterlingNew, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './scss/index.scss';
// import * as serviceWorker from './serviceWorker';
// import Sterling from './Sterling';
//
// ReactDOM.render(<Sterling />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

/*

const tableView = <TableView transform=alloyTables/>
const views = [
    {
        name: 'Table',
        view: tableView,
        icon: 'th'
    }
]

const sterling = (
    <Sterling
        connection={alloy}
        metdata={alloyMetadata}
        views={views}
        welcome={'Use Alloy to generate and instance}/>
);
 */
