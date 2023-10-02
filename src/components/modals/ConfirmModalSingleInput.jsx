import {Field} from 'formik';

import {ClassNames} from "../utils/UtilFunctions";


export function ConfirmModalSingleInput({
                                            name,
                                            width,
                                            placeholder,
                                            errors,
                                        }) {
    return (
        <div className="flex items-center">
            <Field
                name={name}
                className={ClassNames(
                    width,
                    'border-b-2 border-primary bg-transparent p-2 text-black'
                )}
                placeholder={placeholder}
            />
            <div>
                {errors && <div className="ml-2 h-3 w-3 rounded-full bg-red-600"/>}
            </div>
        </div>
    );
}
