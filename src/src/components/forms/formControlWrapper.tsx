import { Local } from "../../core/localization/local";
import React, {
    forwardRef,
    Ref, RefAttributes,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo, useRef,
    useState,
} from "react";
import { ControlProps } from "../controls";
import { ValidationFunction } from "./validations";
import { FormGroup } from "reactstrap";
import { ValidationContext } from "./validationProvider";
import { Icon, icons } from "../icons/icon";

export interface FormWrapperProps<TValue, TControlProps extends ControlProps<TValue>> {
    label: string;
    name?: string;
    control: React.FC<TControlProps>;
    controlProps: TControlProps;
    validations?: Array<ValidationFunction<TValue>>;
}

const withValidation = (
    Control: React.FC<any & RefAttributes<ValidationHandlers>>,
) => {
    return <TValue, TControlProps extends ControlProps<TValue>>(props: FormWrapperProps<TValue, TControlProps>) => {
        const controlRef = useRef<ValidationHandlers>(null);
        const context = useContext(ValidationContext);
        useEffect(() => {
            const isValid = () => {
                controlRef.current!.setIsUsed(true);
                return controlRef.current!.isValid();
            };
            context.add(isValid);
            return () => context.remove(isValid);
        }, [context]);

        return <Control {...props} ref={controlRef} />;
    };
};

interface ValidationHandlers {
    setIsUsed: (isUsed: boolean) => void;
    isValid: () => boolean;
}

export const FormControlWrapper = withValidation(forwardRef(<TValue, TControlProps extends ControlProps<TValue>>(
    {
        control: Control,
        label,
        name,
        controlProps,
        validations,
    }: FormWrapperProps<TValue, TControlProps>,
    ref: Ref<ValidationHandlers>,
) => {
    useImperativeHandle(ref, () => ({
        setIsUsed: setIsUsed,
        isValid: () => !validate(controlProps.value, validations),
    }), [controlProps.value, validations]);
    const [isUsed, setIsUsed] = useState<boolean>(false);

    const onChange = useCallback((value: TValue) => {
        setIsUsed(true);
        controlProps.onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlProps.onChange]);

    const error = validate(controlProps.value, validations);
    const errorMessage = useMemo(() => isUsed && error && <ErrorMessage error={error} />, [error, isUsed]);
    const labelComponent = useMemo(() => <Local id={label} />, [label]);

    return (
        <FormGroup className={`form-control-wrapper ${getClassNames(isUsed, error)}`}>
            <label htmlFor={name}>{labelComponent}</label>
            <Control id={name} {...controlProps} valid={!isUsed ? undefined : !error} onChange={onChange} />
            {errorMessage}
        </FormGroup>
    );
}));

function getClassNames(isUsed: boolean, error?: string): string {
    const classNames = [];

    if (isUsed && error) {
        classNames.push("invalid");
    }

    return classNames.join(" ");
}

function validate(value?: any, validations?: Array<ValidationFunction<any>>): string | undefined {
    if (!validations) {
        return;
    }
    for (const val of validations) {
        const result = val(value);
        if (result) {
            return result;
        }
    }
}

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return (
        <span className="validation-error">
            <Icon icon={icons.error} />
            <Local id={`validation_${error}`} />
        </span>
    );
};
