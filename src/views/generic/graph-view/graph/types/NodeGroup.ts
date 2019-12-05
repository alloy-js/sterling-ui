import { Node } from './Node';
import { NodeShapeFn } from '../shapes/ShapeFn';

export interface NodeGroup {

    // Identification attributes
    id: string;
    name: string;

    // Data attributes
    nodes: Node[];

    // Rendering attributes
    shape: 'circle' | 'rectangle' | NodeShapeFn;
    labelStyles?: {[key: string]: any};
    shapeStyles?: {[key: string]: any};

}
