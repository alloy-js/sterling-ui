import { Button, Collapse } from '@blueprintjs/core';
import * as React from 'react';
import { ViewSide } from '../SterlingTypes';

export interface ISterlingSidebarSectionProps {
    collapsed: boolean,
    onToggleCollapse: () => void
    title?: string
}

export interface ISterlingSidebarProps {
    collapsed: boolean,
    onToggleCollapse: () => void,
    sidebarSide: ViewSide,
    title: string,
    visible?: boolean
}

class Section extends React.Component<ISterlingSidebarSectionProps> {

    render (): React.ReactNode {

        const collapseIcon = this.props.collapsed
            ? 'expand-all'
            : 'collapse-all';

        const className = this.props.collapsed
            ? 'section collapsed'
            : 'section';

        return (
            <div className={className}>
                {
                    !!this.props.title &&
                    <div className='section-header'>
                        <div className='title'>
                            {this.props.title.toUpperCase()}
                        </div>
                        <Button
                            icon={collapseIcon}
                            minimal={true}
                            onClick={this.props.onToggleCollapse}/>
                    </div>
                }
                <Collapse
                    isOpen={!this.props.collapsed}
                    keepChildrenMounted={true}>
                    <div className='section-body'>
                        {this.props.children}
                    </div>
                </Collapse>
            </div>
        );

    }

}

class SterlingSidebar extends React.Component<ISterlingSidebarProps> {

    static Section = Section;

    render(): React.ReactNode {

        const props = this.props;
        const style = {display: props.visible === false ? 'none' : 'block'};

        const openIcon = props.sidebarSide === ViewSide.Left
            ? 'menu-open'
            : 'menu-closed';

        const closeIcon = props.sidebarSide === ViewSide.Left
            ? 'menu-closed'
            : 'menu-open';

        if (props.collapsed) {
            const cls = `sterling-sidebar ${props.sidebarSide} collapsed`;
            return (
                <div className={cls}>
                    <div className='header'>
                        <Button
                            icon={openIcon}
                            minimal={true}
                            onClick={props.onToggleCollapse}/>
                    </div>
                </div>
            )
        }

        return (
            <div className={`sterling-sidebar ${props.sidebarSide} bp3-dark`} style={style}>
                <div className='header'>
                    <div className='title'>
                        {props.title}
                    </div>
                    <Button
                        icon={closeIcon}
                        minimal={true}
                        onClick={props.onToggleCollapse}/>
                </div>
                {props.children}
            </div>
        )
    }

}

export default SterlingSidebar;
