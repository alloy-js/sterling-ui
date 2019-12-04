import * as d3 from 'd3';
import { Node, Edge } from '../Graph';
import { curve_bundle_left } from './curve';
import { circle } from './shapes/circle';
import { E } from './shapes/edge';

interface N {
    node: Node,
    shape: (...args: any) => void
}

interface EG {
    source: Node,
    target: Node,
    edges: E[]
}

function render (
    nodes: Node[],
    edges: Edge[],
    node_group: d3.Selection<SVGGElement, any, null, undefined>,
    edge_group: d3.Selection<SVGGElement, any, null, undefined>
) {

    // Assign a shape function to each Node
    const ns: N[] = nodes.map(node => {
        return {
            node: node,
            shape: circle()
        }
    });

    // Find common edges and assign a line function to each Edge
    const egs: EG[] = [];
    edges.forEach(edge => {

        const source = edge.source;
        const target = edge.target;
        const eg = egs.find(e => e.source === source && e.target === target);
        if (eg) {

            eg.edges.push({
                edge: edge,
                line: curve_bundle_left(0.5)
            });

        } else {

            egs.push({
                source: source,
                target: target,
                edges: [{
                    edge: edge,
                    line: curve_bundle_left(0.5)
                }]
            });

        }

    });

    // Join with groups
    const gn = node_group.selectAll<Element, N>('g')
        .data(ns, n => n.node.id)
        .join('g');

    const ge = edge_group.selectAll<Element, EG>('g')
        .data(egs, eg => eg.source.id + eg.target.id)
        .join('g');

    // Render nodes
    gn.attr('transform', d => `translate(${d.node.x} ${d.node.y})`);
    gn.each(function (datum) {
        d3.select(this).call(datum.shape);
    });

    // Render edges
    ge.each(function (eg) {
        d3.select(this)
            .selectAll<Element, E>('path')
            .data(eg.edges, d => d.edge.id)
            .join('path')
            .attr('stroke', '#999')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            .attr('d', d => d.line(d.edge));
    })

}

export {
    render
}
