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

    const edges: Edge[] = [];

    instance.fields().forEach(field => {

        const name = field.name();

        field.tuples().forEach(tuple => {

            const atoms = tuple.atoms();
            const first = find(atoms[0]);
            const last = find(atoms[atoms.length-1]);
            const mid = atoms.slice(1, atoms.length-1);

            if (first && last) {

                const edge = new Edge(first, last);
                edge.id = tuple.id();
                edge.name = name + (mid.length ? ` [${mid.join(', ')}]` : '');
                edges.push(edge);

            }

        });

    });

    return new Graph().nodes(nodes).edges(edges);

}

export default alloyGraph;
