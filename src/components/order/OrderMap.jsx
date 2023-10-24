import Collapsible from 'react-collapsible';

import {imageUrl} from "../utils/Image";

export default function OrderMap() {
    return (
        <>
            <div className="pt-14 flex items-center justify-center">
                <div className="inline-block items-center justify-center border-b border-black px-3 pt-20">
                    <p className="text-center text-sm  md:text-2xl font-semibold uppercase text-red-600">
                        rozwozimy produkty w promieniu 250 km od Krakowa
                    </p>
                    <p className="text-center text-xs md:text-[16px] font-semibold uppercase text-red-600">
                        wyłączając rejon południowy (Zakopane, Nowy Targ, Myślenice, Nowy Sącz i okolice - w te miejsca produkty rozwozi producent)
                    </p>
                    <Collapsible
                        trigger="Kliknij, aby zobaczyć obszar"
                        triggerWhenOpen="Kliknij, aby zwinąć"
                        triggerStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '3px',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={imageUrl('obszar_dowozu.webp')}
                            className="w-full rounded-2xl pb-5"
                            alt="obszar dowozu w postaci graficznej"
                        />
                    </Collapsible>
                </div>
            </div>
            <div/>
        </>
    );
}
