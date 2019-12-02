import { AlloyAtom, AlloyInstance } from 'alloy-ts';
import { Edge, Graph, Node } from '../views/generic/graph-view/Graph';

function alloyGraph (instance: AlloyInstance): Graph {

    const nodes = instance.atoms().map(atom => {

        const node = new Node();
        node.id = atom.id();
        node.name = atom.name();
        return node;

    });

    const find = (atom: AlloyAtom) => nodes.find(curr => curr.id === atom.id());

    const edges = instance.tuples().map(tuple => {

        const atoms = tuple.atoms();
        const first = find(atoms[0]);
        const last = find(atoms[atoms.length-1]);

        if (first && last) {

            const edge = new Edge(first, last);
            edge.id = tuple.id();
            edge.name = tuple.name();
            return edge;

        }

        return null;

    }).filter(edge => edge !== null);

    return new Graph().nodes(nodes).edges(edges as Edge[]);

}

export default alloyGraph;
