import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from 'react';
import YourOrderCollapsible from "../components/yourOrders/YourOrderCollapsible";
import YourOrdersColumn from "../components/yourOrders/YourOrdersColumn";
import YourOrdersHeader from "../components/yourOrders/YourOrdersHeader";
import {ClassNames} from "../components/utils/UtilFunctions";
import {imageUrl} from "../components/utils/Image";
import {gql, useQuery} from "@apollo/client";


const GET_YOUR_ORDERS = gql`
  query GetOrders($email: String!) {
    order (email: $email) {
        id
        orderedProducts {
            amount
            hint
            name
            productId
        }
        totalPrice
        placementDate
        email
        }
    }
`;

const YourOrdersPage = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [noOrders, setNoOrders] = useState(false);
    const [noOrdersSpinner, setNoOrdersSpinner] = useState(true);
    const {user} = useAuth0();
    const {loading, data: yourOrders} = useQuery(GET_YOUR_ORDERS, {
        variables: {email: user?.email},
    });

    useEffect(() => {
        yourOrders && setMyOrders(yourOrders.order)
    }, [yourOrders]);

    return (
        <div>
            <div
                className='mx-4 flex h-auto min-h-[50vh] flex-col items-center pt-32 pb-12 md:px-10 lg:pt-32 lg:pb-16 xl:pt-48 xl:pb-32'>
                <div className='hidden lg:grid lg:grid-cols-[50px_150px_450px_100px_120px_80px] lg:gap-2'>
                    <YourOrdersHeader
                        title='Lp.'
                        icon={<div className='w-4 h-4 flex items-center'>
                            <img
                                src={imageUrl('icons/AiOutlineNumber.png')}
                                width='16px'
                                height='16px'
                                alt='Lp.'
                            />
                        </div>}
                    />
                    <YourOrdersHeader
                        title='Identyfikator'
                        icon={<div className='w-4 h-4 flex items-center'>
                            <img
                                src={imageUrl('icons/AiOutlineNumber.png')}
                                width='16px'
                                height='16px'
                                alt='identyfikator zamówienia'
                            />
                        </div>}
                    />
                    <YourOrdersHeader
                        title='Zamówione produkty'
                        icon={<div className='w-4 h-4 flex items-center'>
                            <img
                                src={imageUrl('icons/GiBottleCap.png')}
                                width='16px'
                                height='16px'
                                alt='zamówione produkty'
                            />
                        </div>}
                    />
                    <YourOrdersHeader
                        title='Cena'
                        icon={<div className='w-4 h-4 flex items-center'>
                            <img
                                src={imageUrl('icons/ImPriceTag.png')}
                                width='16px'
                                height='16px'
                                alt='cena zamówienia'
                            />
                        </div>}
                    />
                    <YourOrdersHeader
                        title='Data'
                        icon={<div className='w-4 h-4 flex items-center'>
                            <img
                                src={imageUrl('icons/MdDateRange.png')}
                                width='16px'
                                height='16px'
                                alt='data zamówienia'
                            />
                        </div>}
                    />
                    <YourOrdersHeader
                        title='Usuń'
                        icon={<div className='w-4 h-4 flex items-center'>
                            <img
                                src={imageUrl('icons/MdDateRange.png')}
                                width='16px'
                                height='16px'
                                alt='data zamówienia'
                            />
                        </div>}
                    />
                </div>
                {user && user.email ? (
                    <div>
                        {myOrders && myOrders.length > 0 ? (
                            myOrders.slice(0).reverse().map((item, index) => {
                                return (
                                    <div className='my-3 flex lg:my-0' key={index}>
                                        <div
                                            className={ClassNames(
                                                'w-full lg:grid lg:grid-cols-[50px_150px_450px_100px_120px_80px] lg:gap-2 lg:mt-2',
                                                `${index % 2 === 0 && 'bg-neutral-100'}`
                                            )}
                                        >
                                            <YourOrdersColumn
                                                icon={<div className='w-4 h-4 flex items-center'>
                                                    <img
                                                        src={imageUrl('icons/AiOutlineNumber.png')}
                                                        width='16px'
                                                        height='16px'
                                                        alt='Lp.'
                                                    />
                                                </div>}
                                                value={index + 1}
                                            />
                                            <YourOrdersColumn
                                                icon={<div className='w-4 h-4 flex items-center'>
                                                    <img
                                                        src={imageUrl('icons/AiOutlineNumber.png')}
                                                        width='16px'
                                                        height='16px'
                                                        alt='identyfikator zamówienia'
                                                    />
                                                </div>}
                                                value={item.id.toString()}
                                                copySign
                                                classes='px-4'
                                                idClasses='lg:w-52 lg:truncate pr-2'
                                            />
                                            <YourOrderCollapsible index={index} item={item}/>
                                            <YourOrdersColumn
                                                icon={<div className='w-4 h-4 flex items-center'>
                                                    <img
                                                        src={imageUrl('icons/ImPriceTag.png')}
                                                        width='16px'
                                                        height='16px'
                                                        alt='cena zamówienia'
                                                    />
                                                </div>}
                                                value={`${item.totalPrice} zł`}
                                                classes='font-medium'
                                            />
                                            <YourOrdersColumn
                                                icon={<div className='w-4 h-4 flex items-center'>
                                                    <img
                                                        src={imageUrl('icons/MdDateRange.png')}
                                                        width='16px'
                                                        height='16px'
                                                        alt='data zamówienia'
                                                    />
                                                </div>}
                                                value={item.placementDate}
                                                classes='font-medium'
                                            />
                                            <YourOrdersColumn
                                                icon={<div className='w-4 h-4 flex items-center'>
                                                    <img
                                                        src={imageUrl('icons/MdDateRange.png')}
                                                        width='16px'
                                                        height='16px'
                                                        alt='data zamówienia'
                                                    />
                                                </div>}
                                                value={item.id}
                                                onClickDelete
                                                classes='font-medium'
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (

                            <div className='flex flex-col items-center p-5'>
                                <p className='hidden'>
                                    {' '}
                                    {setTimeout(() => setNoOrders(true), 3000)}
                                </p>
                                <p className='hidden'>
                                    {' '}
                                    {setTimeout(() => setNoOrdersSpinner(false), 3000)}
                                </p>
                                {noOrders && (

                                    <h1 className='font-semibold uppercase'>Brak zamówień</h1>
                                )}
                                {noOrdersSpinner && (
                                    <h1 className='w-fit animate-spin'>
                                        <div className='w-14 h-14 flex items-center'>
                                            <img
                                                src={imageUrl('icons/CgSpinner.png')}
                                                width='68px'
                                                height='68px'
                                                alt='loader'
                                            />
                                        </div>
                                    </h1>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='p-5'>
                        <h1 className='animate-spin'>
                            <div className='w-14 h-14 flex items-center'>
                                <img
                                    src={imageUrl('icons/CgSpinner.png')}
                                    width='68px'
                                    height='68px'
                                    alt='loader'
                                />
                            </div>
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourOrdersPage;
