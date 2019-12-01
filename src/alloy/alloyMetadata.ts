import { AlloyInstance } from 'alloy-ts';
import { SterlingMetadata } from '../SterlingMetadata';

function alloyMetadata (instance: AlloyInstance | null): SterlingMetadata {

    const meta = new SterlingMetadata();

    if (instance) {
        meta.attr('command', instance.command());
    }

    return meta;

}

export default alloyMetadata;
