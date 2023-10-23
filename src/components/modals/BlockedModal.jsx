import Modal from "./Modal";
import {imageUrl} from "../utils/Image";
import React from 'react';
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {decodeToken, isExpired} from "react-jwt";


export function BlockedModal(props) {
    const {onClickClose, message} = props;
    const LOGOUT_USER = gql`
    mutation logoutUser($userId: String!) {
        logoutUser(userId: $userId) {
       userId
        }
    }`

    const [logoutUser, {error}] = useMutation(LOGOUT_USER)

    const isExp = isExpired(localStorage.getItem('token'))
    const userId = !isExp && decodeToken(localStorage.getItem('token')).userId;
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
                        className='flex w-full items-center justify-center rounded bg-primary px-6 py-4 font-semibold uppercase text-white'
                        onClick={() => {
                            logoutUser({
                                variables: {
                                    "userId": userId,
                                }
                            }).then(() => localStorage.removeItem('token')).then(goToLogin)
                            // logout({returnTo: window.location.origin});
                        }}
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
