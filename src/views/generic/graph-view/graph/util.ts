import * as d3 from 'd3';

function applyStyles (selection: d3.Selection<any, any, any, any>, styles: {[key: string]: any}) {
    for (let key in styles) {
        if (styles.hasOwnProperty(key)) {
            selection.style(key, styles[key]);
        }
    }
}

function mergeStyles (oldStyles: {[key: string]: any}, newStyles: {[key: string]: any} | undefined) {
    for (let key in newStyles) {
        if (newStyles.hasOwnProperty(key)) {
            oldStyles[key] = newStyles[key];
        }
    }
}

export {
    applyStyles,
    mergeStyles
}
