import Modal from "./Modal";

export function ThanksModal() {
    return (
        <Modal classes="items-center overflow-auto" hfit="h-fit">
            <div className="flex flex-col text-center sm:w-96">
                <p className="py-2 text-xl font-semibold">
                    Dziękujemy za złożenie zamówienia! Proszę czekać na kontakt :)
                </p>
                <p className="py-2 text-sm">
                    Za 3 sekundy nastąpi przekierowanie do Twoich zamówień
                </p>
            </div>
        </Modal>
    );
}
