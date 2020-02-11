import React, {
    createContext,
    forwardRef,
    PropsWithChildren,
    Ref,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";

interface Context {
    add: (validator: () => boolean) => void;
    remove: (validator: () => boolean) => void;
}

type ValidatorType = () => boolean;

export interface ValidationProviderHandlers {
    isValid: () => boolean;
}

const defaultContextValue: Context = {
    add: () => {
    },
    remove: () => {
    },
};

export const ValidationContext = createContext<Context>(defaultContextValue);

export const ValidationProvider = forwardRef<ValidationProviderHandlers, PropsWithChildren<object>>((
    { children }: PropsWithChildren<object>,
    ref: Ref<ValidationProviderHandlers>,
) => {
    const [validators, setValidators] = useState<Array<ValidatorType>>([]);
    const isValid = useCallback((): boolean => {
        let result = true;
        for (const val of validators) {
            result = val() && result;
        }

        return result;
    }, [validators]);

    useImperativeHandle(ref, () => ({
        isValid,
    }), [isValid]);

    const addValidator = useCallback((validator: ValidatorType) => {
        setValidators([...validators, validator]);
    }, [validators]);

    const removeValidator = useCallback((validator: ValidatorType) => {
        setValidators(validators.filter(v => v !== validator));
    }, [validators]);

    const [contextObject] = useState<Context>({
        add: addValidator,
        remove: removeValidator,
    });

    return (
        <ValidationContext.Provider value={contextObject}>
            {children}
        </ValidationContext.Provider>
    );
});
