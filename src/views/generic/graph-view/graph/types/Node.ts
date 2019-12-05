import { NodeShapeFn } from '../shapes/ShapeFn';

export interface Node {

    // Identification attributes
    id: string;
    name: string;

    // Positional attributes
    x: number;
    y: number;
    fx?: number;
    fy?: number;

    // Rendering attributes
    element?: SVGElement;
    shape?: NodeShapeFn;

}
