import * as d3 from 'd3';
import React from 'react';
import { position_nodes } from './graph/positioning';
import { render } from './graph/render';
import { Edge } from './graph/types/Edge';
import { EdgeGroup } from './graph/types/EdgeGroup';
import { Graph } from './graph/types/Graph';
import { Node } from './graph/types/Node';
import { NodeGroup } from './graph/types/NodeGroup';

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

    }

    componentDidMount (): void {

        this._svg = d3.select(this._ref!);
        this._top = this._svg.append('g');
        this._egr = this._top.append('g');
        this._ngr = this._top.append('g');

        const forceLink = d3.forceLink<Node, Edge>().distance(0);
        const forceCharge = d3.forceManyBody<Node>().strength(-1);
        const forceCollide = d3.forceCollide<Node>(100);
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
        const edgegroups = graph.edgeGroups;
        const nodegroups = graph.nodeGroups;
        filter_disconnected(nodegroups, edgegroups);
        const nodes = nodegroups.map(group => group.nodes)
            .reduce((acc, cur) => acc.concat(cur), []);

        // Position the nodes
        position_nodes(sim, nodes, this._renderedNodes);

        render(node, edge, nodegroups, edgegroups);

        // Keep track of what is currently rendered
        this._rendered = graph;
        this._renderedNodes = nodes;

    }

}

function filter_disconnected (nodegroups: NodeGroup[], edgegroups: EdgeGroup[]) {
    const ids = new Set();
    edgegroups.forEach(group => {
        group.edges.forEach(edge => {
            ids.add(edge.source.id);
            ids.add(edge.target.id);
        })
    });
    nodegroups.forEach(group => {
        group.nodes = group.nodes.filter(node => ids.has(node.id));
    })
}


export default GraphViewStage;
