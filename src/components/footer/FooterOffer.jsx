import FooterLinks from "./FooterLinks";
import React from 'react';

export default function FooterOffer() {
    return (
        <div className="flex flex-col items-start sm:justify-center sm:pl-5">
            <ul className="hidden sm:flex sm:flex-col sm:items-start sm:justify-start sm:gap-5 sm:p-1">
                <li className="font-bold text-gray-800">OFERTA</li>
                <FooterLinks href="/produkty/napoje-gazowane" name="NAPOJE GAZOWANE" />
                <FooterLinks
                    href="/produkty/napoje-niegazowane"
                    name="NAPOJE NIEGAZOWANE"
                />
                <FooterLinks href="/produkty/soki-i-nektary" name="SOKI I NEKTARY" />
                <FooterLinks href="/produkty/bogus" name="BOGUŚ" />
                <FooterLinks href="/produkty/woda-zrodlana" name="WODA ŹRÓDLANA" />
            </ul>
        </div>
    );
}
