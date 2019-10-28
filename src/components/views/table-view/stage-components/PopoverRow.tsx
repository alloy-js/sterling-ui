import { Portal } from '@blueprintjs/core';
import React from 'react';
import { Manager, Popper, Reference } from 'react-popper';

interface IPopoverRowProps {
    content: string | React.ReactElement,
    color: string
}

interface IPopoverRowState {
    enabled: boolean
}

export default class PopoverRow extends React.Component<IPopoverRowProps, IPopoverRowState> {

    public state = {
        enabled: false
    };

    render (): React.ReactNode {

        const color = this.props.color;
        const thickness = this.state.enabled ? '3px' : '1px';

        return (
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <tr onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                            ref={ref}
                            style={{outline: `${thickness} solid ${color}`}}>
                            {this.props.children}
                        </tr>
                    )}
                </Reference>
                <Portal>
                    <Popper
                        modifiers={{}}
                        placement='right'>
                        {({ ref, style, placement, arrowProps }) => (
                            this.state.enabled &&
                            <div
                                ref={ref}
                                style={{
                                    ...style,
                                    backgroundColor: color,
                                    borderRadius: 3
                                }}
                                data-placement={placement}>
                                <div className='table-rowpop'>
                                    {this.props.content}
                                </div>
                            </div>
                        )}
                    </Popper>
                </Portal>
            </Manager>
        );

    }

    private onMouseEnter = () => {
        this.setState({enabled: true});
    };

    private onMouseLeave = () => {
        this.setState({enabled: false});
    };

}
