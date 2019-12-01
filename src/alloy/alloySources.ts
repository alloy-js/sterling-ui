import { AlloyInstance } from 'alloy-ts';
import Source from '../views/generic/source-view/Source';

function alloySources (instance: AlloyInstance | null): Source[] {

    if (instance === null) return [];

    const sources = instance.sources().map(source => {

        const filepath = source.filename();
        const filename = getFilename(filepath);

        return new Source()
            .filename(filename)
            .filepath(filepath)
            .language('alloy')
            .source(source.source());
    });

    const xml = instance.xml();
    const filepath = xml.filename();
    const filename = getFilename(filepath);

    sources.push(new Source()
        .filename(filename)
        .filepath(filepath)
        .language('xml')
        .source(xml.source())
        .tooltip('The XML file that contains this instance'));

    return sources;

}

function getFilename (filepath: string): string {

    return filepath.split(/(\\|\/)/g).pop() || '';

}

export default alloySources;
