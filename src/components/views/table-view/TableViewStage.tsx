import React from 'react';
import {
    AlloyAtom,
    AlloyField,
    AlloyInstance,
    AlloySignature,
    AlloyTuple
} from 'alloy-ts';
import {
    Breadcrumb,
    Breadcrumbs,
    Card,
    Divider,
    HTMLTable,
    IBreadcrumbProps,
    Tag
} from '@blueprintjs/core';
import { ITableViewState } from './TableView';

export interface ITableViewStageProps extends ITableViewState {
    instance: AlloyInstance | null
}

class TableViewStage extends React.Component<ITableViewStageProps> {

    render (): React.ReactNode {

        if (!this.props.instance) return null;

        const sigs = this.props.instance.signatures()
            .filter(sig => sig.name() !== 'univ')
            .filter(sig => this.props.show_builtin || !sig.isBuiltin())
            .filter(sig => this.props.show_empty || !!sig.atoms().length)
            .map((sig: AlloySignature) => {
                return (
                    <Card
                        key={sig.id()}
                        elevation={2}>
                        <Tag>{sig.name()}</Tag>
                        {SignatureHTMLTable(sig)}
                    </Card>
                );
            });

        const fields = this.props.instance.fields()
            .filter(fld => this.props.show_empty || fld.size() !== 0)
            .map((fld: AlloyField) => {
                return (
                    <Card
                        key={fld.id()}
                        elevation={2}>
                        {FieldBreadcrumbs(fld)}
                        {FieldHTMLTable(fld)}
                    </Card>
                );
            });

        const groups = this.props.show_groups
            ? [sigs, [], fields]
            : [sigs.concat(fields)];

        return <div className='stage table-stage' id='stage'>
            {
                groups.map((group, i) => (
                    group.length
                        ? <div className='group' key={i}>{group}</div>
                        : <Divider/>
                ))
            }
        </div>

    }

}

function SignatureHTMLTable (sig: AlloySignature) {

    const atoms: AlloyAtom[] = sig.atoms();

    return (
        <HTMLTable
            bordered={true}
            condensed={true}
            striped={true}>
            <tbody>
            {
                atoms.map((atom: AlloyAtom) => (
                    <tr key={atom.id()}>
                        <td>
                            {atom.name()}
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </HTMLTable>
    )
}

function FieldHTMLTable (fld: AlloyField) {

    const types: AlloySignature[] = fld.types();
    const tuples: AlloyTuple[] = fld.tuples();

    return (
        <HTMLTable
            bordered={true}
            condensed={true}
            striped={true}>
            <thead>
                <tr>
                {
                    types.map((sig: AlloySignature, i: number) => (
                        <th key={sig.id() + i}>
                            {sig.name()}
                        </th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
            {
                tuples.map((tuple: AlloyTuple) => (
                    <tr key={tuple.id()}>
                    {
                        tuple.atoms().map((atom: AlloyAtom, i: number) => (
                            <td
                                key={tuple.id() + '[' + i + ']'}>
                                {atom.name()}
                            </td>
                        ))
                    }
                    </tr>
                ))
            }
            </tbody>
        </HTMLTable>
    )

}

function FieldBreadcrumbs (fld: AlloyField) {

    const tokens = fld.id().split('<:');
    const crumbs = [
        { text: tokens[0], current: false },
        { text: tokens[1], current: true }
    ];

    return (
        <Breadcrumbs
            items={crumbs}
            breadcrumbRenderer={FieldBreadcrumb}/>
    )

}

function FieldBreadcrumb (props: IBreadcrumbProps) {
    return (
        <Breadcrumb {...props}
                    className={'bp3-tag ' + (props.current ? '' : 'bp3-minimal')}/>
    )
}

export default TableViewStage;
