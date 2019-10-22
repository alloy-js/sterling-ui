import { Button } from '@blueprintjs/core';
import * as React from 'react';

export interface ISterlingSidebarSectionProps {
    title?: string
}

export interface ISterlingSidebarSectionState {
    collapsed: boolean
}

class Section extends React.Component<ISterlingSidebarSectionProps, ISterlingSidebarSectionState> {

    public state = {
        collapsed: false
    };

    render (): React.ReactNode {

        const collapseIcon = this.state.collapsed ? 'expand-all' : 'collapse-all';

        return (
            <div className={`section ${this.state.collapsed ? 'collapsed' : ''}`}>
                {
                    !!this.props.title &&
                    <div className='section-header'>
                        <div className='title'>
                            {this.props.title.toUpperCase()}
                        </div>
                        <Button icon={collapseIcon} minimal={true} onClick={this.toggle}/>
                    </div>
                }
                {
                    !this.state.collapsed &&
                    <div className='section-body'>
                        { this.props.children }
                    </div>
                }
            </div>
        )

    }

    toggle = () => {
        const curr = this.state.collapsed;
        this.setState({collapsed: !curr});
    }

}

export interface ISterlingSidebarProps {
    side: 'left' | 'right',
    title: string
}

export interface ISterlingSidebarState {
    collapsed: boolean
}

class SterlingSidebar extends React.Component<ISterlingSidebarProps, ISterlingSidebarState> {

    static Section = Section;

    public state = {
        collapsed: false
    };

    render(): React.ReactNode {

        const openIcon = this.props.side === 'left' ? 'menu-open' : 'menu-closed';
        const closeIcon = this.props.side === 'left' ? 'menu-closed' : 'menu-open';

        if (this.state.collapsed) {
            return (
                <div className={`sterling-sidebar ${this.props.side} collapsed`}>
                    <div className='header'>
                        <Button icon={openIcon} minimal={true} onClick={this.toggle}/>
                    </div>
                </div>
            )
        }

        return (
            <div className={`sterling-sidebar ${this.props.side} bp3-dark`}>
                <div className='header'>
                    <div className='title'>
                        {this.props.title}
                    </div>
                    <Button icon={closeIcon} minimal={true} onClick={this.toggle}/>
                </div>
                {this.props.children}
            </div>
        )
    }

    toggle = () => {
        const curr = this.state.collapsed;
        this.setState({collapsed: !curr});
    }

}

export default SterlingSidebar;