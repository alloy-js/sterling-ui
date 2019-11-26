import { AlloyInstance } from 'alloy-ts';
import { SterlingMetadata } from '../SterlingMetadata';

export function alloyMetadata (instance: AlloyInstance | null): SterlingMetadata {

    const meta = new SterlingMetadata();

    if (instance) {
        meta.attr('command', instance.command());
    }

    return meta;

}
