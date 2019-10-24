import * as React from 'react';
import { AlloyField, AlloySignature, AlloySkolem } from 'alloy-ts';
import { Tag } from '@blueprintjs/core';
import { SigFieldSkolem } from './TableUtil';


export interface ISignatureTagProps {
    fill?: boolean,
    nameFunction?: (item: SigFieldSkolem) => string,
    signature: AlloySignature
}

export interface IFieldTagProps {
    fill?: boolean,
    nameFunction?: (item: SigFieldSkolem) => string,
    field: AlloyField
}

export interface ISkolemTagProps {
    fill?: boolean,
    nameFunction?: (item: SigFieldSkolem) => string,
    skolem: AlloySkolem
}

function SignatureTag (props: ISignatureTagProps) {

    return (
        <Tag className='sig-tag' fill={props.fill}>
            {
                props.nameFunction
                    ? props.nameFunction(props.signature)
                    : props.signature.name()
            }
        </Tag>
    )

}

function FieldTag (props: IFieldTagProps) {

    const name = props.nameFunction
        ? props.nameFunction(props.field)
        : props.field.name();

    return (
        <Tag className='field-tag' fill={props.fill}>
            { name.split('<:').join(' \u2BC7 ') }
        </Tag>
    )

}

function SkolemTag (props: ISkolemTagProps) {

    return (
        <Tag className='skolem-tag' fill={props.fill}>
            {
                props.nameFunction
                    ? props.nameFunction(props.skolem)
                    : props.skolem.name()
            }
        </Tag>

    )

}

export {
    SignatureTag,
    FieldTag,
    SkolemTag
}
