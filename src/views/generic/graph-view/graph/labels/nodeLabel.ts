import * as d3 from 'd3';
import { NodeShapeFn, StylesFn } from '../shapes/ShapeFn';
import { Node } from '../types/Node';
import { applyStyles, mergeStyles } from '../util';

interface NodeLabelFn {
    (selection: d3.Selection<SVGGElement, Node, any, any>):
        d3.Selection<any, Node, SVGGElement, Node>;
    styles: StylesFn<NodeShapeFn>;
}


function nodeLabel (): NodeLabelFn {

    let _styles: {[key: string]: any} = {
        'stroke': 'none',
        'fill': '#222',
        'font-family': 'monospace'
    };

    function _label (selection: d3.Selection<SVGGElement, Node, any, any>):
        d3.Selection<any, Node, SVGGElement, Node> {

        return selection.selectAll('text.label')
            .data(d => [d])
            .join('text')
            .attr('class', 'label')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.31em')
            .style('user-select', 'none')
            .call(applyStyles, _styles)
            .text(d => d.name);

    }

    _label.styles = function (styles?: {[key: string]: any}): {[key: string]: any} | NodeLabelFn {
        if (!arguments.length) return _styles;
        mergeStyles(_styles, styles);
        return _label as NodeLabelFn;
    };

    return _label as NodeLabelFn;

}

export {
    nodeLabel
}
