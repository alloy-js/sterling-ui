import { ITreeNode, Position, Tooltip, Tree } from '@blueprintjs/core';
import { AlloyInstance, AlloySource } from 'alloy-ts';
import React from 'react';
import SterlingSidebar from '../../SterlingSidebar';
import { ViewSide } from '../../../SterlingSettings';

export interface ISourceViewSideBarProps {
    active: AlloySource | null
    instance: AlloyInstance | null,
    onChooseSource: Function,
    side: ViewSide
}

export interface ISourceViewSidebarState {
    collapseSidebar: boolean
}

class SourceViewSideBar extends React.Component<ISourceViewSideBarProps, ISourceViewSidebarState> {

    public state: ISourceViewSidebarState = {
        collapseSidebar: false
    };

    render (): React.ReactNode {

        return (
            <SterlingSidebar
                collapsed={this.state.collapseSidebar}
                onToggleCollapse={this.onToggleCollapse}
                sidebarSide={this.props.side}
                title='Alloy Source Files'>
                <Tree
                    contents={this.sourceNodes(this.props.instance)}
                    onNodeClick={this.onClickNode}/>
            </SterlingSidebar>
        )

    }

    private onClickNode = (node: ITreeNode<AlloySource>) => {

        const source: AlloySource | undefined = node.nodeData;

        if (source) {
            this.props.onChooseSource(source);
        }

    };

    private onToggleCollapse = () => {
        const curr = this.state.collapseSidebar;
        this.setState({collapseSidebar: !curr});
    };

    private sourceNodes = (instance: AlloyInstance | null): Array<ITreeNode<AlloySource>> => {

        if (instance === null) return [];

        const tooltipPos = this.props.side === ViewSide.Left
            ? Position.RIGHT
            : Position.LEFT;

        const sources: Array<AlloySource> = instance!.sources();
        const sourceNodes: Array<ITreeNode<AlloySource>> = sources.map((source: AlloySource, i: number) => {

            const label = <Tooltip
                content={source.filename()}
                position={tooltipPos}>
                {filename(source.filename())}
            </Tooltip>;

            return {
                id: i,
                label: label,
                icon: 'document',
                isSelected: source === this.props.active,
                nodeData: source
            }

        });

        const xml = this.props.instance!.xml();
        const xmlLabel = <Tooltip
            content='The XML that contains this instance'
            position={tooltipPos}>
            {'XML'}
        </Tooltip>;
        const xmlNode: ITreeNode<AlloySource> = {
            id: 1,
            label: xmlLabel,
            icon: 'document',
            isSelected: xml === this.props.active,
            nodeData: xml
        };

        const nodes: Array<ITreeNode<AlloySource>> = [];
        nodes.push({
            id: 0,
            label: 'Alloy',
            hasCaret: true,
            icon: 'folder-open',
            isExpanded: true,
            childNodes: sourceNodes
        });
        nodes.push(xmlNode);

        return nodes;

    }

}

function filename (filepath: string): string {

    return filepath.split(/(\\|\/)/g).pop() || '';

}

export default SourceViewSideBar;
