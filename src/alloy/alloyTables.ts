import { AlloyInstance, AlloySkolem } from 'alloy-ts';
import Table from '../views/generic/table-view/Table';

const colors = [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf" ];


function alloyTables (instance: AlloyInstance | null): Table[] {

    if (instance === null) return [];

    // A map and accessor function for keeping track of the
    // color associated with each skolem
    const skolemColors = new Map();
    const color = (skolem: AlloySkolem) => {
        const name = skolem.name();
        const count = skolemColors.size;
        if (!skolemColors.has(name))
            skolemColors.set(name, colors[count % colors.length]);
        return skolemColors.get(name);
    };

    // Convert each signature into a table
    const sigs = instance.signatures().map(sig => {

        // Create the table
        const atoms = sig.atoms();
        const table = new Table()
            .id(sig.name())
            .data(atoms.map(atom => [atom.name()]));

        // Highlight skolems
        atoms.forEach(atom => {
            atom.skolems().forEach(skolem => {
                table.highlightRow(atoms.indexOf(atom), color(skolem), skolem.name());
            });
        });

        return table;

    });

    // Convert each field into a table
    const flds = instance.fields().map(fld => {

        // Create the table
        const types = fld.types();
        const tuples = fld.tuples();
        const table = new Table()
            .id(fld.name())
            .headers(types.map(sig => sig.name()))
            .data(tuples.map(tuple => {
                return tuple.atoms().map(atom => {
                    return atom.name()
                });
            }));

        // Highlight skolems
        tuples.forEach(tuple => {
            tuple.skolems().forEach(skolem => {
                table.highlightRow(tuples.indexOf(tuple), color(skolem), skolem.name());
            });
        });

        return table;
    });

    return [...sigs, ...flds];

}

export default alloyTables;
