import Modal from "./Modal";
import {imageUrl} from "../utils/Image";
import React from 'react';
import {useAuth0} from "@auth0/auth0-react";

export function BasketModal(props) {
    const {data, onClick, bottleAmount, finalPrice, confirmOrder} = props;
    const {user} = useAuth0();
    return (
        <Modal
            classes="items-center justify-center overflow-auto"
            hfit="h-fit w-auto"
            closeModal={onClick}
        >
            <div className="flex flex-col sm:w-96">
                <div className="flex w-full flex-col justify-center rounded-md border border-gray-400 p-2">
                    {user && (
                        <div>
                            <div
                                className='w-full flex items-center text-center justify-center'>
                                <img
                                    src={imageUrl('icons/ImInfo.png')}
                                    width='16px'
                                    height='16px'
                                    alt='informacje'
                                />
                            </div>
                            <p className="text-center text-xs">
                                W przypadku zniszczenia opakowania, <br/>
                                zobowiązuje się Pan/Pani zapłacić za szkody.
                                <br/>
                                Zniszczenie skrzynki - 25.00 zł
                                <br/>
                                Zniszczenie butelki - 0.70 zł
                            </p>
                        </div>
                    )}
                    <div
                        className='mt-2 w-full flex items-center text-center justify-center'>
                        <img
                            src={imageUrl('icons/RiShoppingBasket2Line.png')}
                            width='30px'
                            height='30px'
                            alt='koszyk'
                        />
                    </div>
                    <p className="w-full pb-2 text-center text-xs uppercase">
                        OPAKOWANIE: <br/>
                        butelki szklane 0,33l, pakowane po 24 szt. (opakowanie zwrotne)
                    </p>
                </div>
                <p className="pt-4 text-center uppercase">
                    ilość butelek: {bottleAmount}
                </p>
                <p className="pb-8 text-center uppercase">
                    ilość skrzynek: {Math.ceil(bottleAmount / 20)}
                </p>
                <div className="flex justify-center">
                    <div
                        className="flex h-full max-h-44 w-full flex-col gap-4  overflow-auto scrollbar-thin scrollbar-thumb-primary">
                        {data}
                    </div>
                </div>

                {bottleAmount > 0 && (
                    <div className="flex w-full pt-5">
                        <div className="flex w-1/2 items-center justify-center">
                            <div className="mr-2">Suma:</div>
                            <p className="font-semibold">{finalPrice.toFixed(2)} zł</p>
                        </div>
                        <button
                            type="button"
                            className="flex w-1/2 justify-center rounded-2xl bg-neutral-700 px-10 py-3 font-bold text-white duration-300 hover:bg-primary sm:my-0 xl:py-3"
                            onClick={() => {
                                confirmOrder();
                            }}
                        >
                            Zamów
                        </button>
                    </div>
                )}
                <div className="mt-3 flex justify-end">
                    <button
                        className="w-full rounded bg-primary px-10 py-4 font-semibold uppercase text-white"
                        onClick={onClick}
                    >
                        Zamknij
                    </button>
                </div>
            </div>
        </Modal>
    );
}
