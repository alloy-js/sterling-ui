import { AlloyAtom, AlloyInstance, AlloySignature } from 'alloy-ts';
import * as d3 from 'd3';
import React from 'react';

interface IMeshViewStageProps {
    instance: AlloyInstance,
    visible: boolean
}

interface IMeshViewState {
    isMeshInstance: boolean
}

interface RenderableNode {
    node: AlloyAtom,
    x: number,
    y: number,
    fixed: boolean
}

interface RenderableElement {
    id: string,
    nodes: RenderableNode[],
    edges: [RenderableNode, RenderableNode][]
}

interface RenderableMesh {
    id: string,
    nodes: RenderableNode[],
    edges: [RenderableNode, RenderableNode][],
    elements: RenderableElement[]
}

class MeshViewStage extends React.Component<IMeshViewStageProps, IMeshViewState> {

    private _ref: SVGSVGElement | null;
    private _svg: d3.Selection<SVGSVGElement, any, null, undefined> | null;
    private _rendered: AlloyInstance | null;

    constructor (props: IMeshViewStageProps) {

        super(props);
        this._ref = null;
        this._svg = null;
        this._rendered = null;

        this.state = {
            isMeshInstance: false
        }

    }

    componentDidMount (): void {

        this._svg = d3.select(this._ref!);
        this._render();

    }

    componentDidUpdate (prevProps: Readonly<IMeshViewStageProps>): void {

        if (this.props.visible) this._render();

    }

    render (): React.ReactNode {

        const props = this.props;
        const visible = props.visible;
        const stageStyle = {display: visible ? 'block' : 'none'};

        return <svg
            className={'graph stage'}
            id={'stage'}
            style={stageStyle}
            ref={ref => this._ref = ref}/>;

    }

    _render () {

        if (this.props.instance === this._rendered) return;

        // Retrieve mesh data in a form that we can render
        const meshes = this._extractRenderableMeshes();

        // Make sure this was actually a mesh instance
        if (!meshes) return;

        // Set up the SVG
        const svg = this._svg!;
        const width = parseFloat(svg.style('width'));
        const height = parseFloat(svg.style('height'));
        const hw = width / 2;
        const hh = height / 2;
        svg
            .attr('viewBox', `${-hw} ${-hh} ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid slice');

        // Layout each mesh
        const rectangles = build_rectangles(meshes.length, width, height);
        meshes.forEach((mesh, i: number) => {

            let rect = rectangles[i],
                w = rect.r - rect.l,
                h = rect.b - rect.t,
                cx = (rect.r + rect.l) / 2,
                cy = (rect.t + rect.b) / 2,
                r = (Math.min(w, h) / 2) - 30;

            embed_planar_mesh(mesh, cx, cy, r);

        });

        // Render mesh groups
        const groups = svg.selectAll<SVGGElement, RenderableMesh>('.mesh')
            .data(meshes, mesh => mesh.id)
            .join('g')
            .attr('class', 'mesh')
            .attr('id', mesh => mesh.id);

        // Render links
        const line = d3.line<RenderableNode>()
            .x(d => d.x)
            .y(d => d.y);

        groups.selectAll('.link')
            .data(mesh => mesh.edges)
            .join('path')
            .attr('class', 'link')
            .style('stroke', 'black')
            .style('stroke-width', 1.5)
            .style('fill', 'none')
            .attr('d', line);

        // Render nodes
        groups.selectAll('.node')
            .data(mesh => mesh.nodes)
            .join('circle')
            .attr('class', 'node')
            .attr('id', node => node.node.id())
            .attr('cx', node => node.x)
            .attr('cy', node => node.y)
            .attr('r', 13);

        // Render node labels
        groups.selectAll('.nodelabel')
            .data(mesh => mesh.nodes)
            .join('text')
            .attr('class', 'nodelabel')
            .attr('x', node => node.x)
            .attr('y', node => node.y)
            .attr('dy', '0.31em')
            .style('font-family', 'monospace')
            .style('text-anchor', 'middle')
            .style('text-shadow', '-1px -1px 0 #333, 1px -1px 0 #333, -1px 1px 0 #333, 1px 1px 0 #333')
            .style('fill', 'white')
            .text(node => node.node.name().replace('ertex$', ''));

        // Render element labels
        const centroid_x = (element: RenderableElement) => element.nodes.reduce((s, n) => s + n.x, 0) / element.nodes.length;
        const centroid_y = (element: RenderableElement) => element.nodes.reduce((s, n) => s + n.y, 0) / element.nodes.length;
        groups.selectAll('.elementlabel')
            .data(mesh => mesh.elements)
            .join('text')
            .attr('class', 'elementlabel')
            .attr('x', centroid_x)
            .attr('y', centroid_y)
            .attr('dy', '0.31em')
            .style('font-family', 'monospace')
            .style('text-anchor', 'middle')
            .text(element => element.id);

        this._rendered = this.props.instance;


    }

    _extractRenderableMeshes (): RenderableMesh[] | null {

        const instance = this.props.instance;

        const mesh = find_signature(instance, ['mesh/Mesh', 'this/Mesh']);
        const elem = find_signature(instance, ['.*/Element', 'mesh/Triangle', 'this/Triangle']);
        const node = find_signature(instance, ['.*/Node', 'mesh/Vertex', 'this/Vertex']);

        if (!mesh || !elem || !node) return null;

        const elements = mesh.fields().find(field => field.name() === 'triangles');
        const edges = elem.fields().find(field => field.name() === 'edges');
        const adj = mesh.fields().find(field => field.name() === 'adj');

        if (!elements || !edges || !adj) return null;

        return mesh.atoms().map(mesh => {

            const meshNodeMap = new Map<string, RenderableNode>();
            const meshElements: RenderableElement[] = [];
            const meshEdges: [RenderableNode, RenderableNode][] = [];

            // Loop through elements in this mesh
            elements
                .tuples()
                .filter(tuple => tuple.atoms()[0] === mesh)
                .forEach(tuple => {

                    const element = tuple.atoms()[1];
                    const elementNodeMap = new Map<string, RenderableNode>();
                    const elementEdges: [RenderableNode, RenderableNode][] = [];

                    // Loop through edges of this element
                    edges
                        .tuples()
                        .filter(edgeTup => edgeTup.atoms()[0] === element)
                        .forEach(edgeTup => {

                            // Add nodes of this edge to the set of nodes
                            // that are in the mesh
                            const n1 = edgeTup.atoms()[1];
                            const n2 = edgeTup.atoms()[2];
                            const rn1: RenderableNode = meshNodeMap.has(n1.id())
                                ? meshNodeMap.get(n1.id())!
                                : {
                                    node: n1,
                                    x: 0,
                                    y: 0,
                                    fixed: false
                                };
                            const rn2: RenderableNode = meshNodeMap.has(n2.id())
                                ? meshNodeMap.get(n2.id())!
                                : {
                                    node: n2,
                                    x: 0,
                                    y: 0,
                                    fixed: false
                                };
                            if (!elementNodeMap.has(n1.id()))
                                elementNodeMap.set(n1.id(), rn1);
                            if (!elementNodeMap.has(n2.id()))
                                elementNodeMap.set(n2.id(), rn2);
                            if (!meshNodeMap.has(n1.id()))
                                meshNodeMap.set(n1.id(), rn1);
                            if (!meshNodeMap.has(n2.id()))
                                meshNodeMap.set(n2.id(), rn2);

                            elementEdges.push([rn1, rn2]);
                            meshEdges.push([rn1, rn2]);

                        });

                    meshElements.push({
                        id: element.name(),
                        nodes: Array.from(elementNodeMap.values()),
                        edges: elementEdges
                    });

                });

            return {
                id: mesh.id(),
                nodes: Array.from(meshNodeMap.values()),
                edges: meshEdges,
                elements: meshElements
            };

        });

    }

}

function find_signature (instance: AlloyInstance, options: string[]): AlloySignature | null {

    let signatures = instance.signatures();
    for (let o=0; o<options.length; ++o) {
        for (let s=0; s<signatures.length; ++s) {
            let regexp = new RegExp(options[o]);
            let result = regexp.exec(signatures[s].id());
            if (result) return signatures[s];
        }
    }

    return null;

}

function build_rectangles (count: number, width: number, height: number): {l: number, r: number, t: number, b: number}[] {

    let rectangles: {l: number, r: number, t: number, b: number}[] = [{
        l: -width/2,
        r: width/2,
        t: -height/2,
        b: height/2
    }];

    while (rectangles.length < count) {

        let rect = rectangles.shift()!,
            w = rect.r - rect.l,
            h = rect.b - rect.t,
            cx = (rect.r + rect.l) / 2,
            cy = (rect.b + rect.t) / 2;

        if (w > h) {
            rectangles.push({
                l: rect.l,
                r: cx,
                t: rect.t,
                b: rect.b
            });
            rectangles.push({
                l: cx,
                r: rect.r,
                t: rect.t,
                b: rect.b
            });
        } else {
            rectangles.push({
                l: rect.l,
                r: rect.r,
                t: rect.t,
                b: cy
            });
            rectangles.push({
                l: rect.l,
                r: rect.r,
                t: cy,
                b: rect.b
            });
        }

    }

    return rectangles;

}

function embed_planar_mesh (mesh: RenderableMesh, cx?: number, cy?: number, r?: number) {

    cx = cx || 0;
    cy = cy || 0;
    r = r || 80;

    // Initialize positions and build node map
    const node_map: {[key: string]: RenderableNode} = {};
    mesh.nodes.forEach(node => {
        node.x = cx!;
        node.y = cy!;
        node.fixed = false;
        node_map[node.node.id()] = node;
    });

    // Create vertex neighborhoods and list of all edges
    const neighbors: {[key: string]: Set<RenderableNode>} = {};
    const edges: [RenderableNode, RenderableNode][] = [];

    mesh.elements.forEach(element => {
        element.edges.forEach(edge => {
            const n1 = edge[0];
            const n2 = edge[1];
            if (!(n1.node.id() in neighbors)) neighbors[n1.node.id()] = new Set();
            if (!(n2.node.id() in neighbors)) neighbors[n2.node.id()] = new Set();
            neighbors[n1.node.id()].add(n2);
            neighbors[n2.node.id()].add(n1);
            edges.push(edge);
        });
    });

    const neighborhood: {[key: string]: RenderableNode[]} = {};
    Object.keys(neighbors).forEach(key => {
        neighborhood[key] = Array.from(neighbors[key]);
    });

    // Determine half-edges
    const halfset = new Set<string>();
    let edge;

    while ((edge = edges.pop())) {

        let e = edge.map(node => node.node.id()).join('->'),
            r = edge.slice().reverse().map(node => node.node.id()).join('->');

        if (halfset.has(r)) {
            halfset.delete(r);
        } else {
            halfset.add(e);
        }

    }

    const halves = Array.from(halfset).map(e => e.split('->'));

    // Create a map that contains the outer ring of the mesh
    const ring: {[key: string]: string} = {};
    halves.forEach(h => ring[h[0]] = h[1]);

    // Get the set of vertices that are on the outer boundary
    const ring_vert_set: Set<string> = new Set();
    halves.forEach(h => {
        ring_vert_set.add(h[0]);
        ring_vert_set.add(h[1]);
    });
    const ring_vertices: string[] = Array.from(ring_vert_set);

    // Determine the angle that will separate vertices and place ring nodes
    const angle = 360 / ring_vertices.length;
    const start: string = ring_vertices[0];
    let v = start, ng = 0;

    node_map[start].x = cx + r * Math.cos(ng * Math.PI / 180);
    node_map[start].y = cy + r * Math.sin(ng * Math.PI / 180);
    node_map[start].fixed = true;

    while ((v = ring[v]) !== start) {

        ng += angle;
        node_map[v].x = cx + r * Math.cos(ng * Math.PI / 180);
        node_map[v].y = cy + r * Math.sin(ng * Math.PI / 180);
        node_map[v].fixed = true;

    }

    // Iteratively place the rest of the nodes using the averaging method
    let biggest_move = Infinity,
        tolerance = 1;

    while (biggest_move > tolerance) {

        let biggest_it = 0;

        mesh.nodes.forEach(node => {

            if (!node.fixed) {

                const neighbors = neighborhood[node.node.id()];
                const x = neighbors.reduce((acc, neighbor) => acc + neighbor.x, 0) / neighbors.length;
                const y = neighbors.reduce((acc, neighbor) => acc + neighbor.y, 0) / neighbors.length;
                const dist = Math.sqrt((node.x - x)**2 + (node.y - y)**2);
                node.x = x;
                node.y = y;
                node.fixed = true;

                if (dist > biggest_it) biggest_it = dist;

            }

        });

        biggest_move = biggest_it

    }

}

export default MeshViewStage;
