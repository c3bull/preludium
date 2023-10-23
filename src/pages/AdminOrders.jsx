import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import AdminSingleOrder from "../components/admin/AdminSingleOrder";
import Breadcrumbs from "../components/common/Breadcrumbs";

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

    console.log('moje zamowienia', myOrders)
    return (
        <div className='flex flex-col items-center pt-20 md:pt-32 px-4 lg:px-20'>
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
        </div>
    )
}