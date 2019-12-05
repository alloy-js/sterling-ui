import * as d3 from 'd3';
import { EdgeShapeFn, StylesFn } from '../shapes/ShapeFn';
import { Edge } from '../types/Edge';
import { applyStyles, mergeStyles } from '../util';

export interface EdgeLabelFn {
    (selection: d3.Selection<SVGGElement, Edge, any, any>):
        d3.Selection<any, Edge, SVGGElement, Edge>;
    styles: StylesFn<EdgeShapeFn>;
}

function edgeLabel (): EdgeLabelFn {

    let _styles: {[key: string]: any} = {
        'stroke': 'none',
        'fill': '#222',
        'font-family': 'monospace'
    };

    function _label (selection: d3.Selection<SVGGElement, Edge, any, any>):
        d3.Selection<any, Edge, SVGGElement, Edge> {

        return selection.selectAll<SVGTextElement, Edge>('text.label')
            .data(d => [d])
            .join('text')
            .attr('class', 'label')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.31em')
            .style('user-select', 'none')
            .text(d => d.name)
            .call(applyStyles, _styles)
            .each(function (this: SVGTextElement, edge: Edge) {

                const path = edge.path!;
                const length = path.getTotalLength();
                const anchor = path.getPointAtLength(length / 2);
                d3.select<SVGTextElement, Edge>(this)
                    .attr('x', anchor.x)
                    .attr('y', anchor.y);

            });

    }

    _label.styles = function (styles?: {[key: string]: any}): {[key: string]: any} | EdgeLabelFn {
        if (!arguments.length) return _styles;
        mergeStyles(_styles, styles);
        return _label as EdgeLabelFn;
    };

    return _label as EdgeLabelFn;

}

export {
    edgeLabel
}
