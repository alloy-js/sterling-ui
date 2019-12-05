import * as d3 from 'd3';
import { EdgeBundler } from './edge/EdgeBundler';
import { edgeLabel } from './labels/edgeLabel';
import { nodeLabel } from './labels/nodeLabel';
import { arrow } from './shapes/arrow';
import { Edge } from './types/Edge';
import { EdgeGroup } from './types/EdgeGroup';
import { EdgeIndexer } from './edge/EdgeIndexer';
import { Node } from './types/Node';
import { NodeGroup } from './types/NodeGroup';
import { circle } from './shapes/circle';
import { path } from './shapes/path';
import { NodeShapeFn } from './shapes/ShapeFn';

function render (
    gNodes: d3.Selection<SVGGElement, any, null, any>,
    gEdges: d3.Selection<SVGGElement, any, null, any>,
    node_groups: NodeGroup[],
    edge_groups: EdgeGroup[]
) {

    // // Set up the SVG and various SVG groups
    // const s: d3.Selection<SVGSVGElement, any, null, undefined> = d3.select(svg);
    // const g: d3.Selection<SVGGElement, any, null, any> = s.append('g');
    // const width = parseInt(s.style('width'));
    // const height = parseInt(s.style('height'));
    //
    // s.attr('viewBox', `-${width/2} -${height/2} ${width} ${height}`)
    //     .attr("preserveAspectRatio", "xMidYMid slice");
    //
    // s.call(d3.zoom<SVGSVGElement, any>()
    //     .on('zoom', () => g.attr('transform', d3.event.transform)));
    //
    // const gEdges: d3.Selection<SVGGElement, any, null, any> = g.append('g');
    // const gNodes: d3.Selection<SVGGElement, any, null, any> = g.append('g');

    // Transform any shapes from strings to functions
    node_groups.forEach(group => group.shape = buildShape(group.shape));

    // Create the indexer (counts total number of edges
    // between each node and assigns and index to each edge)
    const edgeIndexer = EdgeIndexer.fromGroups(edge_groups);

    // Create the bundler and path shape that will be used to render edges
    const bundler = new EdgeBundler(edgeIndexer);

    // Create the drag event handler
    const drag = d3.drag<SVGGElement, Node>()
        .on('drag', dragged);

    function dragged (this: any, d: Node) {

        // Move the dragged node
        d.x = d3.event.x;
        d.y = d3.event.y;
        d3.select(this)
            .attr('transform', `translate(${d.x} ${d.y})`);

        // Redraw any edges attached to the dragged node
        gEdges
            .selectAll<SVGGElement, EdgeGroup>('g')
            .selectAll<SVGGElement, Edge>('g')
            .filter(edge => edge.source === d || edge.target === d)
            .each(function (this: SVGGElement, edge: Edge) {

                const shape = edge.shape!;
                const arrowShape = edge.arrowShape!;
                const labelShape = edge.labelShape!;
                d3.select<SVGGElement, Edge>(this)
                    .call(shape)
                    .call(arrowShape)
                    .call(labelShape);

            });

    }

    // Render nodes
    gNodes
        .selectAll<SVGGElement, NodeGroup>('g')
        .data(node_groups, d => d.id)
        .join('g')
        .attr('id', group => group.id)
        .each(renderNodeGroup);

    // Render edges
    gEdges
        .selectAll<SVGGElement, EdgeGroup>('g')
        .data(edge_groups, d => d.id)
        .join('g')
        .attr('id', group => group.id)
        .each(renderEdgeGroup);

    function renderEdgeGroup (this: SVGGElement, group: EdgeGroup) {

        const shape = path()
            .bundler(bundler)
            .curve(d3.curveBasis)
            .styles(group.edgeStyles);

        const arrowShape = arrow()
            .styles(group.arrowStyles);

        const labelShape = edgeLabel()
            .styles(group.labelStyles);

        group.edges.forEach(edge => {
            edge.shape = shape;
            edge.arrowShape = arrowShape;
            edge.labelShape = labelShape;
        });

        d3.select(this)
            .selectAll<SVGGElement, Edge>('g')
            .data(group.edges, edge => edge.id)
            .join('g')
            .attr('id', edge => edge.id)
            .call(shape)
            .call(arrowShape)
            .call(labelShape);

    }

    function renderNodeGroup (this: SVGGElement, group: NodeGroup) {

        const shape = (group.shape as NodeShapeFn)
            .styles(group.shapeStyles);

        const label = nodeLabel()
            .styles(group.labelStyles);

        d3.select(this)
            .selectAll<SVGGElement, Node>('g')
            .data(group.nodes, node => node.id)
            .join('g')
            .attr('id', node => node.id)
            .attr('transform', node => `translate(${node.x} ${node.y})`)
            .call(shape)
            .call(label)
            .call(drag);

    }

}

function buildShape (shape: 'circle' | 'rectangle' | NodeShapeFn): NodeShapeFn {

    if (typeof shape === 'function') return shape;

    if (shape === 'circle') {
        return circle();
    }

    return circle();

}

export {
    render
}
