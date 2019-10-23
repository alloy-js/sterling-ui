import { AlloySource } from 'alloy-ts';
import { COMMENT } from 'highlight.js';
import React from 'react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { NonIdealState } from '@blueprintjs/core';

const style = githubGist;
const commentStyle = style['hljs-comment'];
const lineNumberColor = commentStyle ? commentStyle['color'] : 'rgba(0, 0, 0, 0.25)';

export interface ISourceViewStageProps {
    source: AlloySource | null
}

class SourceViewStage extends React.Component<ISourceViewStageProps> {

    render (): React.ReactNode {

        if (!this.props.source) return <NonIdealState
            icon='document'
            title='Choose a File'/>;

        const file = this.props.source.filename();
        const source = this.props.source.source();

        return <SyntaxHighlighter
                className='stage'
                language={file === 'XML' ? 'xml' : 'alloy'}
                showLineNumbers={true}
                lineNumberStyle={{
                    color: lineNumberColor
                }}
                lineNumberContainerStyle={{
                    float: 'left',
                    paddingRight: '10px',
                    marginRight: '10px',
                    borderRight: '1px solid rgba(0, 0, 0, 0.05)'
                }}
                style={githubGist}>
                {source}
        </SyntaxHighlighter>;

    }

}


SyntaxHighlighter.registerLanguage('alloy', function () {

    let NUMBER_RE = '\\b\\d+';

    return {
        // case_insensitive
        case_insensitive: false,

        // keywords
        keywords: 'abstract all and as assert but check disj ' +
            'else exactly extends fact for fun iden iff implies ' +
            'in Int let lone module no none not one open or pred ' +
            'run set sig some sum univ',

        // contains
        contains: [

            // hljs.COMMENT
            COMMENT('//', '$', {}),
            COMMENT('--', '$', {}),
            COMMENT('/\\*', '\\*/', {}),

            {
                // className
                className: 'number',
                // begin
                begin: NUMBER_RE,
                // relevance
                relevance: 0
            }
        ]
    };
});

export default SourceViewStage;
