import React from 'react';
import SplitPane from 'react-split-pane';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/ocean.css';

hljs.registerLanguage('javascript', javascript);

const placeholder = 'Custom visualizations are created by running the code in this editor.\n\nWrite some code and press Ctrl+Enter to execute.';

class CustomViewStage extends React.Component {

    public state = {
        code: ''
    };

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
                            console.log('execute');
                            e.preventDefault();
                        }
                    }}
                    style={{
                        height: '100%',
                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                        fontSize: '12px',
                        overflowY: 'auto'
                    }}/>
                <div>B</div>
            </SplitPane>
        );

    }

}

export default CustomViewStage;
