import {imageUrl} from "../components/utils/Image";
import {useNavigate} from "react-router-dom";

export default function AdminPanel() {
    const navigate = useNavigate();

    const goToOrders = () => {
        navigate("/administrator/zamowienia");
    };

    const goToUsers = () => {
        navigate("/administrator/uzytkownicy");
    };

    return (
        <div className='pt-32 flex justify-center mb-20'>
            <div className='flex gap-10'>
                <div onClick={goToOrders}
                     className='cursor-pointer hover:scale-95 duration-200 flex-col w-96 h-96 bg-primary rounded-xl flex justify-center items-center'>
                    <img src={imageUrl('icons/RiShoppingBasket2Line.webp')} alt='wszystkie zamówienia'/>
                    <p className='text-2xl font-semibold uppercase'>Zamówienia</p>
                </div>
                <div onClick={goToUsers}
                     className='cursor-pointer hover:scale-95 duration-200 flex-col w-96 h-96 bg-primary rounded-xl flex justify-center items-center'>
                    <img src={imageUrl('icons/FaUserAlt.webp')} alt='wszyscy użytkownicy'/>
                    <p className='text-2xl font-semibold uppercase'>Użytkownicy</p>
                </div>
            </div>
        </div>
    )
}