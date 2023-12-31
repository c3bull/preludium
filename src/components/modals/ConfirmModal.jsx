import emailjs from '@emailjs/browser';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

import ConfirmModalInputs from "./ConfirmModalInputs";
import ConfirmModalLabels from "./ConfirmModalLabels";
import Modal from "./Modal";
import {imageUrl} from "../utils/Image";
import React from 'react';
import {format} from 'date-fns';
import {gql, useMutation} from "@apollo/client";
import {decodeToken, isExpired} from "react-jwt";

export function ConfirmModal(props) {
    const {
        onClickClose,
        products,
        sum,
        showThanks,
        productsToSave,
        orderedProducts,
        totalPrice
    } = props;

    const MAKE_ORDER = gql`
    mutation makeOrder($orderedProducts: [OrderedProductsInputType!], $placementDate: String!, $dateInMs: String!, $totalPrice: String!, $email: String!, $name: String!, $phone: String!, $zip: String!, $address: String!, $status: String!, $customerId: String!, $notes: String!) {
        makeOrder(orderedProducts: $orderedProducts, placementDate: $placementDate, dateInMs: $dateInMs, totalPrice: $totalPrice, email: $email, name: $name, phone: $phone, zip: $zip, address: $address, status: $status, customerId: $customerId, notes: $notes) {
            orderedProducts {
                amount
                hint
                name
                productId
            }
        placementDate
        dateInMs
        totalPrice
        email
        name
        phone
        zip
        address
        customerId
        notes
        }
    }`

    const [makeOrder] = useMutation(MAKE_ORDER)

    const isExp = isExpired(localStorage.getItem('token'))
    const userEmail = !isExp && decodeToken(localStorage.getItem('token')).email;
    const customerId = !isExp && decodeToken(localStorage.getItem('token')).userId;
    const customerName = !isExp && decodeToken(localStorage.getItem('token')).name;
    const customerSurname = !isExp && decodeToken(localStorage.getItem('token')).surname;

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
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID_ORDER,
            {
                subject: 'Zamówienie',
                name: values.name,
                email: userEmail,
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
            process.env.REACT_APP_PUBLIC_KEY
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
                    name: `${customerName} ${customerSurname}` ,
                    phone: '',
                    zipcode: '',
                    address: '',
                }}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    console.log('date ', parseInt(Date.now().toString()))
                    console.log('vals ',values)
                    sendEmail(values);
                    makeOrder({
                        variables: {
                            "orderedProducts": orderedProducts,
                            "placementDate": format(new Date(), 'dd/MM/yyyy, H:mm:ss'),
                            "dateInMs": Date.now().toString(),
                            "totalPrice": totalPrice,
                            "email": userEmail,
                            "name": values.name,
                            "phone": values.phone,
                            "zip": values.zipcode,
                            "address": values.address,
                            "status": "in-progress",
                            "customerId": customerId,
                            "notes": "",
                        }
                    })
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
                                    <ConfirmModalInputs errors={errors} showErrors={true}/>
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
                                    <div className="inline-block mt-0.5">
                                        <img
                                            src={imageUrl('icons/AiOutlineCheckCircleWhite.webp')}
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
                                        className='inline-block mt-0.5'>
                                        <img
                                            src={imageUrl('icons/AiOutlineCloseCircle.webp')}
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
