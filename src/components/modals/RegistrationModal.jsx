import Modal from "./Modal";

export function RegistrationModal() {
    return (
        <Modal classes="items-center overflow-auto" hfit="h-fit">
            <div className="flex flex-col text-center sm:w-96">
                <p className="py-2 text-xl font-semibold">
                    Dziękujemy za założenie konta
                </p>
                <p className="py-2 text-sm">
                    Możesz się bezpiecznie zalogować
                </p>
            </div>
        </Modal>
    );
}
