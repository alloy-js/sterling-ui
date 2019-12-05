import { Edge } from '../types/Edge';
import { EdgeGroup } from '../types/EdgeGroup';
import { Node } from '../types/Node';

class EdgeIndexer {

    indexes: Map<string, Edge[]>;
    signs: Map<string, number>;
    keyfn: (a: Node, b: Node) => string;

    constructor (edges: Edge[]) {

        this.indexes = new Map();
        this.signs = new Map();
        this.keyfn = (a: Node, b: Node) => a.id + '->' + b.id;

        edges.forEach(edge => {

            const id = this.keyfn(edge.source, edge.target);

            if (!this.indexes.has(id)) {
                const flip = this.keyfn(edge.target, edge.source);
                const arr: Edge[] = [];
                this.indexes.set(id, arr);
                this.indexes.set(flip, arr);
                this.signs.set(id, 1);
                this.signs.set(flip, -1);
            }

            this.indexes.get(id)!.push(edge);

        });

    }

    index (edge: Edge): [number, number, number] {

        const key = this.keyfn(edge.source, edge.target);

        if (this.indexes.has(key)) {
            const list = this.indexes.get(key)!;
            return [list.indexOf(edge), list.length, this.signs.get(key)!];
        }

        return [0, 1, 1];

    }

    static fromGroups (groups: EdgeGroup[]) {
        const allEdges = groups
            .map(g => g.edges)
            .reduce((acc, cur) => acc.concat(cur), []);
        return new EdgeIndexer(allEdges);
    }

}

export {
    EdgeIndexer
}
