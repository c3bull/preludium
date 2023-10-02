import React from 'react';

export default function SectionHeader({ children, icon }) {
    return (
        <div className="flex flex-col items-center sm:my-10 sm:flex-row sm:gap-2">
            {icon && (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg sm:h-20 sm:w-20 sm:p-2">
                    {icon}
                </div>
            )}
            <h2 className="items-center rounded-lg pb-2 text-center font-medium uppercase sm:py-4 sm:text-2xl md:text-3xl">
                {children}
            </h2>
        </div>
    );
}
