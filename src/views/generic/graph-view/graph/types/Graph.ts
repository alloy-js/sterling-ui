import { EdgeGroup } from './EdgeGroup';
import { NodeGroup } from './NodeGroup';

export interface Graph {

    nodeGroups: NodeGroup[],
    edgeGroups: EdgeGroup[]

}
