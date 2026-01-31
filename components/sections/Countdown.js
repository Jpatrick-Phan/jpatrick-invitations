'use client';
import { useState, useEffect } from 'react';
import styles from './countdown.module.css';

export default function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className={styles.countdown}>
            <div className={styles.item}>
                <span className={styles.number}>{timeLeft.days}</span>
                <span className={styles.label}>Days</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles.item}>
                <span className={styles.number}>{timeLeft.hours}</span>
                <span className={styles.label}>Hours</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles.item}>
                <span className={styles.number}>{timeLeft.minutes}</span>
                <span className={styles.label}>Mins</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles.item}>
                <span className={styles.number}>{timeLeft.seconds}</span>
                <span className={styles.label}>Secs</span>
            </div>
        </div>
    );
}
