import {ClassNames} from "../utils/UtilFunctions";


export default function BottleModalTableValues({bottleData}) {
    return (
        <div className="select-none font-semibold">
            {[
                bottleData.tableValues[0].wartoscOdzywcza,
                bottleData.tableValues[0].wartoscEnergetyczna,
                bottleData.tableValues[0].tluszcz,
                bottleData.tableValues[0].wTymKwasyNasycone,
                bottleData.tableValues[0].weglowodany,
                bottleData.tableValues[0].wTymCukry,
                bottleData.tableValues[0].bialko,
                bottleData.tableValues[0].sol,
                bottleData.tableValues[0].witaminaC,
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
                bottleData.tableValues[0].kationy,
                bottleData.tableValues[0].wapniowy,
                bottleData.tableValues[0].magnezowy,
                bottleData.tableValues[0].sodowy,
                bottleData.tableValues[0].potasowy,
                bottleData.tableValues[0].aniony,
                bottleData.tableValues[0].wodoroweglanowy,
                bottleData.tableValues[0].siarczanowy,
                bottleData.tableValues[0].chlorkowy,
                bottleData.tableValues[0].fluorkowy,
                bottleData.tableValues[0].suma,
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
