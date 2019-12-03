import { IconName } from '@blueprintjs/core';
import React from 'react';
import SterlingConnection from './SterlingConnection';

/**
 * All Sterling view components must use props that extend this interface.
 * Additional props may not be added, but the connection and data props
 * may be overridden to more specific types.
 */
export interface ISterlingViewProps {
    connection: SterlingConnection,
    data: any,
    visible: boolean
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
