import { Field } from 'formik';

import { ConfirmModalSingleInput} from "./ConfirmModalSingleInput";


export default function ConfirmModalInputs({ errors, showErrors }) {
    return (
        <div className="flex flex-col gap-2">
            <ConfirmModalSingleInput
                name="name"
                errors={errors.name}
                width="w-44"
                placeholder="Imię Nazwisko"
                showErrors={true}
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
                    showErrors={true}
                />
            </div>
            <ConfirmModalSingleInput
                name="zipcode"
                errors={errors.zipcode}
                width="w-20"
                placeholder="30-210"
                showErrors={true}
            />
            <ConfirmModalSingleInput
                name="address"
                errors={errors.address}
                width="border-b-2 border-primary bg-transparent p-2 text-black sm:w-96"
                placeholder="Miejscowość, ul. Ulicowa 1"
                showErrors={true}
            />
        </div>
    );
}
