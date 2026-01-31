'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';
import { X } from 'lucide-react';

export default function Gallery({ data }) {
    const [selectedImage, setSelectedImage] = useState(null);

    // If data.items exists, use it. Otherwise empty array.
    // data.items should be array of { url: string, caption: string }
    const galleryItems = data?.items || [];

    // For grid display, we map galleryItems to just URL if needed, 
    // but the component code below used simple string array `displayImages`.
    // I will refactor to use objects or strings.

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Unforgettable Moments</h2>

            <div className={styles.grid}>
                {galleryItems.map((item, index) => (
                    <div key={index} className={styles.imageWrapper} onClick={() => setSelectedImage(item.url)}>
                        <Image
                            src={item.url}
                            alt={item.caption || `Gallery ${index}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            className={styles.image}
                        />
                        <div className={styles.overlay}>
                            <span>View</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
                    <div className={styles.closeBtn}>
                        <X size={32} color="white" />
                    </div>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage}
                            alt="Selected"
                            width={800}
                            height={600}
                            style={{ objectFit: 'contain', maxWidth: '90vw', maxHeight: '90vh' }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
