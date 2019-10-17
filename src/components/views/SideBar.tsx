import { Card, Navbar, Tag } from '@blueprintjs/core';
import React, { CSSProperties } from 'react';

class SideBarNavBar extends React.Component {

    render (): React.ReactNode {

        return (
            <Navbar>
                <div style={{margin: '0 auto', width: '100%'}}>
                    {this.props.children}
                </div>
            </Navbar>
        )

    }

}

interface ISectionProps {
    label: string
}

class Section extends React.Component<ISectionProps> {

    /**
     * Custom styling for the outer Card container. This will only include
     * the tag and the inner Card container
     */
    static containerStyle: CSSProperties = {
        paddingBottom: 0
    };

    /**
     * Custom styling for the inner Card container. This will include all
     * chidren of the Section
     */
    static sectionStyle: CSSProperties = {
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    render(): React.ReactNode {
        return (
            <Card className='sidebar-section'>
                <Tag
                    fill={true}
                    large={true}
                    minimal={true}>
                    {this.props.label}
                </Tag>
                <Card className='sidebar-section-contents'>
                    {this.props.children}
                </Card>
            </Card>
        )
    }
}

class SideBar extends React.Component {

    static Navbar = SideBarNavBar;
    static Section = Section;

    render (): React.ReactNode {

        return (
            <div className='sidebar'>
                {this.props.children}
            </div>
        )

    }

}

export default SideBar;
