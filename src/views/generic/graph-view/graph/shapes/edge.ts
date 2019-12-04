import * as d3 from 'd3';
import { Edge } from '../../Graph';

const __line = d3.line();

export interface E {
    edge: Edge,
    line: (...args: any) => any
}

function edge () {

    let _selection: d3.Selection<any, Edge, SVGGElement, Edge> | null;
    let _curve: ((e: Edge) => string | null) = straight;

    function _line (selection: d3.Selection<SVGGElement, Edge, null, undefined>) {

        _selection = selection
            .selectAll<SVGPathElement, Edge>('path')
            .data(d => [d], d => d.id)
            .join('path')
            .attr('stroke', '#999')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            .attr('d', d => _curve(d));

        return _selection;

    }

    return _line;

}

function straight (e: Edge) {
    return __line([
        [e.source.x, e.source.y],
        [e.target.x, e.target.y]
    ]);
}

export {
    edge,
    straight
}
