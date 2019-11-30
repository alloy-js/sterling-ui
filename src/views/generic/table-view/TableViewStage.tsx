import React from 'react';
import { HorizontalAlignment, LayoutDirection } from '../../../SterlingTypes';
import Table from './Table';
import TableCard from './stage-components/TableCard';

interface ITableViewStageProps {
    tables: Table[] | null,
    layoutDirection: LayoutDirection,
    horizontalAlign: HorizontalAlignment
}

class TableViewStage extends React.Component<ITableViewStageProps> {

    render (): React.ReactNode {

        const props = this.props;
        const layout = layoutClass(props.layoutDirection);
        const align = horizontalAlignClass(props.horizontalAlign);

        return (
            <div
                id={'stage'}
                className={`stage table-stage ${layout} ${align}`}>
                {
                    props.tables &&
                    props.tables.map((table, i) => (
                        <TableCard key={i} table={table}/>
                    ))
                }
            </div>
        );

    }

}

function horizontalAlignClass (align: HorizontalAlignment): string {
    return align === HorizontalAlignment.Left ? 'left' :
        align === HorizontalAlignment.Center ? 'center' :
        align === HorizontalAlignment.Right ? 'right' : '';

}

function layoutClass (layout: LayoutDirection): string {
    return layout === LayoutDirection.Row ? 'row' :
        layout === LayoutDirection.Column ? 'column' : '';
}

export default TableViewStage;
