import { AlloyInstance } from 'alloy-ts';
import Table from '../views/generic/table-view/Table';

export default function alloyTables (instance: AlloyInstance | null): Table[] {

    if (instance === null) return [];

    const sigs = instance.signatures().map(sig => {
        const atoms = sig.atoms();
        return new Table()
            .id(sig.name())
            .data(atoms.map(atom => [atom.name()]))
    });

    const flds = instance.fields().map(fld => {
        const types = fld.types();
        const tuples = fld.tuples();
        return new Table()
            .id(fld.name())
            .headers(types.map(sig => sig.name()))
            .data(tuples.map(tuple => {
                return tuple.atoms().map(atom => {
                    return atom.name()
                });
            }));
    });

    return [...sigs, ...flds];

}
