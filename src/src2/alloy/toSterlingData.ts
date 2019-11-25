import { AlloyInstance } from 'alloy-ts';
import { SterlingData } from '../SterlingData';

export function toSterlingData (instance: AlloyInstance): SterlingData {

    return new SterlingData(instance)
        .attr('command', instance.command());

}
