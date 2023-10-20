import {imageUrl} from "../components/utils/Image";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {gql, useMutation} from "@apollo/client";
import LoginInputs from "../components/login/LoginInputs";
import LoginLabels from "../components/login/LoginLabels";

export default function Login() {
    const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
        token
        }
    }`

    const [loginUser, {error}] = useMutation(LOGIN_USER)

    const navigate = useNavigate();
    const goToRegister = () => {
        navigate("/rejestracja");
    };

    const goToOrder = () => {
        navigate("/zamow");
    };
    const formSchema = Yup.object().shape({
        email: Yup.string().required('Pole obowiązkowe').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
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
                    <p className='w-full font-semibold uppercase pt-2 text-xl text-center'>Logowanie</p>
                    <div className="space-y-4 md:space-y-6 sm:p-8">
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={formSchema}
                            onSubmit={(values) => {
                                loginUser({
                                    variables: {
                                        "email": values.email,
                                        "password": values.password,
                                    }
                                }).then((response) => {
                                    localStorage.setItem('token', response.data.loginUser.token);
                                }).then(goToOrder)
                            }}
                        >
                            {({errors}) => (
                                <Form>
                                    <div className="flex h-auto flex-col sm:pt-0">
                                        <div className="flex justify-center">
                                            <div className="flex w-full flex-row items-center justify-center pt-2 pb-8">
                                                <LoginLabels/>
                                                <LoginInputs errors={errors} showErrors={true}/>
                                            </div>
                                        </div>
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
                                                <p className="px-2">Zaloguj</p>
                                            </button>
                                            <div
                                                className="flex flex-col text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                                Nie masz jeszcze konta?
                                                <p onClick={goToRegister}
                                                   className="font-bold cursor-pointer text-primary hover:underline dark:text-primary-500">
                                                    Rejestracja</p>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )
}