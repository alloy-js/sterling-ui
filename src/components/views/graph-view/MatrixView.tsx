import * as React from 'react';
import * as d3 from 'd3';
import { AlloyAtom, AlloyInstance } from 'alloy-ts';

interface IMatrixViewProps {
    instance: AlloyInstance | null
}

type Cell = { row: number, col: number, atom: AlloyAtom };

class MatrixView extends React.Component<IMatrixViewProps> {

    node: SVGSVGElement | null = null;

    constructor (props: IMatrixViewProps) {
        super(props);
        this.createMatrixView = this.createMatrixView.bind(this);
    }

    componentDidMount (): void {
        this.createMatrixView();
    }

    componentDidUpdate (prevProps: IMatrixViewProps, prevState: {}): void {
        this.createMatrixView();
    }

    render (): React.ReactNode {
        return <svg className='stage' ref={node => this.node = node}/>
    }

    createMatrixView () {

        const svg = d3.select(this.node);
        const inst = this.props.instance;

        if (!inst) return;

        const width = parseInt(svg.style('width'));
        const height = parseInt(svg.style('height'));
        svg.attr('viewBox', `-${width/2} -${height/2} ${width} ${height}`);

        const fields = inst.fields();
        const rowFld = fields.find(field => field.id() === 'this/Matrix<:rows');
        const colFld = fields.find(field => field.id() === 'this/Matrix<:cols');
        const rows = parseInt(rowFld!.tuples()[0].atoms()[1].name());
        const cols = parseInt(colFld!.tuples()[0].atoms()[1].name());

        const matrix: Cell[] = [];

        const valFld = fields.find(field => field.id() === 'this/Matrix<:vals');
        valFld!.tuples().forEach(tuple => {
            const atoms = tuple.atoms();
            const row = parseInt(atoms[1].name());
            const col = parseInt(atoms[2].name());
            matrix.push({
                row: row,
                col: col,
                atom: atoms[3]
            });
        });

        const size = 75;
        const matrixWidth = size * rows;
        const matrixHeight = size * cols;

        const x = (d: Cell) => -matrixWidth/2 + d.row * size;
        const y = (d: Cell) => -matrixHeight/2 + d.col * size;
        const color = (d: Cell) => {
            const tokens = d.atom.name().split('$');
            if (tokens[0] === 'Value') return 'steelblue';
            return 'red';
        };
        const name = (d: Cell) => {
            const tokens = d.atom.name().split('$');
            if (tokens[0] === 'Value') return 'V' + tokens[1];
            return tokens[1];
        };

        svg.selectAll('rect.cell')
            .data(matrix)
            .join('rect')
            .attr('class', 'cell')
            .attr('width', size)
            .attr('height', size)
            .attr('x', x)
            .attr('y', y)
            .style('fill', color);

        svg.selectAll('rect.border')
            .data([{rows: rows, cols: cols, size: size, pad: 6}])
            .join('rect')
            .attr('class', 'border')
            .attr('width', d => d.rows * d.size + d.pad)
            .attr('height', d => d.cols * d.size + d.pad)
            .attr('x', d => -(d.rows * d.size + d.pad) / 2)
            .attr('y', d => -(d.cols * d.size + d.pad) / 2);

        svg.selectAll('text')
            .data(matrix)
            .join('text')
            .attr('x', d => x(d) + size/2)
            .attr('y', d => y(d) + size/2)
            .attr('dy', '0.31em')
            .text(name);

    }

}

export default MatrixView;
