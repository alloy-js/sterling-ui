import { AlloyInstance } from 'alloy-ts';
import React, { Ref } from 'react';
import SplitPane from 'react-split-pane';
// import Editor from 'react-simple-code-editor';
// import hljs from 'highlight.js';
// @ts-ignore
// import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/ocean.css';
import * as d3 from 'd3';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

// hljs.registerLanguage('javascript', javascript);

// const placeholder = 'Custom visualizations are created by running the code in this editor.\n\nWrite some code and press Ctrl+Enter to execute.';

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
                style={{ display: 'flex', position: 'relative' }}>
                <AceEditor
                    mode='javascript'
                    theme='github'
                    fontSize={14}
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    showPrintMargin={false}
                    wrapEnabled={true}
                    width='100%'
                    height='100%'
                    onChange={this._on_change.bind(this)}
                    value={this.state.code}
                    commands={[{
                        name: 'execute',
                        bindKey: {win: 'Ctrl+Enter', mac: 'Command+Enter'},
                        exec: () => this._on_run()
                    }]}/>
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
        // const flds = instance.fields();
        //
        // const rowsfld = flds.find(fld => fld.name() === 'rows');
        // const colsfld = flds.find(fld => fld.name() === 'cols');
        // const valsfld = flds.find(fld => fld.name() === 'vals');
        //
        // const rows = parseInt(rowsfld.tuples()[0].atoms()[1].name());
        // const cols = parseInt(colsfld.tuples()[0].atoms()[1].name());
        // const w = 100;
        // const h = 100;
        //
        // function isZero (val) {
        //     return val.slice(0, 4) === 'Zero';
        // }
        //
        // const vals = valsfld.tuples().map(tup => {
        //     return {
        //         row: parseInt(tup.atoms()[1].name()),
        //         col: parseInt(tup.atoms()[2].name()),
        //         zero: isZero(tup.atoms()[3].name())
        //     }
        // });
        //
        // const cells = stage.selectAll('rect')
        //     .data(vals)
        //     .join('rect')
        //     .attr('fill', d => d.zero ? 'white' : 'steelblue')
        //     .attr('stroke', 'black')
        //     .attr('width', w)
        //     .attr('height', h)
        //     .attr('x', d => width/2 + d.col * w - cols * w/2)
        //     .attr('y', d => height/2 + d.row * h - rows * h/2);
        //
        // console.log(vals);

    }

    private _on_change (code: string) {

        this.setState({ code: code });

    }

    private _on_run () {

        console.log('running');

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
