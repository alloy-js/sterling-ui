import { AlloyAtom, AlloySignature, AlloySkolem, AlloyTuple } from 'alloy-ts';
import { HTMLTable } from '@blueprintjs/core';
import React from 'react';
import { SigFieldSkolem } from '../TableUtil';

interface ISkolemHTMLTableProps {
    color: string,
    nameFunction: (item: SigFieldSkolem) => string,
    skolem: AlloySkolem
}

export default function SkolemHTMLTable (props: ISkolemHTMLTableProps) {

    const types: AlloySignature[] = props.skolem.types();
    const tuples: AlloyTuple[] = props.skolem.tuples();

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
            <tbody style={{borderColor: props.color}}>
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