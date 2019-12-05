import * as d3 from 'd3';
import { Edge } from '../types/Edge';
import { applyStyles, mergeStyles } from '../util';
import { ArrowShapeFn } from './ShapeFn';

function arrow (): ArrowShapeFn {

    let _styles: {[key: string]: any} = {
        'fill': '#222'
    };

    function _edge (selection: d3.Selection<SVGGElement, Edge, any, any>):
        d3.Selection<SVGPathElement, Edge, SVGGElement, Edge> {

        return selection
            .selectAll<SVGPathElement, Edge>('path.arrow')
            .data(d => [d])
            .join('path')
            .attr('class', 'arrow')
            .attr('d', 'M -10 -5 L 0 0 L -10 5 z')
            .call(applyStyles, _styles)
            .style('stroke', 'none')
            .each(function (this: SVGPathElement, edge: Edge) {

                const edgepath = edge.path;

                if (edgepath && edge.target.shape) {

                    const int = edge.target.shape.intersect(edge.target, edgepath);
                    d3.select(this)
                        .attr('transform', `translate(${int[0]} ${int[1]}) rotate(${int[2]})`);

                } else {

                    d3.select(this)
                        .attr('transform', `translate(${edge.target.x} ${edge.target.y})`);

                }

            });

    }

    _edge.styles = function (styles?: {[key: string]: any}): {[key: string]: any} | ArrowShapeFn {
        if (!arguments.length) return _styles;
        mergeStyles(_styles, styles);
        return _edge;
    };

    return _edge as ArrowShapeFn;

}

export {
    arrow
}
