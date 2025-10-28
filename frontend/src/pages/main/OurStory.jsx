import React, { useEffect } from 'react';

// OurStory component
export default function OurStory() {
    useEffect(() => {
        // Smooth scrolling for any in-page anchors (replicates original behaviour)
        const anchors = document.querySelectorAll('a[href^="#"]');
        const onClick = (e) => {
            e.preventDefault();
            const target = document.querySelector(e.currentTarget.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        };
        anchors.forEach(a => a.addEventListener('click', onClick));

        return () => anchors.forEach(a => a.removeEventListener('click', onClick));
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <header className="header bg-white shadow-sm">
                <nav className="nav-container container mx-auto flex items-center justify-between p-4">
                    <a href="/" className="logo inline-flex items-center">
                        <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" className="h-10" />
                    </a>
                    <ul className="nav-menu flex gap-4">
                        <li><a href="/home" className="hover:underline">Home</a></li>
                        <li><a href="/what-we-offer" className="hover:underline">What We Offer</a></li>
                        <li><a href="/our-story" className="font-semibold">Our Story</a></li>
                        <li><a href="/staff-supporters" className="hover:underline">Staff & Supporters</a></li>
                        <li><a href="/parent-information" className="hover:underline">Parent Information</a></li>
                        <li><a href="/book-a-visit" className="hover:underline">Book a Visit</a></li>
                        <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="story-hero bg-indigo-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold">Our Story</h1>
                        <p className="mt-3 max-w-2xl mx-auto">Born from a vision to create inclusive spaces where neurodivergent learners can thrive, Malaika House represents hope, community, and the power of heart-centered education</p>
                    </div>
                </section>

                <section className="mission-section py-12">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
                        <div className="mission-text">
                            <h2 className="text-2xl font-semibold">Our Mission</h2>
                            <p className="mt-3">At Malaika House, we believe that every child deserves an education that honors their unique way of learning and being in the world. Our mission is to create inclusive, supportive environments where neurodivergent learners can discover their strengths, build confidence, and develop the skills they need to thrive.</p>
                            <p className="mt-2">We focus on the heart – not just academic achievement, but emotional intelligence, empathy, and the profound connections that make learning meaningful.</p>
                        </div>
                        <div className="mission-visual bg-white p-6 rounded shadow text-center">
                            <div className="heart-icon text-5xl">♥</div>
                            <h3 className="mt-2 font-semibold">Heart-Focused Learning</h3>
                            <p className="mt-2 text-sm">We put relationships, understanding, and emotional well-being at the center of everything we do.</p>
                        </div>
                    </div>
                </section>

                <section className="values-section py-12 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-semibold">Our Core Values</h2>
                        <p className="text-slate-600">These principles guide every decision we make and every interaction we have with learners, families, and our community</p>

                        <div className="values-grid grid md:grid-cols-3 gap-6 mt-6">
                            <div className="value-card bg-white p-4 rounded shadow text-center">
                                <div className="value-icon text-3xl">🌈</div>
                                <h3 className="mt-2 font-semibold">Celebrate Diversity</h3>
                                <p className="mt-2 text-sm">We embrace neurodiversity as a natural and valuable part of human experience.</p>
                            </div>
                            <div className="value-card bg-white p-4 rounded shadow text-center">
                                <div className="value-icon text-3xl">🤝</div>
                                <h3 className="mt-2 font-semibold">Build Connection</h3>
                                <p className="mt-2 text-sm">Meaningful relationships are the foundation of learning.</p>
                            </div>
                            <div className="value-card bg-white p-4 rounded shadow text-center">
                                <div className="value-icon text-3xl">🌱</div>
                                <h3 className="mt-2 font-semibold">Foster Growth</h3>
                                <p className="mt-2 text-sm">We believe in the potential of every learner and create environments that nurture growth.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="journey-section py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-semibold">Our Journey</h2>
                        <p className="text-slate-600">The evolution of Malaika House from vision to thriving community</p>

                        <div className="timeline-container mt-6">
                            {/* Simple vertical timeline — can be replaced with a JS-driven carousel if desired */}
                            <div className="timeline space-y-6">
                                <div className="timeline-item bg-white p-4 rounded shadow">
                                    <div className="timeline-year font-bold">2020</div>
                                    <h4 className="mt-1 font-semibold">The Vision Begins</h4>
                                    <p className="mt-2 text-sm">Recognizing the gap in support for neurodivergent learners, our founders began developing the concept of heart-focused education.</p>
                                </div>
                                <div className="timeline-item bg-white p-4 rounded shadow">
                                    <div className="timeline-year font-bold">2021</div>
                                    <h4 className="mt-1 font-semibold">Community Building</h4>
                                    <p className="mt-2 text-sm">We started building relationships with families, educators, and support professionals who shared our vision.</p>
                                </div>
                                <div className="timeline-item bg-white p-4 rounded shadow">
                                    <div className="timeline-year font-bold">2022</div>
                                    <h4 className="mt-1 font-semibold">First Programs Launch</h4>
                                    <p className="mt-2 text-sm">Our initial pilot programs began, serving a small group of learners while we refined our approaches.</p>
                                </div>
                                {/* Continue timeline items as needed... */}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="approach-section py-12 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-semibold">Our Approach</h2>
                        <div className="approach-grid grid md:grid-cols-3 gap-6 mt-6">
                            <div className="approach-item bg-white p-4 rounded shadow text-center">
                                <div className="approach-number text-2xl font-bold">1</div>
                                <h4 className="mt-2 font-semibold">Assessment &amp; Understanding</h4>
                                <p className="mt-2 text-sm">We take time to truly understand each learner's strengths and interests through relationship-based assessment.</p>
                            </div>
                            <div className="approach-item bg-white p-4 rounded shadow text-center">
                                <div className="approach-number text-2xl font-bold">2</div>
                                <h4 className="mt-2 font-semibold">Personalized Planning</h4>
                                <p className="mt-2 text-sm">We develop individualized plans that build on strengths while addressing goals.</p>
                            </div>
                            <div className="approach-item bg-white p-4 rounded shadow text-center">
                                <div className="approach-number text-2xl font-bold">3</div>
                                <h4 className="mt-2 font-semibold">Relationship Building</h4>
                                <p className="mt-2 text-sm">Strong, trusting relationships with staff and peers form the foundation for learning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="team-preview py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-semibold">Meet Our Team</h2>
                        <p className="mt-2 text-sm">Our passionate, dedicated staff bring together expertise in education, psychology, therapy, and family support.</p>
                        <a href="/staff" className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Meet Our Staff &amp; Supporters</a>
                    </div>
                </section>
            </main>

            <footer className="footer bg-slate-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2025 Malaika House. All rights reserved. | Building inclusive futures through heart-focused education.</p>
                </div>
            </footer>
        </div>
    );
}
