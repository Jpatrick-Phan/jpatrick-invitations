'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import styles from './rsvp.module.css';

export default function RSVP() {
    const [activeTab, setActiveTab] = useState('rsvp');

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'rsvp' ? styles.active : ''}`}
                        onClick={() => setActiveTab('rsvp')}
                    >
                        RSVP
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'wishes' ? styles.active : ''}`}
                        onClick={() => setActiveTab('wishes')}
                    >
                        Wishes & Gift
                    </button>
                </div>

                <Card className="w-full max-w-md mx-auto border-none shadow-xl bg-white/90 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-center font-heading text-3xl text-primary">
                            {activeTab === 'rsvp' ? 'Will You Join Us?' : 'Send Your Love'}
                        </CardTitle>
                        <CardDescription className="text-center">
                            {activeTab === 'rsvp'
                                ? "Please confirm your attendance by December 1st."
                                : "Your presence is enough, but if you wish to give a gift..."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {activeTab === 'rsvp' ? (
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input id="name" placeholder="Enter your full name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="guests">Number of Guests</Label>
                                    <Input id="guests" type="number" min="1" placeholder="1" />
                                </div>
                                <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold py-2">
                                    Confirm Attendance
                                </Button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center space-y-2">
                                    <p className="font-semibold">Banking Information</p>
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <p className="font-mono text-lg">1234 5678 9012</p>
                                        <p className="text-sm text-gray-500">Bank of America</p>
                                        <p className="text-sm text-gray-500">Sarah Johnson</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => alert('Copied!')}>
                                        Copy Number
                                    </Button>
                                </div>

                                <div className="border-t pt-4">
                                    <Label>Or leave a message</Label>
                                    <Textarea className="mt-2" placeholder="Write your congratulations..." />
                                    <Button className="w-full mt-4 bg-[var(--color-primary)] text-white">
                                        Send Message
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
