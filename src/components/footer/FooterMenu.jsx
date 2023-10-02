import FooterLinks from "./FooterLinks";
import React from 'react';

export default function FooterMenu() {
    return (
        <ul className="hidden sm:flex sm:flex-col sm:items-start sm:justify-center sm:gap-5 sm:p-1">
            <li className="font-bold text-gray-800">MENU</li>
            <FooterLinks href="/produkty" name="PRODUKTY" />
            <FooterLinks href="/o-nas" name="O NAS" />
            <FooterLinks href="/kontakt" name="KONTAKT" />
            <FooterLinks href="/cennik" name="CENNIK" />
            <FooterLinks href="/zamow" name="ZŁÓŻ ZAMÓWIENIE" />
        </ul>
    );
}
