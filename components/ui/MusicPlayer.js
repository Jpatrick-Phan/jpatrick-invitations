'use client';
import { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';

export default function MusicPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Attempt auto-play on mount (often blocked by browsers without interaction)
    useEffect(() => {
        if (src && audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, [src]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    if (!src) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop>
                <source src={src} type="audio/mp3" />
            </audio>

            <button
                onClick={togglePlay}
                className={`
            w-12 h-12 flex items-center justify-center rounded-full shadow-2xl border-2 border-white/50 backdrop-blur-md transition-all duration-300
            ${isPlaying ? 'bg-[var(--color-primary)] text-white scale-110 animate-spin-slow' : 'bg-white/80 text-[var(--color-primary)] hover:scale-105'}
        `}
                aria-label="Toggle Music"
            >
                {isPlaying ? <Pause size={20} /> : <Music size={20} />}
            </button>

            {/* Ripple effect when playing */}
            {isPlaying && (
                <span className="absolute -inset-2 rounded-full bg-[var(--color-primary)] opacity-30 animate-ping"></span>
            )}
        </div>
    );
}
