import { getGeneralAddress } from "@/lib/api/Addresses";
import { Metadata } from "next";
import { ClientContactsPage } from "./ClientContactsPage";
import { generatePageMetadata } from "./SEO/meta";
import { schemaBreadCrumbs, schemaContacts } from "./SEO/schema";

export async function generateMetadata(): Promise<Metadata> {
    return generatePageMetadata();
}

export default async function Contacts() {
    const firstPartAddress = await getGeneralAddress();
    return (
        <>
            <ClientContactsPage initialAddress={firstPartAddress!} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaBreadCrumbs),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaContacts(firstPartAddress!)),
                }}
            />
        </>
    );
}
