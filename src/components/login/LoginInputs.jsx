import {ConfirmModalSingleInput} from "../modals/ConfirmModalSingleInput";


export default function LoginInputs({errors, showErrors}) {
    return (
        <div className="flex flex-col w-full md:pr-2 gap-2">
            <ConfirmModalSingleInput
                name="email"
                errors={errors.email}
                width="w-full"
                placeholder="adres@email.com"
                showErrors={false}
            />
            <ConfirmModalSingleInput
                name="password"
                fieldType='password'
                errors={errors.password}
                width="w-full"
                placeholder="••••••••"
                showErrors={false}
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
        </div>
    );
}
