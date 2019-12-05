import * as d3 from 'd3';
import { Node } from '../types/Node';
import { applyStyles, mergeStyles } from '../util';
import { NodeShapeFn } from './ShapeFn';

function circle (): NodeShapeFn {

    let _selection: d3.Selection<SVGCircleElement, Node, SVGGElement, Node>;

    let _radius: number = 50;
    let _styles: {[key: string]: any} = {
        'stroke': '#222',
        'fill': 'white',
        'stroke-width': 1
    };

    function _circle (selection: d3.Selection<SVGGElement, Node, any, any>):
        d3.Selection<SVGCircleElement, Node, SVGGElement, Node> {

        _selection = selection
            .selectAll<SVGCircleElement, Node>('circle')
            .data(d => [d])
            .join('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', _radius)
            .call(applyStyles, _styles)
            .each(function (this: SVGCircleElement, node: Node) {
                node.element = this;
                node.shape = _circle as NodeShapeFn;
            });

        return _selection;

    }

    _circle.intersect = function (node: Node, path: SVGPathElement): [number, number, number] {

        const c = node.element ? d3.select(node.element) : null;

        if (c) {

            // Get the path attributes
            const length = path.getTotalLength();

            // Get the circle attributes
            const stroke = parseFloat(c.attr('stroke-width')) || 0;
            const r = (parseFloat(c.attr('r')) || 0) + stroke;

            // Calculate intersecting point and a point a little further along
            const ip = path.getPointAtLength(length-r);
            const np = path.getPointAtLength(length-r + 10);
            const angle = Math.atan2(np.y - ip.y, np.x - ip.x) * (180 / Math.PI);
            return [ip.x, ip.y, angle];

        }

        return [node.x, node.y, 0];

    };

    _circle.styles = function (styles?: {[key: string]: any}): {[key: string]: any} | NodeShapeFn {
        if (!arguments.length) return _styles;
        mergeStyles(_styles, styles);
        return _circle;
    };

    return _circle as NodeShapeFn;

}

export { circle }
