import { AlloyInstance } from 'alloy-ts';
import React from 'react';
import SplitPane from 'react-split-pane';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/ocean.css';
import * as d3 from 'd3';

hljs.registerLanguage('javascript', javascript);

const placeholder = 'Custom visualizations are created by running the code in this editor.\n\nWrite some code and press Ctrl+Enter to execute.';

export interface ICustomViewStageProps {
    instance: AlloyInstance | null;
}

class CustomViewStage extends React.Component<ICustomViewStageProps> {

    public state = {
        code: ''
    };

    private _node: SVGSVGElement | null = null;

    componentDidUpdate (prevProps: ICustomViewStageProps, prevState: {}): void {

        const newInstance = this.props.instance;

        if (newInstance !== prevProps.instance) {

            this._on_run();

        }

    }

    render (): React.ReactNode {

        return (
            <SplitPane
                defaultSize='400px'
                split='vertical'
                style={{ position: 'relative' }}>
                <Editor
                    className='script-editor'
                    value={this.state.code}
                    onValueChange={code => this.setState({code})}
                    highlight={code => hljs.highlight('javascript', code).value}
                    padding={10}
                    placeholder={placeholder}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.ctrlKey && e.key === 'Enter') {
                            e.preventDefault();
                            this._on_run();
                        }
                    }}
                    style={{
                        height: '100%',
                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                        fontSize: '12px',
                        overflowY: 'auto'
                    }}/>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                    alignContent: 'stretch'}}>
                    <svg
                        style={{flex: '1 1 auto'}}
                        ref={node => this._node = node}/>
                </div>
            </SplitPane>
        );

    }

    private _make_function () {

        // eslint-disable-next-line no-new-func
        return new Function('instance', 'svg', 'd3', this.state.code);

        // const stage = d3.select(svg);
        // const width = parseInt(stage.style('width'));
        // const height = parseInt(stage.style('height'));
        //
        // const sigs = instance.signatures();
        // const atoms = sigs
        //     .map(sig => sig.atoms())
        //     .reduce((acc, cur) => acc.concat(cur), []);
        //
        // atoms.forEach(atom => {
        //     atom.x = width/2;
        //     atom.y = width/2;
        // });
        //
        // const simulation = d3.forceSimulation(atoms)
        //     .force('center', d3.forceCenter(width/2, height/2))
        //     .force('collide', d3.forceCollide(25));
        //
        // const groups = stage.selectAll('g')
        //     .data(atoms)
        //     .join('g');
        //
        // const circles = groups
        //     .selectAll('circle')
        //     .data(d => [d])
        //     .join('circle')
        //     .attr('fill', 'none')
        //     .attr('stroke', 'black')
        //     .attr('r', 25);
        //
        // const labels = groups
        //     .selectAll('text')
        //     .data(d => [d])
        //     .join('text')
        //     .text(a => a.name());
        //
        // simulation.on('tick', () => {
        //     groups.attr('transform', d => {
        //         return `translate(${d.x},${d.y})`;
        //     });
        // });

    }

    private _on_run () {

        if (this.props.instance) {

            const f = this._make_function();
            try {
                f(this.props.instance, this._node, d3);
            } catch (e) {
                console.log(e.message);
            }

        }

    }

}

export default CustomViewStage;
