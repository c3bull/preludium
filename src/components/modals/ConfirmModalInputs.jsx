import { Field } from 'formik';

import { ConfirmModalSingleInput} from "./ConfirmModalSingleInput";


export default function ConfirmModalInputs({ errors }) {
    return (
        <div className="flex flex-col gap-2">
            <ConfirmModalSingleInput
                name="name"
                errors={errors.name}
                width="w-44"
                placeholder="Imię Nazwisko"
            />
            <div className="flex flex-row items-center">
                <p className="border-b-2 border-primary bg-transparent py-2 pl-2 text-black">
                    +48
                </p>
                <ConfirmModalSingleInput
                    name="phone"
                    errors={errors.phone}
                    width="w-28"
                    placeholder="123 456 789"
                />
            </div>
            <ConfirmModalSingleInput
                name="zipcode"
                errors={errors.zipcode}
                width="w-20"
                placeholder="30-210"
            />
            <div className="flex items-center">
                <Field
                    name="address"
                    type="text"
                    className="border-b-2 border-primary bg-transparent p-2 text-black sm:w-96"
                    placeholder="Miejscowość, ul. Ulicowa 100/15"
                />
                <div>
                    {errors.address ? (
                        <div className="ml-2 h-3 w-3 rounded-full bg-red-600" />
                    ) : (
                        <div className="ml-2 h-3 w-3 rounded-full bg-transparent" />
                    )}
                </div>
            </div>
        </div>
    );
}
