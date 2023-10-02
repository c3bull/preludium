import Collapsible from 'react-collapsible';

import {imageUrl} from "../utils/Image";

export default function OrderMap() {
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="inline-block items-center justify-center border-b border-black px-3 pt-20">
                    <p className="text-center text-2xl font-semibold uppercase text-red-600">
                        rozwozimy produkty w promieniu 250 km od Krakowa
                    </p>
                    <Collapsible
                        trigger="Kliknij, aby zobaczyć obszar"
                        triggerWhenOpen="Kliknij, aby zwinąć"
                        triggerStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '3px',
                        }}
                    >
                        <img
                            src={imageUrl('obszar_dowozu.png')}
                            className="w-full rounded-2xl pb-5"
                            alt="obszar dowozu"
                        />
                    </Collapsible>
                </div>
            </div>
            <div/>
        </>
    );
}
