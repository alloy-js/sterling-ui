import React, { ReactNode } from 'react';
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
    instance: AlloyInstance | null,
    last_alpha_sort: 'asc' | 'desc',
    last_num_sort: 'asc' | 'desc',
    last_sort: 'alpha' | 'num'
}

class TableViewStage extends React.Component<ITableViewStageProps> {

    render (): React.ReactNode {

        if (!this.props.instance) return null;

        const sigs: Array<AlloySignature> = this.props.instance.signatures()
            .filter(sig => sig.name() !== 'univ')
            .filter(sig => this.props.show_builtin || !sig.isBuiltin())
            .filter(sig => this.props.show_empty || !!sig.atoms().length);

        const fields: Array<AlloyField> = this.props.instance.fields()
            .filter(fld => this.props.show_empty || fld.size() !== 0);

        const groups: Array<Array<AlloyField|AlloySignature>> = this.props.show_groups
            ? [sigs, [], fields]
            : [([] as Array<AlloySignature|AlloyField>).concat(sigs).concat(fields)];

        let alpha = this.props.last_alpha_sort === 'asc' ? 1 : -1;
        let num = this.props.last_num_sort === 'asc' ? 1 : -1;

        groups.forEach(group => {
            group.sort((a: AlloyField | AlloySignature, b: AlloyField | AlloySignature): number => {

                const r = this.props.remove_this;

                if (this.props.last_sort === 'alpha') {
                    if (getName(a, r) < getName(b, r)) return -alpha;
                    if (getName(b, r) < getName(a, r)) return alpha;
                    let alength = a.expressionType() === 'field'
                        ? (a as AlloyField).tuples().length
                        : (a as AlloySignature).atoms().length;
                    let blength = b.expressionType() === 'field'
                        ? (b as AlloyField).tuples().length
                        : (b as AlloySignature).atoms().length;
                    return (alength - blength) * num;
                } else {
                    let alength = a.expressionType() === 'field'
                        ? (a as AlloyField).tuples().length
                        : (a as AlloySignature).atoms().length;
                    let blength = b.expressionType() === 'field'
                        ? (b as AlloyField).tuples().length
                        : (b as AlloySignature).atoms().length;
                    if (alength !== blength) return (alength - blength) * num;
                    if (getName(a, r) < getName(b, r)) return -alpha;
                    if (getName(b, r) < getName(a, r)) return alpha;
                    return 0;
                }

            })

        });

        let elementgroups: Array<Array<ReactNode>> = groups.map(group => {

            return group.map(sigorfield => {

                if (sigorfield.expressionType() === 'signature') {
                    return (
                        <Card
                            key={sigorfield.id()}
                            elevation={2}>
                            <Tag>{getName(sigorfield, this.props.remove_this)}</Tag>
                            {SignatureHTMLTable(sigorfield as AlloySignature)}
                        </Card>
                    );

                } else {

                    const props = {
                        field: (sigorfield as AlloyField),
                        remove_this: this.props.remove_this
                    };

                    return (
                        <Card
                            key={sigorfield.id()}
                            elevation={2}>
                            {FieldBreadcrumbs(props)}
                            {FieldHTMLTable(props)}
                        </Card>
                    );

                }

            });

        });


        return <div className='stage table-stage' id='stage'>
            {
                elementgroups.map((group, i) => (
                    group.length
                        ? <div className='group' key={i}>{group}</div>
                        : <Divider key={'divider' + i}/>
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


interface IFieldHTMLTableProps {
    field: AlloyField
    remove_this: boolean
}

function FieldHTMLTable (props: IFieldHTMLTableProps) {

    const types: AlloySignature[] = props.field.types();
    const tuples: AlloyTuple[] = props.field.tuples();

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
                            {getName(sig, props.remove_this)}
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

interface IFieldBreadcrumbsProps {
    field: AlloyField,
    remove_this: boolean
}

function FieldBreadcrumbs (props: IFieldBreadcrumbsProps) {

    const name = props.remove_this ? removeThis(props.field.id()) : props.field.id();
    const tokens = name.split('<:');
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

function getName (item: AlloySignature|AlloyField, remove_this: boolean): string {
    return remove_this
        ? removeThis(item.name())
        : item.name()
}

function removeThis (name: string): string {
    return name.replace(/^this\//, '');
}

export default TableViewStage;
