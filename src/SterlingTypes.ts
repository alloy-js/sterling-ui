import { IconName } from '@blueprintjs/core';
import React from 'react';

/**
 * All Sterling views components must use props that extend this interface
 */
export interface ISterlingViewProps {
    data: any,
    visible?: boolean
}

/**
 * This interface packages together all of the info that Sterling needs
 * to use a view component as part of the user interface.
 */
export interface ISterlingUIView {
    name: string,
    icon: IconName,
    view: React.ComponentType<ISterlingViewProps>,
    transform?: (data: any) => any
}

/**
 * This interface allows Sterling to communicate with an external tool that
 * provides data displayed in Sterling, such as Alloy.
 */
export interface SterlingConnection {
    connect(): void,
    onConnected(callback: () => void): SterlingConnection,
    onData(callback: (data: any) => void): SterlingConnection,
    onDisconnected(callback: () => void): SterlingConnection,
    requestCurrent(): void,
    requestNext(): void
}

/**
 * The side on which a view should appear.
 */
export enum ViewSide {
    Left = 'left',
    Right = 'right'
}

/**
 * Simple horizontal alignment
 */
export enum HorizontalAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

/**
 * Simple row or column layout direction
 */
export enum LayoutDirection {
    Row = 'row',
    Column = 'column'
}

/**
 * Simple sort order
 */
export enum SortDirection {
    Ascending = 'ascending',
    Descending = 'descending'
}
