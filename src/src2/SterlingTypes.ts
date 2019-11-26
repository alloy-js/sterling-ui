/**
 * All Sterling views components must use props that extend this interface
 */
export interface SterlingViewProps {
    data: any
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
 * The main view types. Each of these view types has a button in the main
 * toolbar (if the view is used) and a corresponding view component for
 * displaying data in the Sterling interface
 */
export enum ViewType {
    Graph = 'graph',
    Table = 'table',
    Tree = 'tree',
    Source = 'source',
    Script = 'script'
}

/**
 * Simple horizontal alignment
 */
export enum HorizonalAlignment {
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
