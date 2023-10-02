import emailjs from '@emailjs/browser';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import ConfirmModalInputs from "./ConfirmModalInputs";
import ConfirmModalLabels from "./ConfirmModalLabels";
import Modal from "./Modal";
import {imageUrl} from "../utils/Image";
import React from 'react';
import {format} from 'date-fns';
import {useAuth0} from "@auth0/auth0-react";

export function ConfirmModal(props) {
    const {
        onClickOrder,
        onClickClose,
        products,
        sum,
        showThanks,
        productsToSave,
    } = props;

    const {user} = useAuth0();
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Pole obowiązkowe'),
        phone: Yup.string()
            .min(9)
            .matches(/^(?:\(?\?)?(?:[-\s]*(\d)){9}\)?$/)
            .required('Pole obowiązkowe'),
        zipcode: Yup.string()
            .matches(/^\d{2}(-\d{3})/)
            .max(6)
            .required('Pole obowiązkowe'),
        address: Yup.string().required('Pole obowiązkowe'),
    });

    const sendEmail = (values) => {
        emailjs.send(
            'service_4iq6nqv',
            'template_fpws0iq',
            {
                subject: 'Zamówienie',
                name: values.name,
                email: user.email,
                phone: values.phone,
                zipcode: values.zipcode,
                address: values.address,
                productsToSave: productsToSave.map((item) => {
                    return item.hint
                        ? ` ${item.hint} ${item.name}: ${item.amount}`
                        : ` ${item.name}: ${item.amount}`;
                }),
                date: format(new Date(), 'dd/MM/yyyy, H:mm:ss'),
                sum: `${sum.toFixed(2)} zł`,
            },
            'CNpreU7L2ExeCgd97'
        );
    };

    return (
        <Modal
            classes="pt-16 md:items-center overflow-auto"
            hfit="h-fit"
            closeModal={onClickClose}
        >
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    zipcode: '',
                    address: '',
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    sendEmail(values);
                    onClickOrder();
                    onClickClose();
                    showThanks();
                    setTimeout(() => window.location.href = '/twoje-zamowienia', 3000);
                }}
            >
                {({errors}) => (
                    <Form>
                        <div className="flex h-auto flex-col sm:pt-0">
                            <div className=" flex w-full flex-col gap-4 overflow-auto text-center">
                                <p className="text-sm sm:text-lg">
                                    Składając zamówienie, potrzebujemy informacji, aby się z
                                    Panem/Panią skontaktować odnośnie dostarczenia zamówienia.
                                    <br/>
                                    Prosimy o podanie imienia i nazwiska, telefonu kontaktowego
                                    oraz adresu, na jaki mamy dostarczyć zamówienie.
                                    <br/>
                                    Zapłata za zamówienie zostanie uiszczona podczas odbioru.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex w-fit flex-row items-center py-10">
                                    <ConfirmModalLabels/>
                                    <ConfirmModalInputs errors={errors}/>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div
                                    className="px-3 flex h-full max-h-64 flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-primary sm:w-1/2">
                                    {products}
                                </div>
                                <div className="pt-3">
                                    <p className="font-semibold">Suma: {sum.toFixed(2)} zł</p>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded bg-primary p-2 font-semibold uppercase text-white sm:w-full sm:px-10 sm:py-4"
                                >
                                    <div className="inline-block mt-1">
                                        <img
                                            src={imageUrl('icons/AiOutlineCheckCircleWhite.png')}
                                            width='15px'
                                            height='15px'
                                            alt='potwierdź zamówienie'
                                        />
                                    </div>
                                    <p className="px-2">Potwierdź zamówienie</p>
                                </button>
                                <button
                                    className="flex w-full items-center justify-center rounded bg-primary font-semibold uppercase text-white sm:w-full sm:px-10 sm:py-4"
                                    onClick={onClickClose}
                                >
                                    <div
                                        className='inline-block mt-1'>
                                        <img
                                            src={imageUrl('icons/AiOutlineCloseCircle.png')}
                                            width='15px'
                                            height='15px'
                                            alt='anuluj zamówienie'
                                        />
                                    </div>
                                    <p className="px-2">Anuluj</p>
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}
