import { EdgeLabelFn } from '../labels/edgeLabel';
import { ArrowShapeFn, EdgeShapeFn } from '../shapes/ShapeFn';
import { Node } from './Node';

export interface Edge {

    // Identification attributes
    id: string;
    name: string;

    // Data attributes
    source: Node;
    target: Node;

    // Rendering attributes
    path?: SVGPathElement;
    shape?: EdgeShapeFn;
    arrowShape?: ArrowShapeFn;
    labelShape?: EdgeLabelFn;

}
