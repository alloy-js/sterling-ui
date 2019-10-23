import * as React from 'react';
import { AlloyField, AlloySignature, AlloySkolem } from 'alloy-ts';
import { Tag } from '@blueprintjs/core';
import { SigFieldSkolem } from './TableUtil';


export interface ISignatureTagProps {
    nameFunction?: (item: SigFieldSkolem) => string,
    signature: AlloySignature
}

export interface IFieldTagProps {
    nameFunction?: (item: SigFieldSkolem) => string,
    field: AlloyField
}

export interface ISkolemTagProps {
    nameFunction?: (item: SigFieldSkolem) => string,
    skolem: AlloySkolem
}

function SignatureTag (props: ISignatureTagProps) {

    return (
        <Tag className='sig-tag'>
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
        <Tag className='field-tag'>
            { name.split('<:').join('\u2192') }
        </Tag>
    )

}

function SkolemTag (props: ISkolemTagProps) {

    return (
        <Tag className='skolem-tag'>
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
