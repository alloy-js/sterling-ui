import React from 'react';
import * as d3 from 'd3';
import { Edge, Graph, Node } from './Graph';
import { position_nodes } from './graph/positioning';

interface IGraphViewStageProps {
    graph: Graph
    visible: boolean
}

class GraphViewStage extends React.Component<IGraphViewStageProps> {

    private _ref: SVGSVGElement | null;
    private _svg: d3.Selection<SVGSVGElement, any, null, undefined> | null;
    private _top: d3.Selection<SVGGElement, any, null, undefined> | null;
    private _ngr: d3.Selection<SVGGElement, any, null, undefined> | null;
    private _egr: d3.Selection<SVGGElement, any, null, undefined> | null;
    private _sim: d3.Simulation<Node, Edge> | null;

    private _rendered: Graph | null;
    private _renderedNodes: Node[];
    private _renderedEdges: Edge[];

    constructor (props: IGraphViewStageProps) {

        super(props);
        this._ref = null;
        this._svg = null;
        this._top = null;
        this._ngr = null;
        this._egr = null;
        this._sim = null;

        this._rendered = null;
        this._renderedNodes = [];
        this._renderedEdges = [];

    }

    componentDidMount (): void {

        this._svg = d3.select(this._ref!);
        this._top = this._svg.append('g');
        this._egr = this._top.append('g');
        this._ngr = this._top.append('g');

        const forceLink = d3.forceLink<Node, Edge>().distance(25);
        const forceCharge = d3.forceManyBody<Node>().strength(-1);
        const forceCollide = d3.forceCollide<Node>(50);
        const forceCenter = d3.forceCenter(0, 0);

        this._sim = d3.forceSimulation<Node>()
            .force('link', forceLink)
            .force('charge', forceCharge)
            .force('collide', forceCollide)
            .force('center', forceCenter)
            .stop();

        this._svg.call(d3.zoom<SVGSVGElement, any>()
            .on('zoom', () => this._top!.attr('transform', d3.event.transform)));

        this._render(this.props.graph);

    }

    componentDidUpdate (prevProps: Readonly<IGraphViewStageProps>): void {

        if (this.props.visible) this._render(this.props.graph);

    }

    render () {

        const props = this.props;
        const visible = props.visible;
        const stageStyle = {display: visible ? 'block' : 'none'};

        return <svg
            className={'graph stage'}
            id={'stage'}
            style={stageStyle}
            ref={ref => this._ref = ref}/>;
    }

    private _render (graph: Graph) {

        if (graph === this._rendered) return;

        const svg = this._svg!;
        const node = this._ngr!;
        const edge = this._egr!;
        const sim = this._sim!;

        // Update the svg viewbox
        const width = parseInt(svg.style('width'));
        const height = parseInt(svg.style('height'));
        svg.attr('viewBox', `-${width/2} -${height/2} ${width} ${height}`);

        // Retrieve the nodes and edges
        const edges = graph.edges();
        const nodes = filter_disconnected(graph.nodes(), edges);

        // Position the nodes
        position_nodes(sim, nodes, this._renderedNodes);

        // Create the transition
        const transition = d3.transition().duration(450);

        // Join with visual elements
        const gn = node.selectAll<Element, Node>('g')
            .data(nodes, d => d.id)
            .join('g');

        const ge = edge.selectAll<Element, Edge>('g')
            .data(edges, d => d.id)
            .join('g');

        render_nodes(gn, transition);
        render_edges(ge);

        // Make nodes draggable
        function dragged (this: any, d: Node) {
            d.x = d3.event.x;
            d.y = d3.event.y;
            d3.select(this)
                .attr('transform', `translate(${d.x} ${d.y})`);
            ge.filter(e => e.source === d).call(render_edges);
            ge.filter(e => e.target === d).call(render_edges);
        }

        const drag = d3.drag<Element, Node>()
            .on('drag', dragged);

        gn.call(drag);

        // Keep track of what is currently rendered
        this._rendered = graph;
        this._renderedNodes = nodes;
        this._renderedEdges = edges;

    }

}

function render_edges (g: d3.Selection<Element, Edge, Element, Edge>): void {

    g
        .attr('stroke', '#999')
        .attr('stroke-width', 1.5);

    g.selectAll<Element, Edge>('line')
        .data(edge => [edge], d => d.id)
        .join('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

}

function render_nodes (g: d3.Selection<Element, Node, Element, Node>, transition?: any): void {

    g.attr('transform', d => `translate(${d.x} ${d.y})`);

    g.selectAll<Element, Node>('circle')
        .data(node => [node])
        .join(
            enter => enter.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 10)
                .attr('stroke', '#222')
                .attr('stroke-width', 1)
                .attr('fill', 'white')
                .call(enter => enter
                    .transition(transition)
                    .attr('r', 50)),
            update => update,
            exit => exit
                .call(exit => exit
                    .transition(transition)
                    .attr('r', 0))
        );

    g.selectAll<Element, Node>('text')
        .data(node => [node])
        .join('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.31em')
        .style('user-select', 'none')
        .text(d => d.name);

}

function filter_disconnected (nodes: Node[], edges: Edge[]): Node[] {

    const ids = new Set();
    edges.forEach(edge => {
        ids.add(edge.source.id);
        ids.add(edge.target.id);
    });

    return nodes.filter(node => ids.has(node.id));

}

export default GraphViewStage;
