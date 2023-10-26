import {Field} from 'formik';

import {ClassNames} from "../utils/UtilFunctions";


export function ConfirmModalSingleInput({
                                            name,
                                            width,
                                            placeholder,
                                            errors,
                                            showErrors,
                                            fieldType,
                                            emailError,
                                            passwordError
                                        }) {
    return (
        <div className={ClassNames("rounded-md flex items-center",
            `${emailError && 'bg-red-200'}`,
            `${passwordError && 'bg-red-200'}`,
            `${!showErrors && 'mr-4'}`,
            )}>
            <Field
                name={name}
                type={fieldType ? fieldType : "text"}
                className={ClassNames(
                    width,
                    'border-b-2 border-primary bg-transparent p-2 text-black',
                    `${emailError && 'border-red-500'}`,
                    `${passwordError && 'border-red-500'}`
                )}
                placeholder={placeholder}
            />
            {showErrors && <div>
                {errors ? <div className="ml-2 h-3 w-3 rounded-full bg-red-600 mr-1"/> :
                    <div className="ml-2 h-3 w-3 rounded-full bg-green-600 mr-1"/>}
            </div>}
        </div>
    );
}
