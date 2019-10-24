import { Card } from '@blueprintjs/core';
import { AlloyField, AlloySignature, AlloySkolem } from 'alloy-ts';
import React, { ReactNode } from 'react';
import FieldHTMLTable from './FieldHTMLTable';
import SignatureHTMLTable from './SignatureHTMLTable';
import { SigFieldSkolem } from './TableUtil';
import { ITableViewState, LayoutDirection, TableAlignment } from './TableView';
import SkolemHTMLTable from './SkolemHTMLTable';
import { FieldTag, SignatureTag, SkolemTag } from './TableTags';

export interface ITableViewStageProps extends ITableViewState {}

class TableViewStage extends React.Component<ITableViewStageProps> {

    render (): React.ReactNode {

        const tableAlign = this.props.tableAlignment;
        const tableLayout = this.props.layoutDirection;

        const alignClass =
            tableAlign === TableAlignment.Left ? 'left' :
            tableAlign === TableAlignment.Center ? 'center' :
            tableAlign === TableAlignment.Right ? 'right' : '';

        const layoutClass =
            tableLayout === LayoutDirection.Row ? 'row' :
            tableLayout === LayoutDirection.Column ? 'column' : '';

        return <div className={`stage table-stage ${alignClass} ${layoutClass}`} id='stage'>
            { this._getElements() }
        </div>

    }

    private _getElements (): ReactNode[] {

        return this.props.itemsVisible.map((item: SigFieldSkolem) => {

            const itemType = item.expressionType();

            if (itemType === 'signature') {

                const props = {
                    signature: item as AlloySignature
                };

                return (
                    <Card
                        key={item.id()}
                        elevation={2}>
                        <SignatureTag
                            fill={true}
                            signature={item as AlloySignature}
                            nameFunction={this.props.nameFunction}/>
                        {SignatureHTMLTable(props)}
                    </Card>
                );

            } else if (itemType === 'field') {

                const props = {
                    field: (item as AlloyField),
                    nameFunction: this.props.nameFunction
                };

                return (
                    <Card
                        key={item.id()}
                        elevation={2}>
                        <FieldTag
                            fill={true}
                            field={item as AlloyField}
                            nameFunction={this.props.nameFunction}/>
                        {FieldHTMLTable(props)}
                    </Card>
                );

            } else if (itemType === 'skolem') {

                const props = {
                    color: 'red',
                    skolem: (item as AlloySkolem),
                    nameFunction: this.props.nameFunction
                };

                return (
                    <Card
                        key={item.id()}
                        elevation={2}>
                        <SkolemTag
                            fill={true}
                            skolem={item as AlloySkolem}
                            nameFunction={this.props.nameFunction}/>
                        {SkolemHTMLTable(props)}
                    </Card>
                )

            }

            return null;

        });

    }

    // private _getItems (): SigFieldSkolem[] {
    //
    //     if (this.props.tables === 'select') {
    //
    //         return [...this.props.selectedTables]
    //             .sort(this._secondarySort())
    //             .sort(this._primarySort());
    //
    //     } else {
    //
    //         const showSigs = this.props.tables === 'all' || this.props.tables === 'signatures';
    //         const showFlds = this.props.tables === 'all' || this.props.tables === 'fields';
    //         const showSkls = this.props.tables === 'all' || this.props.tables === 'skolems';
    //
    //         const sigs: Array<AlloySignature> = showSigs
    //             ? this.props.instance!.signatures()
    //                 .filter(sig => sig.name() !== 'univ')
    //                 .filter(sig => this.props.showBuiltin || !sig.isBuiltin())
    //                 .filter(sig => this.props.showEmpty || !!sig.atoms().length)
    //             : [];
    //
    //         const fields: Array<AlloyField> = showFlds
    //             ? this.props.instance!.fields()
    //                 .filter(fld => this.props.showEmpty || fld.size() !== 0)
    //             : [];
    //
    //         const skolems: Array<AlloySkolem> = showSkls
    //             ? this.props.instance!.skolems()
    //             : [];
    //
    //         return [...sigs, ...fields, ...skolems]
    //             .sort(this._secondarySort())
    //             .sort(this._primarySort());
    //
    //     }
    //
    // }
    //
    // private _primarySort () {
    //     return this.props.lastSort === 'alpha'
    //         ? alphaSort(this.props.nameFunction, this.props.lastAlphaSort === 'asc')
    //         : numSort(this.props.lastNumSort === 'asc');
    // }
    //
    // private _secondarySort () {
    //     return this.props.lastSort === 'alpha'
    //         ? numSort(this.props.lastNumSort === 'asc')
    //         : alphaSort(this.props.nameFunction, this.props.lastAlphaSort === 'asc');
    // }

}

export default TableViewStage;
