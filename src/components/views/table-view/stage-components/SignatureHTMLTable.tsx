import { HTMLTable } from '@blueprintjs/core';
import { AlloyAtom, AlloySignature } from 'alloy-ts';
import React from 'react';

export interface ISignatureHTMLTableProps {
    signature: AlloySignature
}

export default function SignatureHTMLTable (props: ISignatureHTMLTableProps) {

    const atoms: AlloyAtom[] = props.signature.atoms();

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
