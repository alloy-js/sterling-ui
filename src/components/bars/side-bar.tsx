import React from 'react';

class SideBar extends React.Component {

    render (): React.ReactNode {

        return (<div className='sidebar'>
            {this.props.children}
        </div>);

    }

}

export default SideBar;
