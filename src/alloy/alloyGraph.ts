import { AlloyAtom, AlloyInstance } from 'alloy-ts';
import { EdgeGroup } from '../views/generic/graph-view/graph/types/EdgeGroup';
import { Graph } from '../views/generic/graph-view/graph/types/Graph';
import { Node } from '../views/generic/graph-view/graph/types/Node';
import { NodeGroup } from '../views/generic/graph-view/graph/types/NodeGroup';

function alloyGraph (instance: AlloyInstance): Graph {

    const nodes: Node[] = instance.atoms().map(atom => {

        return {
            id: atom.id(),
            name: atom.name(),
            x: 0,
            y: 0
        };

    });

    const find = (atom: AlloyAtom) => nodes.find(curr => curr.id === atom.id());

    const nodegroups: NodeGroup[] = instance.signatures()
        .filter(sig => sig.id() !== 'seq/Int')
        .map(sig => {
            return {
                id: sig.id(),
                name: sig.name(),
                shape: 'circle',
                nodes: sig.atoms().map(atom => find(atom)!)
            }
        });

    const edgegroups: EdgeGroup[] = instance.fields().map(fld => {
        return {
            id: fld.id(),
            name: fld.name(),
            edges: fld.tuples().map(tuple => {
                const atoms = tuple.atoms().map(atom => find(atom)!);
                const first = atoms[0];
                const last = atoms[atoms.length-1];
                const mid = atoms.slice(1, atoms.length-1);
                return {
                    id: tuple.id(),
                    name: fld.name() + (mid.length ? ` [${mid.map(n => n.name).join(', ')}]` : ''),
                    source: first!,
                    target: last!

                }
            })
        }
    });

    return {
        nodeGroups: nodegroups,
        edgeGroups: edgegroups
    }

}

export default alloyGraph;
