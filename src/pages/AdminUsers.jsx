import {gql, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import AdminSingleUser from "../components/admin/AdminSingleUser";
import {decodeToken, isExpired} from "react-jwt";
import {imageUrl} from "../components/utils/Image";

const GET_ALL_USERS = gql`
query GetAllUsers($first: Int, $afterCursor:String){
  allUsers(first: $first, afterCursor: $afterCursor) {
    totalCount
    edges {
      node {
        id
        email
        name
        surname
        role
        registerDateInMs
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

export default function AdminUsers() {
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [fetchCount, setFetchedCount] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const isExp = isExpired(localStorage.getItem('token'))
    const userRole = !isExp && decodeToken(localStorage.getItem('token')).role;
    const {loading, data: allUsers, refetch, fetchMore} = useQuery(GET_ALL_USERS, {
        variables: {"first": (fetchedUsers.edges ? fetchCount * 6 : 6), "afterCursor": null}
    });
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        !loading && setFetchedUsers(allUsers.allUsers)
        console.log('fc ', fetchCount)
        if (allUsers) {
            refetch()
        }
    }, [allUsers, refresh, fetchCount, loading, refetch]);

    return (
        !isExp && userRole === "admin" ? <div className='flex flex-col items-center pt-20 md:pt-32 px-4'>
                <Breadcrumbs/>
                <div className='2xl:grid grid-cols-2 gap-4 mb-5 mt-5'>
                    {fetchedUsers.edges && fetchedUsers.edges.map((item, index) => (
                            <AdminSingleUser
                                key={index}
                                id={item.node.id}
                                email={item.node.email}
                                name={item.node.name}
                                surname={item.node.surname}
                                role={item.node.role}
                                index={index}
                                refresh={setRefresh}
                            />
                        )
                    )}
                </div>
                <div>
                    {loadMore && fetchedUsers.edges && fetchedUsers.edges.length >= 6 && <button
                        className='bg-primary rounded mb-5 p-5 hover:scale-105 duration-100 text-white font-semibold uppercase'
                        onClick={() => {
                            const {endCursor, hasNextPage} = fetchedUsers.pageInfo;
                            fetchMore({
                                variables: {
                                    "afterCursor": endCursor
                                },
                                updateQuery: (prevResult, {fetchMoreResult}) => {
                                    fetchMoreResult.allUsers.edges = [
                                        ...prevResult.allUsers.edges,
                                        ...fetchMoreResult.allUsers.edges
                                    ];

                                    setFetchedUsers(fetchMoreResult.allUsers)
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