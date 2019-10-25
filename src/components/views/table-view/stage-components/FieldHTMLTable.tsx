import { HTMLTable } from '@blueprintjs/core';
import { AlloyAtom, AlloyField, AlloySignature, AlloyTuple } from 'alloy-ts';
import React from 'react';
import { SigFieldSkolem } from '../TableUtil';


interface IFieldHTMLTableProps {
    field: AlloyField,
    nameFunction: (item: SigFieldSkolem) => string
}

export default function FieldHTMLTable (props: IFieldHTMLTableProps) {

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
                        {props.nameFunction(sig)}
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
                                <td key={tuple.id() + '[' + i + ']'}>
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
