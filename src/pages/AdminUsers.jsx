import {gql, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import AdminSingleOrder from "../components/admin/AdminSingleOrder";
import Breadcrumbs from "../components/common/Breadcrumbs";
import AdminSingleUser from "../components/admin/AdminSingleUser";

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
        <div className='flex flex-col items-center pt-20 md:pt-32 px-4 lg:px-20'>
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
        </div>
    )
}