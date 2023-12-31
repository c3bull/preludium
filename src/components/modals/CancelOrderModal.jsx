import emailjs from '@emailjs/browser';
import {Form, Formik} from 'formik';
import Modal from "./Modal";
import {imageUrl} from "../utils/Image";
import React from 'react';
import {ClassNames} from "../utils/UtilFunctions";
import {gql, useMutation} from "@apollo/client";
import {decodeToken, isExpired} from "react-jwt";

const UPDATE_STATUS = gql`
    mutation updateStatus($id: String!, $status: String!) {
        updateStatus(id: $id, status: $status) {
            id
            status
        }
    }`

export function CancelOrderModal(props) {
    const {
        onClickClose,
        item,
        identificator,
        price,
        date,
        refresh
    } = props;
    // const [deleteOrder, {error}] = useMutation(DELETE_ORDER)

    const [updateStatus] = useMutation(UPDATE_STATUS)

    const isExp = isExpired(localStorage.getItem('token'))
    const userEmail = !isExp && decodeToken(localStorage.getItem('token')).email;

    const sendEmail = () => {
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID_CANCEL,
            {
                subject: 'Anulowanie zamówienia',
                id: identificator,
                email: userEmail,
                name: item.name,
                phone: item.phone,
                zip: item.zip,
                address: item.address,
                productsToCancel: item.orderedProducts.map((product) => {
                    return product.hint
                        ? ` ${product.hint} ${product.name}: ${product.amount}`
                        : ` ${product.name}: ${product.amount}`;
                }),
                date: date,
                sum: `${price} zł`,
            },
            process.env.REACT_APP_PUBLIC_KEY
        );
    };

    const iconRemap = {
        '[NIEGAZ]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/GiWaterSplash.webp')}
                    width='16px'
                    height='16px'
                    alt='napój niegazowany'
                />
            </div>
        },
        '[GAZ]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/RiBubbleChartLine.webp')}
                    width='16px'
                    height='16px'
                    alt='napój gazowany'
                />
            </div>
        },
        '[SOK]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/GiManualJuicer.webp')}
                    width='16px'
                    height='16px'
                    alt='sok / nektar'
                />
            </div>
        },
        '[B]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/FaCarrot.webp')}
                    width='16px'
                    height='16px'
                    alt='boguś'
                />
            </div>
        },
        '[HERBATA]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/FaTeapot.webp')}
                    width='16px'
                    height='16px'
                    alt='Boguś'
                />
            </div>
        },
        '[WODA]': {
            icon: <div
                className='flex w-4 h-4 mt-0.5'>
                <img
                    src={imageUrl('icons/MdWaterDrop.webp')}
                    width='16px'
                    height='16px'
                    alt='woda źródlana'
                />
            </div>
        }
    };

    return (
        <Modal
            classes="items-center justify-center overflow-auto"
            hfit="h-fit w-auto"
            closeModal={onClickClose}
        >
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    zipcode: '',
                    address: '',
                }}
                // validationSchema={formSchema}
                onSubmit={() => {
                    sendEmail();
                    updateStatus({
                        variables: {
                            "id": identificator,
                            "status": "canceled"
                        }
                    })

                    refresh(prevState => !prevState)
                    onClickClose();
                }}
            >
                {() => (
                    <Form>
                        <div className="flex h-auto flex-col sm:pt-0">
                            <div className=" flex w-full flex-col gap-4 overflow-auto text-center">
                                <div className="text-sm sm:text-lg flex flex-col md:flex-row items-center justify-center">
                                    <p className='whitespace-nowrap'>Czy na pewno chcesz</p>
                                    <div className='flex'>
                                        <p className='mx-1.5 text-red-600 font-bold'>anulować</p>
                                        <p className='whitespace-nowrap'> poniższe zamówienie?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex w-fit flex-col items-center justify-start text-start py-10">
                                    <div className='flex w-full flex-col items-start gap-2 mb-5'>
                                        <div>
                                            <p>Numer zamówienia: {identificator}</p>
                                        </div>
                                        <div>
                                            <p>Cena: {price} zł</p>
                                        </div>
                                        <div>
                                            <p>Data: {date}</p>
                                        </div>
                                    </div>
                                    {item.orderedProducts.map((ordered, index) => {
                                        return (
                                            <div
                                                className={`w-full grid grid-cols-[85%_minmax(15%,1fr)] ${
                                                    index === 0 && 'border-t'
                                                } border-l border-gray-400`}
                                                key={index}
                                            >
                                                <div
                                                    className='flex w-full flex-col overflow-x-auto text-ellipsis whitespace-nowrap border-b border-gray-400 py-1 scrollbar-thin hover:scrollbar-thumb-gray-400 md:min-w-[385px] md:overflow-hidden'
                                                    key={index}
                                                >
                                                    <div className={ClassNames('hidden', 'lg:flex')}>
                                                        <div className='flex'>
                                                            <div
                                                                className='pl-2 pt-0.5'
                                                                title={iconRemap[ordered.hint]?.hoverHint}
                                                            >
                                                                {iconRemap[ordered.hint]?.icon}
                                                            </div>
                                                            <p className='pl-2'>{ordered.name}</p>
                                                        </div>
                                                    </div>

                                                    <div className={ClassNames('lg:hidden')}>
                                                        <div className='flex'>
                                                            <div className='pl-2 pt-0.5'>
                                                                {iconRemap[ordered.hint]?.icon}
                                                            </div>
                                                            <p className='px-2'>{ordered.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex w-full items-end'>
                                                    <p
                                                        className='w-full whitespace-pre-wrap border-x border-b border-gray-400 py-1 text-center'
                                                        key={index}
                                                    >
                                                        {ordered.amount}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded bg-primary p-2 font-semibold uppercase text-white sm:w-full sm:px-10 sm:py-4"
                                >
                                    <div className="inline-block mt-1">
                                        <img
                                            src={imageUrl('icons/AiOutlineCheckCircleWhite.webp')}
                                            width='15px'
                                            height='15px'
                                            alt='anuluj zamówienie'
                                            className='pb-1'
                                        />
                                    </div>
                                    <p className="px-2">Anuluj zamówienie</p>
                                </button>
                                <button
                                    className="flex w-full items-center justify-center rounded bg-primary font-semibold uppercase text-white sm:w-full sm:px-10 sm:py-4"
                                    onClick={onClickClose}
                                >
                                    <div
                                        className='inline-block mt-1'>
                                        <img
                                            src={imageUrl('icons/AiOutlineCloseCircle.webp')}
                                            width='15px'
                                            height='15px'
                                            alt='Cofnij'
                                            className='pb-1'
                                        />
                                    </div>
                                    <p className="px-2">Cofnij</p>
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}
