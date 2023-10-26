import {imageUrl} from "../components/utils/Image";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import RegisterLabels from "../components/login/RegisterLabels";
import RegisterInputs from "../components/login/RegisterInputs";
import {gql, useMutation} from "@apollo/client";
import {RegistrationModal} from "../components/modals/RegistrationModal";
import ErrorsHandler from "../components/common/ErrorsHandler";

export default function Register() {
    const REGISTER_USER = gql`
    mutation registerUser($email: String!, $name: String!, $surname: String!, $password: String!, $role: String!, $registerDateInMs: String!) {
        registerUser(email: $email, name: $name, surname: $surname, password: $password, role: $role, registerDateInMs: $registerDateInMs) {
        email
        name
        surname
        password
        role
        registerDateInMs
        }
    }`

    const [registerUser, {error}] = useMutation(REGISTER_USER)
    const [showRegistrationModal, setShowRegistrationModal] = useState(-1);
    const [errorMessage, setErrorMessage] = useState('')
    const [emailError, setEmailError] = useState(false)

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/zaloguj");
    };
    const formSchema = Yup.object().shape({
        email: Yup.string().required('Pole obowiązkowe').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        name: Yup.string().required('Pole obowiązkowe').min(3),
        surname: Yup.string().required('Pole obowiązkowe').min(2),
        password: Yup.string().required('Password is required').min(6),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same')
    });
    return (
        <section
            className="flex h-auto min-h-[70vh] items-center justify-center pt-20 pb-12 md:px-10 lg:pt-24 lg:pb-16">
            <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <img
                    className='block px-2 h-32 lg:h-40 w-auto p-2'
                    src={imageUrl('preludium.webp')}
                    alt='Logo'
                />
                <div
                    className="bg-white w-full sm:w-[30rem] md:w-[35rem] rounded-lg shadow-2xl shadow-gray-500 md:mt-0  xl:p-0">
                    <p className='w-full font-semibold uppercase pt-2 text-xl text-center'>Rejestracja</p>
                    <div className="space-y-4 md:space-y-6 sm:p-8">
                        <Formik
                            initialValues={{
                                email: '',
                                name: '',
                                surname: '',
                                password: '',
                                repeatPassword: '',
                            }}
                            validationSchema={formSchema}
                            onSubmit={(values) => {
                                console.log('vals ', values)
                                registerUser({
                                    variables: {
                                        "email": values.email,
                                        "name": values.name,
                                        "surname": values.surname,
                                        "password": values.password,
                                        "role": "client",
                                        "registerDateInMs": Date.now().toString(),
                                    }
                                }).then(()=>{
                                    setShowRegistrationModal(1)
                                    setTimeout(() => goToLogin(), 3000);

                                }).catch(e => {
                                    if (e.message.includes("400")) {
                                        setEmailError(true)
                                        setErrorMessage("Podany email jest już zajęty")
                                    }
                                })
                            }}
                        >
                            {({errors}) => (
                                <Form>
                                    <div className="flex h-auto flex-col sm:pt-0">
                                        <div className="flex justify-center">
                                            <div className="flex w-full flex-row items-center justify-center pt-2 pb-3">
                                                <RegisterLabels/>
                                                <RegisterInputs errors={errors} showErrors={true} emailError={emailError}/>
                                            </div>
                                        </div>
                                        <ErrorsHandler message={errorMessage}/>

                                        <div
                                            className="mt-3 px-5 sm:px-0 w-full justify-center items-center flex flex-col gap-2">
                                            <button
                                                type="submit"
                                                className="px-2 flex w-full items-center justify-center rounded bg-primary p-2 font-semibold uppercase text-white sm:w-full sm:px-10 sm:py-4"
                                            >
                                                <div className="inline-block mt-0.5">
                                                    <img
                                                        src={imageUrl('icons/AiOutlineCheckCircleWhite.webp')}
                                                        width='15px'
                                                        height='15px'
                                                        className='pb-0.5'
                                                        alt='potwierdź zamówienie'
                                                    />
                                                </div>
                                                <p className="px-2">Zarejestruj</p>
                                            </button>
                                            <div
                                                className="flex flex-col text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                                Masz już konto?
                                                <p onClick={goToLogin}
                                                   className="font-bold cursor-pointer text-primary hover:underline dark:text-primary-500">
                                                    Zaloguj</p>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {showRegistrationModal === 1 && <RegistrationModal/>}
        </section>
    )
}