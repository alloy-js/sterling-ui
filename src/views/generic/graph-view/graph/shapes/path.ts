import * as d3 from 'd3';
import { EdgeBundler } from '../edge/EdgeBundler';
import { Edge } from '../types/Edge';
import { applyStyles, mergeStyles } from '../util';
import { EdgeShapeFn } from './ShapeFn';

function path (): EdgeShapeFn {

    let _bundler: EdgeBundler | null = null;
    let _line: d3.Line<[number, number]> = d3.line();
    let _styles: {[key: string]: any} = {
        'stroke': '#222',
        'stroke-width': 1
    };

    function _path (selection: d3.Selection<SVGGElement, Edge, any, any>):
        d3.Selection<SVGPathElement, Edge, SVGGElement, Edge> {

        return selection
            .selectAll<SVGPathElement, Edge>('path.edge')
            .data(d => [d])
            .join('path')
            .attr('class', 'edge')
            .attr('fill', 'none')
            .call(applyStyles, _styles)
            .attr('d', edge => {

                if (_bundler) {
                    return _line(_bundler.points(edge))
                } else {
                    return _line([
                        [edge.source.x, edge.source.y],
                        [edge.target.x, edge.target.y]
                    ]);
                }

            }).each(function (this: SVGPathElement, edge: Edge) {

                edge.path = this;

            });

    }

    _path.bundler = function (bundler?: EdgeBundler): EdgeShapeFn | EdgeBundler | null {
        if (!arguments.length) return _bundler;
        _bundler = bundler!;
        return _path as EdgeShapeFn;
    };

    _path.curve = function (curve?: d3.CurveFactory): EdgeShapeFn | d3.CurveFactoryLineOnly {
        if (!arguments.length) return _line.curve();
        _line.curve(curve!);
        return _path as EdgeShapeFn;
    };

    _path.styles = function (styles?: {[key: string]: any}): {[key: string]: any} | EdgeShapeFn {
        if (!arguments.length) return _styles;
        mergeStyles(_styles, styles);
        return _path as EdgeShapeFn;
    };

    return _path as EdgeShapeFn;

}

export {
    path
}
