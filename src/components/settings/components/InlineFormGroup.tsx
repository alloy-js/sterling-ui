import classNames from 'classnames';
import * as React from 'react';
import {
    AbstractPureComponent2,
    Classes,
    IIntentProps,
    IProps
} from '@blueprintjs/core';

export interface IInlineFormGroupProps extends IIntentProps, IProps {
    /**
     * A space-delimited list of class names to pass along to the
     * `Classes.FORM_CONTENT` element that contains `children`.
     */
    contentClassName?: string;

    /**
     * Whether form group should appear as non-interactive.
     * Remember that `input` elements must be disabled separately.
     */
    disabled?: boolean;

    /**
     * Optional helper text. The given content will be wrapped in
     * `Classes.FORM_HELPER_TEXT` and displayed beneath `children`.
     * Helper text color is determined by the `intent`.
     */
    helperText?: React.ReactNode;

    /** Label of this form group. */
    label?: React.ReactNode;

    /**
     * `id` attribute of the labelable form element that this `FormGroup` controls,
     * used as `<label for>` attribute.
     */
    labelFor?: string;

    /**
     * Optional secondary text that appears after the label.
     */
    labelInfo?: React.ReactNode;

    /** CSS properties to apply to the root element. */
    style?: React.CSSProperties;
}

export class InlineFormGroup extends AbstractPureComponent2<IInlineFormGroupProps, {}> {
    public static displayName = `Sterling.InlineFormGroup`;

    public render() {
        const { children, contentClassName, helperText, label, labelFor, labelInfo, style } = this.props;
        return (
            <div className={this.getClassName()} style={style}>
                {label && (
                    <div className={classNames(Classes.FORM_CONTENT, contentClassName)}>
                        <label className={Classes.LABEL} htmlFor={labelFor}>
                            {label} <span className={Classes.TEXT_MUTED}>{labelInfo}</span>
                        </label>
                        {helperText && <div className={Classes.FORM_HELPER_TEXT}>{helperText}</div>}
                    </div>
                )}
                <div className={classNames(Classes.FORM_CONTENT, contentClassName)}>
                    {children}
                </div>
            </div>
        );
    }

    private getClassName() {
        const { className, disabled, intent } = this.props;
        return classNames(
            Classes.FORM_GROUP,
            Classes.intentClass(intent),
            {
                [Classes.DISABLED]: disabled,
                [Classes.INLINE]: true,
            },
            className,
            'sterling-inline-fg'
        );
    }
}
