import styles from "./hero.module.css";
import Image from "next/image";

export default function Hero({ data }) {
    if (!data) return null;

    return (
        <section className={styles.hero}>
            {/* Background Image - Absolute */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                {/* Placeholder for now if no image is generated yet. 
             If data.image exists, use it. */ }
                {data.image && (
                    <Image
                        src={data.image}
                        alt="Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        className={styles.bgImage}
                    />
                )}
            </div>

            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <p className={styles.intro}>{data.title}</p>
                <h1 className={styles.names}>{data.names}</h1>
                <p className={styles.date}>{data.date}</p>
            </div>

            <div className={styles.scrollDown}>
                SCROLL DOWN
            </div>
        </section>
    );
}
