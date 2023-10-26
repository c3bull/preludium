import {ConfirmModalSingleInput} from "../modals/ConfirmModalSingleInput";


export default function RegisterInputs({errors, showErrors, emailError}) {
    return (
        <div className="flex flex-col w-full md:pr-2 gap-2">
            <ConfirmModalSingleInput
                name="email"
                errors={errors.email}
                width="w-full"
                placeholder="adres@email.com"
                showErrors={showErrors}
                emailError={emailError}
            />
            <ConfirmModalSingleInput
                name="name"
                errors={errors.name}
                width="w-full"
                placeholder="Jan"
                showErrors={showErrors}
            />
            <ConfirmModalSingleInput
                name="surname"
                errors={errors.surname}
                width="w-full"
                placeholder="Kowalski"
                showErrors={showErrors}
            />
            <ConfirmModalSingleInput
                name="password"
                fieldType="password"
                errors={errors.password}
                width="w-full"
                placeholder="••••••••"
                showErrors={showErrors}
            />
            <ConfirmModalSingleInput
                name="repeatPassword"
                fieldType="password"
                errors={errors.repeatPassword}
                width="w-full"
                placeholder="••••••••"
                showErrors={showErrors}
            />
            {/*<div className="flex items-center">*/}
            {/*    <Field*/}
            {/*        name="password"*/}
            {/*        type="password"*/}
            {/*        className="border-b-2 border-primary bg-transparent p-2 text-black w-full"*/}
            {/*        placeholder="••••••••"*/}
            {/*    />*/}
            {/*    <div>*/}
            {/*        {errors.password ? (*/}
            {/*            <div className="ml-2 h-3 w-3 rounded-full bg-red-600 mr-1"/>*/}
            {/*        ) : (*/}
            {/*            <div className="ml-2 h-3 w-3 rounded-full bg-green-600 mr-1"/>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex items-center">*/}
            {/*    <Field*/}
            {/*        name="repeatPassword"*/}
            {/*        type="password"*/}
            {/*        className="border-b-2 border-primary bg-transparent p-2 text-black w-full"*/}
            {/*        placeholder="••••••••"*/}
            {/*    />*/}
            {/*    <div>*/}
            {/*        {errors.repeatPassword ? (*/}
            {/*            <div className="ml-2 h-3 w-3 rounded-full bg-red-600 mr-1"/>*/}
            {/*        ) : (*/}
            {/*            <div className="ml-2 h-3 w-3 rounded-full bg-green-600 mr-1"/>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
