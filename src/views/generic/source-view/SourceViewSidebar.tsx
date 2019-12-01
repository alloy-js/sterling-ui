import { ITreeNode, Position, Tooltip, Tree } from '@blueprintjs/core';
import React from 'react';
import { ViewSide } from '../../../SterlingTypes';
import SterlingSidebar from '../../SterlingSidebar';
import Source from './Source';
import { ISourceViewState } from './SourceView';

interface ISourceViewSidebarProps extends ISourceViewState {
    sources: Source[],
    onChooseSource: (node: ITreeNode<Source>) => void,
    onToggleCollapseSidebar: () => void
}

class SourceViewSidebar extends React.Component<ISourceViewSidebarProps> {

    render (): React.ReactNode {

        const props = this.props;

        return (
            <SterlingSidebar
                collapsed={props.collapseSidebar}
                onToggleCollapse={props.onToggleCollapseSidebar}
                sidebarSide={props.sidebarSide}
                title={'Source Files'}>
                <Tree
                    contents={this._sourceNodes()}
                    onNodeClick={props.onChooseSource}/>
            </SterlingSidebar>
        );

    }

    private _sourceNodes (): ITreeNode<Source>[] {

        const props = this.props;
        const tooltipPos = props.sidebarSide === ViewSide.Left
            ? Position.RIGHT
            : Position.LEFT;

        return props.sources.map((source: Source, i: number) => {

            let tooltip = source.tooltip();
            tooltip = tooltip.length ? tooltip : source.filepath();
            tooltip = tooltip.length ? tooltip : source.filename();

            const label = <Tooltip
                content={tooltip}
                position={tooltipPos}>
                {source.filename()}
            </Tooltip>;

            const node: ITreeNode<Source> = {
                id: i,
                label: label,
                icon: 'document',
                isSelected: props.selected === source,
                nodeData: source
            };

            return node;

        });

    }

}

export default SourceViewSidebar;
