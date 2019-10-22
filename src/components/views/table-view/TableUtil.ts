import { AlloyField, AlloySignature } from 'alloy-ts';

export type ASigField = AlloySignature | AlloyField;
export type ASortFunction = (a: ASigField, b: ASigField) => number;

function alphaSort (getName: (item: ASigField) => string, asc: boolean = true): ASortFunction {
    const one = asc ? 1 : -1;
    return (a: ASigField, b: ASigField) => {
        const aname = getName(a);
        const bname = getName(b);
        if (aname < bname) return -one;
        if (bname < aname) return one;
        return 0;
    }
}

function builtinSort (a: AlloySignature, b: AlloySignature): number {
    let aBuiltin = a.isBuiltin(),
        bBuiltin = b.isBuiltin();
    return aBuiltin === bBuiltin
        ? 0
        : aBuiltin
            ? 1
            : -1;
}

function numSort (asc: boolean = true): ASortFunction {
    const one = asc ? 1 : -1;
    return (a: ASigField, b: ASigField) => {
        const alen = getLength(a);
        const blen = getLength(b);
        return (alen - blen)*one;
    }
}

function getLength (item: ASigField) {
    if (item.expressionType() === 'field')
        return (item as AlloyField).tuples().length;
    if (item.expressionType() === 'signature')
        return (item as AlloySignature).atoms().length;
    throw Error('Item is not a signature or field');
}

function nameFunction (remove_this: boolean): (item: ASigField) => string {
    return (item: ASigField) => {
        return remove_this
            ? removeThis(item.id())
            : item.id();
    }
}

function removeThis (name: string): string {
    return name.replace(/^this\//, '');
}

export { alphaSort, builtinSort, nameFunction, numSort };
