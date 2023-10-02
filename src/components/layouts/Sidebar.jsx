import React from 'react';
import { imageUrl} from "../utils/Image";

function Sidebar() {
    return (
        <div>
            <div className="sidebar">
                <div id="mySidenav">
                    <a
                        href="https://www.facebook.com/syklykbis"
                        target="_blank"
                        className="flex items-center gap-4 border-hidden bg-primary shadow-lg"
                        rel="noreferrer"
                    >
                        <div
                            className='flex items-center w-12 h-12 ml-0.5'>
                            <img
                                src={imageUrl('icons/FaFacebook.png')}
                                width='50px'
                                height='50px'
                                alt='Facebook'
                            />
                        </div>
                        <p className="pr-2">Facebook</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
