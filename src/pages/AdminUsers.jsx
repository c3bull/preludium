import {gql, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import AdminSingleUser from "../components/admin/AdminSingleUser";
import {decodeToken, isExpired} from "react-jwt";
import {imageUrl} from "../components/utils/Image";

const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
    id
    email
    name
    surname
    role
    registerDateInMs
    }
  }
`;

export default function AdminUsers() {

    const isExp = isExpired(localStorage.getItem('token'))
    const userRole = !isExp && decodeToken(localStorage.getItem('token')).role;
    const {loading, error, data: allUsers, refetch} = useQuery(GET_ALL_USERS);
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        console.log("refresh")
        !loading && setFetchedUsers(allUsers.allUsers)
        if (allUsers) {
            refetch()
        }
    }, [allUsers, refresh]);

    console.log('fetchedUsers', fetchedUsers)
    return (
        !isExp && userRole === "admin" ? <div className='flex flex-col items-center pt-20 md:pt-32 px-4 lg:px-20'>
            <Breadcrumbs/>
            {fetchedUsers && fetchedUsers.map((item, index) => (
                    <AdminSingleUser
                        id={item.id}
                        email={item.email}
                        name={item.name}
                        surname={item.surname}
                        role={item.role}
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