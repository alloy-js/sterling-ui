import * as d3 from 'd3';
import { Edge } from '../Graph';

export {
    curve_bundle_left,
    curve_bundle_right
}

function curve_bundle_right (beta: number) {

    const bundle = d3.line().curve(d3.curveBundle.beta(beta));

    return function (d: Edge) {

        const s: [number, number] = [d.source.x, d.source.y],
            e: [number, number] = [d.target.x, d.target.y];

        const xl = e[0] - s[0],
            yl = e[1] - s[1];

        const v = [xl, yl],
            p = [-v[1], v[0]],
            l = Math.sqrt(p[0] * p[0] + p[1] * p[1]),
            n = [p[0] / l, p[1] / l];

        const xc = s[0] + xl / 2,
            yc = s[1] + yl / 2;

        return bundle([
            s,
            [xc + l * n[0] / 2, yc + l * n[1] / 2],
            e
        ]);

    }

}

function curve_bundle_left (beta: number) {

    const bundle = d3.line().curve(d3.curveBundle.beta(beta));

    return function (d: Edge) {

        const s: [number, number] = [d.source.x, d.source.y],
            e: [number, number] = [d.target.x, d.target.y];

        const xl = e[0] - s[0],
            yl = e[1] - s[1];

        const v = [xl, yl],
            p = [v[1], -v[0]],
            l = Math.sqrt(p[0] * p[0] + p[1] * p[1]),
            n = [p[0] / l, p[1] / l];

        const xc = s[0] + xl / 2,
            yc = s[1] + yl / 2;

        return bundle([
            s,
            [xc + l * n[0] / 2, yc + l * n[1] / 2],
            e
        ]);

    }

}
