import {useState} from 'react';

import {NotLoggedModal} from "../components/modals/NotLoggedModal";
import {Prices} from "../components/prices/Prices";
import {isExpired} from "react-jwt";
import {useNavigate} from "react-router-dom";

const PricesPage = () => {
    const isExp = isExpired(localStorage.getItem('token'))
    const [showModal, setShowModal] = useState(-1);
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/zaloguj");
    };
    return (
        <div>
            {isExp && showModal === -1 && (
                <NotLoggedModal
                    onClickClose={() => {
                        setShowModal(1);
                    }}
                    onClickLogin={goToLogin}
                    message="Aby móc zobaczyć ceny, musisz się zalogować"
                />
            )}

            <div className="flex justify-center">
                <div className="flex w-2/3 flex-col justify-center">
                    <div className="grid gap-6 pt-14 pb-16">
                        <Prices
                            category="water"
                            title="woda źródlana"
                            color="via-cyan-100"
                        />
                        <Prices
                            category="carb_drink"
                            title="napoje gazowane"
                            color="via-yellow-100"
                            classes="xl:grid-cols-4"
                        />
                        <Prices
                            category="non_carb_drink"
                            title="napoje niegazowane"
                            color="via-orange-100"
                            classes="xl:grid-cols-4"
                        />
                        <Prices
                            category="juices"
                            title="soki i nektary"
                            color="via-red-100"
                            classes="xl:grid-cols-4"
                        />
                        <Prices
                            category="bogus"
                            title="boguś"
                            color="via-orange-100"
                        />
                        <Prices
                            category="tea"
                            title="herbata"
                            color="via-orange-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricesPage;
