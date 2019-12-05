import { Edge } from './Edge';

export interface EdgeGroup {

    // Identification attributes
    id: string;
    name: string;

    // Data attributes
    edges: Edge[];

    // Rendering attributes
    arrowStyles?: {[key: string]: any};
    edgeStyles?: {[key: string]: any};
    labelStyles?: {[key: string]: any};

}
