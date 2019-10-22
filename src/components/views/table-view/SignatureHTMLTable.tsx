import { HTMLTable } from '@blueprintjs/core';
import { AlloyAtom, AlloySignature } from 'alloy-ts';
import React from 'react';

export default function SignatureHTMLTable (sig: AlloySignature) {

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