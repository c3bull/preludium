import React from 'react';
import {Link} from "react-router-dom";


export default function FooterLinks({ href, name }) {
    return (
        <li>
            <Link to={href}>
                <div className="border-hidden text-black duration-150 hover:text-white">
                    {name}
                </div>
            </Link>
        </li>
    );
}
