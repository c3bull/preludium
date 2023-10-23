import {gql, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import AdminSingleOrder from "../components/admin/AdminSingleOrder";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {decodeToken, isExpired} from "react-jwt";
import {imageUrl} from "../components/utils/Image";

const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    allOrders {
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
        name
        phone
        zip
        address
        status
    }
  }
`;

export default function AdminOrders() {

    const isExp = isExpired(localStorage.getItem('token'))
    const userRole = !isExp && decodeToken(localStorage.getItem('token')).role;
    const {loading, error, data: allOrders, refetch} = useQuery(GET_ALL_ORDERS);
    const [myOrders, setMyOrders] = useState([]);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        console.log("refresh")
        !loading && setMyOrders(allOrders.allOrders)
        if (allOrders) {
            refetch()
        }
    }, [allOrders, refresh]);

    return (
        !isExp && userRole === "admin" ? <div className='flex flex-col items-center pt-20 md:pt-32 px-4 lg:px-20'>
                <Breadcrumbs/>
                {myOrders && myOrders.map((item, index) => (
                        // console.log("hej")
                        <AdminSingleOrder
                            id={item.id}
                            orderedProducts={item.orderedProducts}
                            address={item.address}
                            date={item.placementDate}
                            email={item.email}
                            name={item.name}
                            phone={item.phone}
                            zip={item.zip}
                            totalPrice={item.totalPrice}
                            status={item.status}
                            index={index}
                            refresh={setRefresh}
                        />
                    )
                )}
            </div> :
            <div className='pt-32 flex justify-center mb-20 md:min-h-[40vh] items-center'>
                <img
                    className='cursor-pointer w-20 h-20 blur-sm'
                    src={imageUrl('icons/cancel.webp')}
                    alt='anuluj zamówienie'
                />
            </div>
    )
}