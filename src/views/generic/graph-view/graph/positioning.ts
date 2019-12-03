import * as d3 from 'd3';
import { Edge, Node } from '../Graph';


/**
 * Set the fixed location of all nodes in the current list of nodes to the
 * position of nodes in the previous list of nodes by matching node ids. If a
 * node in the current list does not match a node in the previous list, its
 * position will not be set.
 *
 * @param previous The list of nodes from which to copy locations
 * @param current The list nodes that will have their locations affixed
 */
function affix_nodes (previous: Node[], current: Node[]) {

    current.forEach(node => {
        const prev = previous.find(prev => prev.id === node.id);
        if (prev) {
            node.x = node.fx = prev.x;
            node.y = node.fy = prev.y;
        }
    });

}

/**
 * Assign positions to all nodes by running a force simulation. If an array of
 * fixed nodes is provided, all nodes with matching ids will be fixed at
 * corresponding locations.
 *
 * @param sim The simulation to run
 * @param nodes The list of nodes to position
 * @param fixed An optional list of nodes from which to retrieve fixed locations
 */
function position_nodes (sim: d3.Simulation<Node, Edge>, nodes: Node[], fixed?: Node[]) {

    if (fixed && fixed.length) {
        affix_nodes(fixed, nodes);
    }

    const n = Math.ceil(Math.log(sim.alphaMin()) / Math.log(1 - sim.alphaDecay()));
    sim.nodes(nodes);
    sim.tick(n);

    detach_nodes(nodes);

}

/**
 * Remove the fixed location from all nodes
 * @param nodes The nodes that will have fixed locations removed
 */
function detach_nodes (nodes: Node[]) {
    nodes.forEach(node => {
        delete node.fx;
        delete node.fy;
    });
}

export {
    affix_nodes,
    detach_nodes,
    position_nodes
};
