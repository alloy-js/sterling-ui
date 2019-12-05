import { Edge } from '../types/Edge';
import { EdgeIndexer } from './EdgeIndexer';

declare type Pt = [number, number];
const PIO2 = Math.PI / 2;
const PI2 = Math.PI * 2;

class EdgeBundler {

    _indexer: EdgeIndexer;

    constructor (indexer: EdgeIndexer) {
        this._indexer = indexer;
    }

    points (edge: Edge): [number, number][] {

        const [index, total, sign] = this._indexer.index(edge);

        if (total === 1) {
            return [
                [edge.source.x, edge.source.y],
                [edge.target.x, edge.target.y]
            ];
        } else {
            const source: Pt = [edge.source.x, edge.source.y];
            const target: Pt = [edge.target.x, edge.target.y];
            const p = index / (total - 1);
            const c = center(source, target);
            const a = angle(source, target) + sign * PIO2;
            const d = distance(source, target) / 2;
            const d2 = d/2;
            const x = c[0] + d2 * Math.cos(a);
            const y = c[1] + d2 * Math.sin(a);
            return [
                source,
                [x + p * d * Math.cos(a - Math.PI), y + p * d * Math.sin(a - Math.PI)],
                target
            ];
        }
    }

}

function center (a: Pt, b: Pt): Pt {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function angle (a: Pt, b: Pt): number {
    const ng = Math.atan2(b[1]-a[1], b[0]-a[0]);
    return ng < 0 ? ng + PI2 : ng;
}

function distance (a: Pt, b: Pt): number {
    return Math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2);
}

export {
    EdgeBundler
}