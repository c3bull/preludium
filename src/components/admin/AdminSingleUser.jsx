import {ClassNames} from "../utils/UtilFunctions";
import React, {useState} from "react";
import {imageUrl} from "../utils/Image";
import {remapStatuses} from "../common/remap";
import {roles, statuses} from "../common/statuses";
import {gql, useMutation} from "@apollo/client";

const UPDATE_ROLE = gql`
    mutation updateRole($id: String!, $role: String!) {
        updateRole(id: $id, role: $role) {
            id
            role
        }
    }`

export default function AdminSingleUser({
                                            id,
                                            email,
                                            name,
                                            surname,
                                            role,
                                            refresh,
                                            index,
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

    const [updateRole, {error}] = useMutation(UPDATE_ROLE)
    return (
        <div
            className={ClassNames('w-full md:w-[43rem] border-2 gap-1 border-gray-500 rounded-lg flex flex-col my-2 2xl:my-0 p-6',
                `${index % 2 === 0 && 'bg-neutral-100'}`,
                `${role === 'blocked' && 'bg-red-200'}`,
                `${role === 'admin' && 'bg-blue-200'}`,
                // `${role === 'client' && 'bg-amber-100'}`,
            )}>
            <div className='flex flex-col gap-1 md:flex-row w-full justify-between  text-sm md:text-[16px]'>
                <div className='flex gap-1'>
                    <p className='whitespace-nowrap'>ID Użytkownika:</p>
                    <p className='font-semibold overflow-x-auto'>{id}</p>
                    <div
                        className="cursor-pointer flex  justify-center pt-0.5 md:pt-[5px]"
                        onClick={() => {
                            {
                                if (typeof id === 'string') {
                                    navigator.clipboard.writeText(id);
                                }
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

                <div className='flex flex-col gap-1'>
                    {/*<p className='w-full py-2 md:py-0 md:text-end whitespace-nowrap font-semibold'>{date}</p>*/}
                    <div className='flex gap-1 w-full md:text-end'>Status:
                        <div className='font-semibold overflow-x-auto'>
                            <p className='h-full'>{remapStatuses(roles, role)}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col md:flex-row w-full'>
                <div className='flex flex-col md:min-w-[20rem] gap-1 text-sm md:text-[16px]'>
                    <div className='flex gap-1'>Imię: <p className='font-semibold overflow-x-auto'>{name}</p></div>
                    <div className='flex gap-1'>Nazwisko: <p className='font-semibold overflow-x-auto'>{surname}</p></div>
                    <div className='flex gap-1'>Email: <p
                        className='font-semibold overflow-x-auto max-w-[16rem]'>{email}</p></div>
                </div>
            </div>
            <div className='font-semibold flex flex-col md:flex-row pt-4 justify-between gap-3 md:gap-0'>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    role === "client" && 'bg-gray-400')}
                        onClick={() => {
                            updateRole({
                                variables: {
                                    "id": id,
                                    "role": "client"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>Klient</p>
                </button>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    role === "blocked" && 'bg-red-400')}
                        onClick={() => {
                            updateRole({
                                variables: {
                                    "id": id,
                                    "role": "blocked"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));

                        }}>
                    <p>Zablokowany</p>
                </button>
                <button className={ClassNames('hover:saturate-50 border-2 border-gray-600 p-2 md:p-5 rounded-lg',
                    role === "admin" && 'bg-blue-400')}
                        onClick={() => {
                            updateRole({
                                variables: {
                                    "id": id,
                                    "role": "admin"
                                }
                            }).then(setTimeout(() => refresh(prevState => !prevState), 50));
                        }}>
                    <p>Administrator</p>
                </button>
            </div>
        </div>
    )
}