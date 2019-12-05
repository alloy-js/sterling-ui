import * as d3 from 'd3';
import { EdgeBundler } from '../edge/EdgeBundler';
import { Edge } from '../types/Edge';
import { Node } from '../types/Node';


// General functions
export interface StylesFn<T> {
    (): {[key: string]: any};
    (styles: {[key: string]: any} | undefined): T
}


// Node Shapes

interface IntersectFn {
    (node: Node, path: SVGPathElement): [number, number, number];
}

export interface NodeShapeFn {
    (selection: d3.Selection<SVGGElement, Node, any, any>):
        d3.Selection<any, Node, SVGGElement, Node>;
    intersect: IntersectFn;
    styles: StylesFn<NodeShapeFn>;
}



// Edge Shapes

interface BundlerFn {
    (): EdgeBundler | null;
    (bundler: EdgeBundler): EdgeShapeFn
}

interface CurveFn {
    (): d3.CurveFactoryLineOnly;
    (curve: d3.CurveFactoryLineOnly): EdgeShapeFn;
}

export interface EdgeShapeFn {
    (selection: d3.Selection<SVGGElement, Edge, any, any>):
        d3.Selection<any, Edge, SVGGElement, Edge>;
    bundler: BundlerFn;
    curve: CurveFn;
    styles: StylesFn<EdgeShapeFn>;
}



// Arrow shapes
export interface ArrowShapeFn {
    (selection: d3.Selection<SVGGElement, Edge, any, any>):
        d3.Selection<any, Edge, SVGGElement, Edge>;
    styles: StylesFn<ArrowShapeFn>;
}
