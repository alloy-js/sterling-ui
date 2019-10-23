import { Breadcrumb, Breadcrumbs, IBreadcrumbProps } from '@blueprintjs/core';
import { AlloyField } from 'alloy-ts';
import React from 'react';
import { ASigField } from './TableUtil';

interface IFieldBreadcrumbsProps {
    field: AlloyField,
    nameFunction: (item: ASigField) => string
}

export default function FieldBreadcrumbs (props: IFieldBreadcrumbsProps) {

    const name = props.nameFunction(props.field);
    const tokens = name.split('<:');
    const crumbs = [
        { text: tokens[0], current: false },
        { text: tokens[1], current: true }
    ];

    return (
        <Breadcrumbs
            items={crumbs}
            breadcrumbRenderer={FieldBreadcrumb}/>
    )

}

function FieldBreadcrumb (props: IBreadcrumbProps) {
    return (
        <Breadcrumb
            className={'bp3-tag ' + (props.current ? '' : 'bp3-minimal')}
            {...props}/>
    )
}
