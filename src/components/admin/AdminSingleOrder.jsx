import {ClassNames} from "../utils/UtilFunctions";
import React from "react";
import {imageUrl} from "../utils/Image";
import {remapStatuses} from "../common/remap";
import {statuses} from "../common/statuses";
import {gql, useMutation} from "@apollo/client";

const UPDATE_STATUS = gql`
    mutation updateStatus($id: String!, $status: String!) {
        updateStatus(id: $id, status: $status) {
            id
            status
        }
    }`

export default function AdminSingleOrder({
                                             id,
                                             name,
                                             email,
                                             phone,
                                             zip,
                                             address,
                                             date,
                                             orderedProducts,
                                             totalPrice,
                                             status,
                                             customerId,
                                             index,
                                             refresh
                                         }) {
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
                    alt='Boguś'
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

    const [updateStatus] = useMutation(UPDATE_STATUS)

    return (
        <div
            className={ClassNames('w-full md:w-[43rem] border-2 gap-1 border-gray-500 rounded-lg flex flex-col my-2 2xl:my-0 p-6',
                `${index % 2 === 0 && 'bg-neutral-100'}`,
                `${status === 'canceled' && 'bg-red-200'}`,
                `${status === 'confirmed' && 'bg-blue-200'}`,
                `${status === 'sent' && 'bg-amber-100'}`,
                `${status === 'completed' && 'bg-green-300'}`
            )}>
            <div className='flex flex-col gap-1 md:flex-row w-full justify-between  text-sm md:text-[16px]'>
                <div className='flex flex-col '>

                    <div className='flex gap-1'>
                        <p className='whitespace-nowrap'>ID Zamówienia:</p>
                        <p className='font-semibold overflow-x-auto'>{id}</p>
                        <div
                            className="cursor-pointer flex  justify-center pt-0.5 md:pt-[5px]"
                            onClick={() => {
                                if (typeof id === 'string') {
                                    navigator.clipboard.writeText(id);
                                }
                            }}
                        >
                            <div
                                className='w-4 h-4 flex items-center mb-1 border-transparent duration-100 hover:scale-110 active:border'>
                                <img
                                    src={imageUrl('icons/AiOutlineCopy.webp')}
                                    className='w-4 h-4'
                                    alt='kopiuj'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <p className='whitespace-nowrap'>ID Klienta:</p>
                        <p className='font-semibold overflow-x-auto'>{customerId}</p>
                        <div
                            className="cursor-pointer flex  justify-center pt-0.5 md:pt-[5px]"
                            onClick={() => {
                                if (typeof customerId === 'string') {
                                    navigator.clipboard.writeText(customerId);
                                }
                            }}
                        >
                            <div
                                className='w-4 h-4 flex items-center mb-1 border-transparent duration-100 hover:scale-110 active:border'>
                                <img
                                    src={imageUrl('icons/AiOutlineCopy.webp')}
                                    className='w-4 h-4'
                                    alt='kopiuj'
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    {/*<p className='w-full py-2 md:py-0 md:text-end whitespace-nowrap font-semibold'>{date}</p>*/}
                    <div className='flex gap-1 w-full md:text-end'>Data:
                        <p className='font-semibold overflow-x-auto w-fit whitespace-nowrap'>{date}</p>
                    </div>
                    <div className='flex gap-1 w-full md:text-end'>Status:
                        <div className='font-semibold overflow-x-auto'>
                            <p className='h-full'>{remapStatuses(statuses, status)}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col md:flex-row w-full'>
                <div className='flex flex-col md:min-w-[20rem] gap-1 md:gap-4 text-sm md:text-[16px]'>
                    <div className='flex gap-1'>Klient: <p className='font-semibold overflow-x-auto'>{name}</p></div>
                    <div className='flex gap-1'>Email: <p
                        className='font-semibold overflow-x-auto max-w-[16rem]'>{email}</p></div>
                    <div className='flex gap-1'>Telefon: <p className='font-semibold overflow-x-auto'>{phone}</p></div>
                    <div className='flex gap-1 whitespace-nowrap'>Kod pocztowy: <p
                        className='font-semibold overflow-x-auto'>{zip}</p>
                    </div>
                    <div className='flex gap-1'>Adres: <p
                        className='font-semibold overflow-x-auto max-w-[16rem]'>{address}</p></div>
                </div>
                <div className='md:min-w-[20rem]'>
                    <p className='text-sm md:text-[16px] pt-5 md:pt-0'>Zamówione produkty:</p>
                    <div className="flex  w-full flex-col items-center justify-start text-start">
                        <div className='flex w-full flex-col items-start gap-2 '>
                        </div>
                        {orderedProducts.map((ordered, index) => {
                            return (
                                <div
                                    className={`w-full grid grid-cols-[85%_minmax(15%,1fr)] ${
                                        index === 0 && 'border-t'
                                    } border-l border-gray-600`}
                                    key={index}
                                >
                                    <div
                                        className='flex w-full flex-col overflow-x-auto text-ellipsis whitespace-nowrap border-b border-gray-600 py-1 scrollbar-thin hover:scrollbar-thumb-gray-600 md:overflow-hidden'
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
                                            className='w-full whitespace-pre-wrap border-x border-b border-gray-600 py-1 text-center'
                                            key={index}
                                        >
                                            {ordered.amount}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className='text-end font-bold text-lg'>Cena: {totalPrice} zł</p>
                </div>
            </div>
            <div className='font-semibold flex flex-col md:flex-row pt-4 justify-between gap-3 md:gap-0'>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    status === "in-progress" && 'bg-gray-400')}
                        onClick={() => {
                            updateStatus({
                                variables: {
                                    "id": id,
                                    "status": "in-progress"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>W toku</p>
                </button>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    status === "canceled" && 'bg-red-400')}
                        onClick={() => {
                            updateStatus({
                                variables: {
                                    "id": id,
                                    "status": "canceled"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>Anulowane</p>
                </button>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    status === "confirmed" && 'bg-blue-400')}
                        onClick={() => {
                            updateStatus({
                                variables: {
                                    "id": id,
                                    "status": "confirmed"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>Zaakceptowane</p>
                </button>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    status === "sent" && 'bg-orange-500')}
                        onClick={() => {
                            updateStatus({
                                variables: {
                                    "id": id,
                                    "status": "sent"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>Wysłane</p>
                </button>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    status === "completed" && 'bg-green-500')}
                        onClick={() => {
                            updateStatus({
                                variables: {
                                    "id": id,
                                    "status": "completed"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>Dostarczone</p>
                </button>
            </div>
        </div>
    )
}