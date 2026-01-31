import styles from "./page.module.css";
import Hero from "@/components/sections/Hero";
import EventDetails from "@/components/sections/EventDetails";
import Story from "@/components/sections/Story";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import { promises as fs } from 'fs';
import path from 'path';

async function getData() {
  const filePath = path.join(process.cwd(), 'lib/data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <Hero data={data.hero} />
      <EventDetails data={data.eventDetails} heroDate={data.hero.date} />
      <Story data={data.story} />
      <Gallery />
      <RSVP />

      <footer style={{ padding: '2rem', textAlign: 'center', background: 'var(--color-text)', color: 'white' }}>
        <p className="font-heading text-xl">Thank You</p>
        <p className="text-sm opacity-50 mt-2">© 2026 Made with Love</p>
      </footer>
    </main>
  );
}
