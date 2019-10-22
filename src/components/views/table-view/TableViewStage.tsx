import { Card, Tag } from '@blueprintjs/core';
import { AlloyField, AlloyInstance, AlloySignature } from 'alloy-ts';
import React, { ReactNode } from 'react';
import FieldBreadcrumbs from './FieldBreadcrumbs';
import FieldHTMLTable from './FieldHTMLTable';
import SignatureHTMLTable from './SignatureHTMLTable';
import { alphaSort, ASigField, numSort } from './TableUtil';
import { ITableViewState } from './TableView';

export interface ITableViewStageProps extends ITableViewState {
    instance: AlloyInstance | null,
    lastAlphaSort: 'asc' | 'desc',
    lastNumSort: 'asc' | 'desc',
    lastSort: 'alpha' | 'num'
}

class TableViewStage extends React.Component<ITableViewStageProps> {

    render (): React.ReactNode {

        if (!this.props.instance) return null;

        const groups = this._getGroups();

        const elementgroups: Array<Array<ReactNode>> = groups.map(group => {

            return group.map(sigorfield => {

                if (sigorfield.expressionType() === 'signature') {
                    return (
                        <Card
                            key={sigorfield.id()}
                            elevation={2}>
                            <Tag>{this.props.nameFunction(sigorfield)}</Tag>
                            {SignatureHTMLTable(sigorfield as AlloySignature)}
                        </Card>
                    );

                } else {

                    const props = {
                        field: (sigorfield as AlloyField),
                        nameFunction: this.props.nameFunction
                    };

                    return (
                        <Card
                            key={sigorfield.id()}
                            elevation={2}>
                            {FieldBreadcrumbs(props)}
                            {FieldHTMLTable(props)}
                        </Card>
                    );

                }

            });

        });


        return <div className={`stage table-stage ${this.props.align}`} id='stage'>
            {
                elementgroups.map((group, i) => (
                    <div className='group' key={i}>{group}</div>
                ))
            }
        </div>

    }

    private _getGroups (): Array<Array<ASigField>> {

        if (this.props.tables === 'one') {
            return [[this.props.table!]];
        }

        const showSigs = this.props.tables === 'all' || this.props.tables === 'signatures';
        const showFlds = this.props.tables === 'all' || this.props.tables === 'fields';

        const sigs: Array<AlloySignature> = showSigs
            ? this.props.instance!.signatures()
                .filter(sig => sig.name() !== 'univ')
                .filter(sig => this.props.showBuiltin || !sig.isBuiltin())
                .filter(sig => this.props.showEmpty || !!sig.atoms().length)
            : [];

        const fields: Array<AlloyField> = showFlds
            ? this.props.instance!.fields()
                .filter(fld => this.props.showEmpty || fld.size() !== 0)
            : [];

        const groups: Array<Array<AlloyField|AlloySignature>> = this.props.showGroups
            ? [sigs, fields]
            : [([] as Array<AlloySignature|AlloyField>).concat(sigs).concat(fields)];

        const alphaAsc = this.props.lastAlphaSort === 'asc';
        const numAsc = this.props.lastNumSort === 'asc';
        const primarySort = this.props.lastSort === 'alpha'
            ? alphaSort(this.props.nameFunction, alphaAsc)
            : numSort(numAsc);
        const secondarySort = this.props.lastSort === 'alpha'
            ? numSort(numAsc)
            : alphaSort(this.props.nameFunction, alphaAsc);

        groups.forEach(group => {
            group
                .sort(secondarySort)
                .sort(primarySort);
        });

        return groups;

    }

}

export default TableViewStage;
