import Modal from "./Modal";
import {imageUrl} from "../utils/Image";
import React from 'react';
import {useNavigate} from "react-router-dom";


export function NotLoggedModal(props) {
    const {onClickClose, message} = props;

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/zaloguj");
    };
    return (
        <Modal
            classes='pt-16 items-center overflow-auto w-full'
            hfit='h-fit'
            closeModal={onClickClose}
        >
            <div className='flex flex-col'>
                <div className='flex h-full max-h-64 w-full flex-col gap-4 overflow-auto text-center'>
                    <p>{message}</p>
                </div>
                <div className='mt-3 flex justify-end gap-2'>
                    <button
                        className='drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)] flex w-full items-center justify-center rounded bg-primary px-6 py-4 font-semibold uppercase text-white'
                        onClick={goToLogin}
                    >
                        <div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/IoLogInOutline.webp')}
                                width='16px'
                                height='16px'
                                alt='zaloguj się'
                            />
                        </div>
                        <p className='px-2'>Zaloguj</p>
                    </button>
                    <button
                        className='flex w-full items-center justify-center rounded bg-primary px-6 py-4 font-semibold uppercase text-white'
                        onClick={onClickClose}
                    >
                        <div
                            className='flex items-center'>
                            <img
                                src={imageUrl('icons/AiOutlineCloseCircle.webp')}
                                width='16px'
                                height='16px'
                                alt='zamknij'
                            />
                        </div>
                        <p className='px-2'>Zamknij</p>
                    </button>
                </div>
            </div>
        </Modal>
    );
}
