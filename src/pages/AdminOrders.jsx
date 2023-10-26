import {gql, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import AdminSingleOrder from "../components/admin/AdminSingleOrder";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {decodeToken, isExpired} from "react-jwt";
import {imageUrl} from "../components/utils/Image";

const GET_ALL_ORDERS = gql`
  query GetAllOrders($first: Int, $afterCursor: String) {
  allOrders(first: $first, afterCursor: $afterCursor) {
    totalCount
    edges {
      node {
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
        customerId
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}

`;

export default function AdminOrders() {

    const [myOrders, setMyOrders] = useState([]);
    const [fetchCount, setFetchedCount] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const isExp = isExpired(localStorage.getItem('token'))
    const userRole = !isExp && decodeToken(localStorage.getItem('token')).role;
    const {loading, error, data: allOrders, refetch, fetchMore} = useQuery(GET_ALL_ORDERS, {
        variables: {"first": (myOrders.edges ? fetchCount * 5 : 5), "afterCursor": null}
    });
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
                {myOrders.edges && myOrders.edges.map((item, index) => (
                        // console.log("hej")
                        <AdminSingleOrder
                            key={index}
                            id={item.node.id}
                            orderedProducts={item.node.orderedProducts}
                            address={item.node.address}
                            date={item.node.placementDate}
                            email={item.node.email}
                            name={item.node.name}
                            phone={item.node.phone}
                            zip={item.node.zip}
                            totalPrice={item.node.totalPrice}
                            status={item.node.status}
                            customerId={item.node.customerId}
                            index={index}
                            refresh={setRefresh}
                        />
                    )
                )}
                <div>
                    {loadMore && myOrders.edges && myOrders.edges.length >= 5  && <button
                        className='bg-primary rounded mt-3 mb-5 p-5 hover:scale-105 duration-100 text-white font-semibold uppercase'
                        onClick={() => {
                            const {endCursor, hasNextPage} = myOrders.pageInfo;
                            fetchMore({
                                variables: {
                                    "afterCursor": endCursor
                                },
                                updateQuery: (prevResult, {fetchMoreResult}) => {
                                    fetchMoreResult.allOrders.edges = [
                                        ...prevResult.allOrders.edges,
                                        ...fetchMoreResult.allOrders.edges
                                    ];

                                    setMyOrders(fetchMoreResult.allOrders)
                                    return fetchMoreResult;
                                }
                            });
                            setFetchedCount(prevState => prevState + 1)
                            setLoadMore(hasNextPage)
                        }}
                    >
                        Załaduj więcej
                    </button>}
                </div>
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