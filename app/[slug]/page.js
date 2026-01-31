import styles from "../page.module.css";
import Hero from "@/components/sections/Hero";
import EventDetails from "@/components/sections/EventDetails";
import Story from "@/components/sections/Story";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import { cardService } from '@/lib/cardService';
import LockScreen from "@/components/client/LockScreen";

export async function generateMetadata({ params, searchParams }) {
    const { slug } = await params;
    const data = await cardService.getCardById(slug);

    if (!data) return { title: 'Event Not Found' };

    const { hero, eventDetails } = data;
    // Map fields correctly from hero/eventDetails
    const title = `${hero?.title || 'Event'} - ${hero?.names || ''}`;
    const description = `You are invited! ${hero?.date || ''} at ${eventDetails?.location || ''}`;
    const images = hero?.image ? [hero.image] : [];

    // Ensure absolute URLs for generic crawlers, though localhost won't work for FB/Zalo
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return {
        metadataBase: new URL(baseUrl),
        title,
        description,
        openGraph: {
            title,
            description,
            images,
        },
    };
}

export default async function CardPage({ params, searchParams }) {
    const { slug } = await params;
    const sp = await searchParams;

    // Support both 'guest' and 'receiver' params
    const guestName = sp?.guest || sp?.receiver;
    const auth = sp?.auth;

    const data = await cardService.getCardById(slug);

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Card not found</div>;
    }

    // Privacy Check
    // If visibility is private AND a password is set by admin
    if (data.config?.visibility === 'private') {
        const correctPassword = data.config?.password;
        // If password exists and (auth matches or empty) -> Check match
        if (correctPassword && auth !== correctPassword) {
            return <LockScreen cardId={slug} />;
        }
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Card not found</div>;
    }

    const primaryColor = data.config?.primaryColor;
    const fontFamily = data.config?.font;

    // We can inject styles directly into a style tag or inline style on wrapper
    const customStyle = {
        ...(primaryColor ? { '--color-primary': primaryColor } : {}),
        ...(fontFamily ? { fontFamily: fontFamily } : {})
    };

    return (
        <main className={styles.main} style={customStyle}>
            {data.hero?.enabled !== false && <Hero data={data.hero} guestName={guestName} />}
            {data.eventDetails?.enabled !== false && <EventDetails data={data.eventDetails} heroDate={data.hero.date} />}
            {data.story?.enabled !== false && <Story data={data.story} />}
            {data.gallery?.enabled !== false && <Gallery data={data.gallery} />}
            {data.rsvp?.enabled !== false && <RSVP />}

            <footer style={{ padding: '2rem', textAlign: 'center', background: 'var(--color-text)', color: 'white' }}>
                <p className="font-heading text-xl">Thank You</p>
                <p className="text-sm opacity-50 mt-2">© 2026 Made with Love</p>
            </footer>
        </main>
    );
}
