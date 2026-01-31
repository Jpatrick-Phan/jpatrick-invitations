import styles from "./eventDetails.module.css";
import Countdown from "./Countdown";

export default function EventDetails({ data, heroDate }) {
    if (!data) return null;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Save The Date</h2>

            <div className={styles.card}>
                <div className={styles.infoBlock}>
                    <h3 className={styles.subtitle}>When</h3>
                    <p className={styles.text}>{heroDate}</p>
                    <p className={styles.text}>{data.time}</p>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.infoBlock}>
                    <h3 className={styles.subtitle}>Where</h3>
                    <p className={styles.text}>{data.location}</p>
                    <a href={data.mapUrl} target="_blank" className={styles.mapLink}>
                        View Map
                    </a>
                </div>
            </div>

            <Countdown targetDate={heroDate} />
        </section>
    );
}
