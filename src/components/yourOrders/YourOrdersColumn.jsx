import {ClassNames} from "../utils/UtilFunctions";
import {imageUrl} from "../utils/Image";
import React, {useState} from 'react';
import {gql, useMutation} from "@apollo/client";
import {CancelOrderModal} from "../modals/CancelOrderModal";
import {remapStatuses} from "../common/remap";
import {statuses} from "../common/statuses";


const DELETE_ORDER = gql`
    mutation deleteOrder($id: String!) {
        deleteOrder(id: $id) {
            id
        }
    }`

export default function YourOrdersColumn({
                                             icon,
                                             value,
                                             classes,
                                             copySign,
                                             idClasses,
                                             onClickDelete,
                                             item,
                                             price,
                                             date,
                                             refresh
                                         }) {
    const [deleteOrder, {error}] = useMutation(DELETE_ORDER)
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)

    return (
        <div className={` my-1 flex items-center border border-gray-800 lg:my-0 lg:justify-center`}>
            <div className="flex items-center border-r border-gray-800 bg-orange-50 p-2 lg:hidden lg:justify-center">
                {icon}
            </div>
            <div
                className={ClassNames(
                    'relative w-full text-center flex items-center justify-center',
                    `${classes}`
                )}
            >
                {!onClickDelete && <div className={ClassNames(`${idClasses}`)}>{value}</div>}
                {copySign && (
                    <div
                        className="cursor-pointer "
                        onClick={() => {
                            {
                                if (typeof value === 'string') {
                                    navigator.clipboard.writeText(value);
                                }
                            }
                        }}
                    >
                        <div className='w-4 h-4 flex items-center mb-1 duration-100 hover:scale-110 active:border'>
                            <img
                                src={imageUrl('icons/AiOutlineCopy.webp')}
                                width='16px'
                                height='16px'
                                alt='kopiuj'
                            />
                        </div>
                    </div>
                )}
                {onClickDelete && (
                    <div className='w-full h-full'>
                        <p className={ClassNames('h-full',
                            item.status === 'canceled' && 'text-red-500',
                            item.status === 'sent' && 'text-primary',
                            item.status === 'completed' && 'text-green-600',
                            item.status === 'confirmed' && 'text-blue-500',
                        )}>{item.status && remapStatuses(statuses, item.status)}</p>
                        {item.status === "in-progress" &&
                            <div
                                className='mx-4 h-full hover:bg-red-500 duration-200 border-gray-800 border-2 my-1 justify-center flex rounded-lg items-center gap-1 cursor-pointer bg-red-400'
                                onClick={() => {
                                    setShowCancelConfirmation(true)
                                }}>
                                <p>Anuluj</p>
                                <img
                                    className='cursor-pointer w-4 h-4'
                                    src={imageUrl('icons/cancel.webp')}
                                    alt='anuluj zamówienie'
                                />
                            </div>
                        }
                    </div>
                )}

                {showCancelConfirmation && (
                    <CancelOrderModal
                        onClickClose={() => {
                            // setShowBasket(false);
                            setShowCancelConfirmation(false);
                        }}
                        onClickCancel={() => {
                            {
                                deleteOrder({
                                    variables: {
                                        "id": value
                                    }
                                }).then(r => window.location.reload(false))
                            }
                            // saveOrderToDb();
                        }}
                        item={item}
                        identificator={value}
                        price={price}
                        date={date}
                        refresh={refresh}
                        // products={data.product.map((item, index) => {
                        //     const amount = selectedProductsAmount[index];
                        //
                        //     if (!amount) {
                        //         return <React.Fragment key={item.id}/>;
                        //     }
                        //
                        //     return (
                        //         <div className='flex border-b border-black' key={item.id}>
                        //             <div className='flex whitespace-nowrap uppercase'>
                        //                 <div className='pr-2 pt-0.5'>
                        //                     {iconRemap[item.hint]?.icon}
                        //                 </div>
                        //                 <p> {item.name}</p>
                        //             </div>
                        //             <p className='flex w-full justify-end px-2 font-semibold'>
                        //                 {amount}
                        //             </p>
                        //         </div>
                        //     );
                        // })}
                        // productsToSave={data.product
                        //     .filter((pd) => {
                        //         return selectedProductsAmount[pd.number];
                        //     })
                        //     .map((pd) => {
                        //         const {number, name, hint} = pd;
                        //         return {
                        //             amount: selectedProductsAmount[number],
                        //             hint,
                        //             name
                        //         };
                        //     })}
                        // sum={((finalPrice() + discount()) / 100)}
                    />
                )}

            </div>
        </div>
    );
}
