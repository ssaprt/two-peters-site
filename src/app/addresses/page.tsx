import { getAllAddresses } from "@/lib/api/Addresses";
import { Metadata } from "next";
import { ClientAdderessesPage } from "./ClientAddressesPage";
import { generatePageMetadata } from "./SEO/meta";
import { schemaAddresses, schemaBreadCrumbs } from "./SEO/schema";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata();
}

export default async function Addresses() {
    const addresses = await getAllAddresses();
    const schema = await schemaAddresses(addresses!);
    return (
        <>
            <ClientAdderessesPage initialAddresses={addresses} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaBreadCrumbs),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema),
                }}
            />
        </>
    );
}
