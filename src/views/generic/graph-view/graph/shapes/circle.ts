import * as d3 from 'd3';
import { Node } from '../../Graph';
import { find_angle } from '../util';

function circle (): (...args: any) => void {

    let _selection: d3.Selection<any, Node, SVGGElement, Node> | null;

    function _circle (selection: d3.Selection<SVGGElement, Node, null, undefined>) {

        _selection = selection
            .selectAll<SVGCircleElement, Node>('circle')
            .data(d => [d])
            .join('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 50)
            .style('stroke', '#222')
            .style('stroke-width', 1)
            .style('fill', 'white');

        return _selection;

    }

    _circle.intersection = function (path: SVGPathElement): {x: number, y: number, angle: number} {

        if (_selection) {

            const target = _selection.select('circle');
            const length = path.getTotalLength();
            const stroke = parseFloat(target.style('stroke-width')) || 0;
            const radius = (parseFloat(target.attr('r')) || 0) + (stroke / 2);

            if (length) {
                const endpoint = path.getPointAtLength(length);
                const intersect = path.getPointAtLength(length - radius);
                const angle = find_angle(endpoint, intersect);
                return {
                    x: intersect.x,
                    y: intersect.y,
                    angle: angle
                }
            }
        }

        return { x: 0, y: 0, angle: 0 };

    };

    return _circle;

}

export {
    circle
}
