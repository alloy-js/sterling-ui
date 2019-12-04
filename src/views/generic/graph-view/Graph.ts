class Node {

    public x: number = 0;
    public y: number = 0;
    public name: string = '';
    public id: string = '';

    public fx?: number;
    public fy?: number;
    public shape?: 'circle' | 'rectangle'

}

class Edge {

    public source: Node;
    public target: Node;
    public name: string = '';
    public id: string = '';
    public color?: string;

    constructor (source: Node, target: Node) {

        this.source = source;
        this.target = target;

    }

}

class Graph {

    static Node = Node;
    static Edge = Edge;

    private _nodes: Node[] = [];
    private _edges: Edge[] = [];

    edges (): Edge[];
    edges (edges: Edge[]): Graph;
    edges (edges?: Edge[]): Edge[] | Graph {
        if (!arguments.length) return this._edges;
        this._edges = edges!;
        return this;
    }
    
    nodes (): Node[];
    nodes (nodes: Node[]): Graph;
    nodes (nodes?: Node[]): Node[] | Graph {
        if (!arguments.length) return this._nodes;
        this._nodes = nodes!;
        return this;
    }
    
}

export {
    Graph,
    Edge,
    Node
};
