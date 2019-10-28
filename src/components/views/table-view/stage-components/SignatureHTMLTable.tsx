import { HTMLTable } from '@blueprintjs/core';
import { AlloyAtom, AlloySignature } from 'alloy-ts';
import React from 'react';
import { SkolemHighlight } from '../../../../util/SterlingTypes';
import PopoverRow from './PopoverRow';

function filterHighlights (signature: AlloySignature, highlights: SkolemHighlight[]): SkolemHighlight[] {

    return highlights.filter((highlight: SkolemHighlight): boolean => {
        const types = highlight.skolem.types();
        return types.length === 1 && types[0] === signature;
    });

}

function getWitnessAtoms (highlights: SkolemHighlight[], atoms: AlloyAtom[]): Map<AlloyAtom, SkolemHighlight[]> {
    const witnesses = new Map();
    highlights.forEach(highlight => {
        const atomset = highlight.skolem.tuples().map(tuple => tuple.atoms()[0]);
        atoms.forEach(atom => {
            if (atomset.includes(atom)) {
                if (!witnesses.has(atom)) {
                    witnesses.set(atom, []);
                }
                witnesses.set(atom, [...witnesses.get(atom), highlight])
            }
        })
    });
    return witnesses;
}

export interface ISignatureHTMLTableProps {
    signature: AlloySignature,
    skolemHighlights: SkolemHighlight[]
}

export default function SignatureHTMLTable (props: ISignatureHTMLTableProps) {

    const signature = props.signature;
    const atoms: AlloyAtom[] = signature.atoms();
    const highlights = filterHighlights(signature, props.skolemHighlights);
    const witnesses = getWitnessAtoms(highlights, atoms);

    return (
        <HTMLTable
            bordered={true}
            condensed={true}
            striped={true}>
            <tbody>
            {
                atoms.map((atom: AlloyAtom) => {
                    if (witnesses.has(atom)) {
                        const witness = witnesses.get(atom)![0];
                        return (
                            <PopoverRow key={atom.id()} content={witness.skolem.name()} color={witness.color}>
                                <td
                                    style={{
                                        borderRight: '1px solid transparent',
                                        borderBottom: '1px solid transparent'
                                    }}>
                                    {atom.name()}
                                </td>
                            </PopoverRow>
                        )
                    } else {
                        return (
                            <tr key={atom.id()}>
                                <td>
                                    {atom.name()}
                                </td>
                            </tr>
                        )
                    }
                })
            }
            </tbody>
        </HTMLTable>
    )
}
