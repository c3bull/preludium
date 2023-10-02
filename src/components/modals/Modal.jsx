import React, { useEffect, useRef } from 'react';

import { ClassNames} from "../utils/UtilFunctions";


function useOutsideAlerter(ref, close) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (close) {
                    close();
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

export default function Modal(props) {
    const { title, children, classes, hfit, closeModal } = props;
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeModal);
    return (
        <div className="fixed top-0 left-0 z-30 h-full w-screen">
            <div className="h-full w-screen bg-black opacity-50" />
            <div
                className={ClassNames(
                    'absolute top-0 left-0 flex h-screen w-screen',
                    'sm:justify-center',
                    `${classes}`
                )}
            >
                <div
                    className={ClassNames(
                        'w-full sm:w-auto rounded-md border bg-white p-4 shadow-md',
                        `${hfit}`
                    )}
                    ref={wrapperRef}
                >
                    {title && (
                        <h2 className="mb-4 border-b border-primary pb-2 text-center text-2xl font-bold uppercase">
                            {title}
                        </h2>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
