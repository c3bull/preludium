import {ClassNames} from "../utils/UtilFunctions";


export default function BottleModalTableValues({bottleData}) {
    return (
        <div className="select-none font-semibold">
            {[
                bottleData.tableValues.wartoscOdzywcza,
                bottleData.tableValues.wartoscEnergetyczna,
                bottleData.tableValues.tluszcz,
                bottleData.tableValues.wTymKwasyNasycone,
                bottleData.tableValues.weglowodany,
                bottleData.tableValues.wTymCukry,
                bottleData.tableValues.bialko,
                bottleData.tableValues.sol,
                bottleData.tableValues.witaminaC,
            ]
                .filter((value) => !!value)
                .map((productValue, index) => {
                    return (
                        <p
                            className={ClassNames(
                                'pl-2 w-full pr-2 text-right',
                                index % 2 ? 'bg-primary' : ''
                            )}
                            key={index}
                        >
                            {productValue}
                        </p>
                    )
                })}
            {[
                bottleData.tableValues.kationy,
                bottleData.tableValues.wapniowy,
                bottleData.tableValues.magnezowy,
                bottleData.tableValues.sodowy,
                bottleData.tableValues.potasowy,
                bottleData.tableValues.aniony,
                bottleData.tableValues.wodoroweglanowy,
                bottleData.tableValues.siarczanowy,
                bottleData.tableValues.chlorkowy,
                bottleData.tableValues.fluorkowy,
                bottleData.tableValues.suma,
            ]
                .filter((value) => !!value)
                .map((productValue, index) => (
                    <p
                        className={ClassNames(
                            'pl-2 w-full pr-2 text-right',
                            index % 2 === 0 ? 'bg-cyan-300' : '',
                            productValue.localeCompare('.') === 0
                                ? 'text-transparent'
                                : ''
                        )}
                        key={index}
                    >
                        {productValue}
                    </p>
                ))}
        </div>
    );
}
