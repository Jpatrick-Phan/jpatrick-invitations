'use client';
import { useRef, useEffect } from 'react';
import styles from "./story.module.css";

export default function Story({ data }) {
    // Adapter for legacy array vs new object structure
    const items = Array.isArray(data) ? data : (data?.items || []);

    if (!items || items.length === 0) return null;

    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                }
            });
        }, { threshold: 0.2 });

        const items = document.querySelectorAll(`.${styles.item}`);
        items.forEach((item) => observerRef.current.observe(item));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [items]);

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Our Story</h2>
            <div className={styles.timeline}>
                {items.map((item, index) => (
                    <div key={index} className={`${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}>
                        <div className={styles.content}>
                            <span className={styles.year}>{item.year}</span>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
