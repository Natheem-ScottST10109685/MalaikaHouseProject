import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        const onClick = (e) => {
            e.preventDefault();
            const target = document.querySelector(e.currentTarget.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        };
        anchors.forEach(a => a.addEventListener('click', onClick));

        return () => anchors.forEach(a => a.removeEventListener('click', onClick));
    }, []);

    function activateTextToSpeech() {
        alert('Text-to-speech activated! Click on any text to hear it read aloud.');
    }

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <header className="header bg-white shadow-sm">
                <nav className="nav-container container mx-auto flex items-center justify-between p-4">
                    <a href="/" className="logo inline-flex items-center">
                        <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" className="h-10" />
                    </a>
                    <ul className="nav-menu flex gap-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/what-we-offer" className="hover:underline">What We Offer</a></li>
                        <li><a href="/our-story" className="hover:underline">Our Story</a></li>
                        <li><a href="/staff-supporters" className="hover:underline">Staff & Supporters</a></li>
                        <li><a href="/parent-info" className="hover:underline">Parent Information</a></li>
                        <li><a href="/book-a-visit" className="hover:underline">Book a Visit</a></li>
                        <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
                    </ul>
                    <div className="search-container">
                        <input type="text" className="search-bar border rounded px-2 py-1" placeholder="Search..." />
                        <button className="search-btn ml-2">🔍</button>
                    </div>
                </nav>
            </header>

            <div className="accessibility-bar bg-slate-100 py-2">
                <div className="container mx-auto px-4 flex items-center gap-3">
                    <span>Accessibility:</span>
                    <button className="accessibility-btn px-3 py-1 border rounded" onClick={activateTextToSpeech}>🔊 Text-to-Speech</button>
                    <button className="accessibility-btn px-3 py-1 border rounded" onClick={() => document.body.classList.toggle('high-contrast')}>🎨 High Contrast</button>
                    <button className="accessibility-btn px-3 py-1 border rounded" onClick={() => { const currentSize = parseFloat(window.getComputedStyle(document.body).fontSize); document.body.style.fontSize = (currentSize + 2) + 'px'; }}>🔍 Text Size</button>
                </div>
            </div>

            <section id="home" className="hero bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-20">
                <div className="hero-content container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold">Heart-Focused Learning & Support</h1>
                    <p className="mt-4 max-w-2xl mx-auto">Empowering neurodivergent learners through inclusive, accessible programs designed to nurture every child's unique potential</p>
                    <div className="cta-buttons mt-6 flex justify-center gap-4">
                        <a href="#heart-program" className="cta-btn cta-primary bg-white text-indigo-600 px-4 py-2 rounded font-semibold">Join Heart Program</a>
                        <a href="#malaika-house" className="cta-btn cta-secondary border border-white text-white px-4 py-2 rounded">Explore Malaika House</a>
                    </div>
                </div>
            </section>

            <section className="about-section py-12">
                <div className="container mx-auto px-4">
                    <h2 className="section-title text-2xl font-semibold">About Malaika House</h2>
                    <p className="section-subtitle text-slate-600">We believe every child deserves support that honors their unique learning style and celebrates their individual strengths</p>

                    <div className="features-grid grid md:grid-cols-3 gap-4 mt-6">
                        <div className="feature-card border rounded-lg p-4 text-center">
                            <div className="feature-icon text-3xl">♥</div>
                            <h3 className="mt-2 font-semibold">Heart-Centered Approach</h3>
                            <p className="mt-2 text-sm">Our programs focus on emotional intelligence, empathy, and building meaningful connections while supporting academic growth.</p>
                        </div>
                        <div className="feature-card border rounded-lg p-4 text-center">
                            <div className="feature-icon text-3xl">🌈</div>
                            <h3 className="mt-2 font-semibold">Inclusive Environment</h3>
                            <p className="mt-2 text-sm">We celebrate neurodiversity and create spaces where every learner feels valued, understood, and supported.</p>
                        </div>
                        <div className="feature-card border rounded-lg p-4 text-center">
                            <div className="feature-icon text-3xl">🎯</div>
                            <h3 className="mt-2 font-semibold">Personalized Learning</h3>
                            <p className="mt-2 text-sm">Tailored programs that adapt to each child's unique needs, interests, and learning preferences.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="programs-section py-12 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="section-title text-2xl font-semibold">Our Programs</h2>
                    <p className="section-subtitle text-slate-600">Comprehensive support through specialized programs and inclusive club activities</p>

                    <div className="programs-grid grid md:grid-cols-2 gap-6 mt-6">
                        <div className="program-card border rounded-lg p-4">
                            <div className="program-header">
                                <h3 className="font-semibold">Heart Program</h3>
                                <p className="text-sm text-slate-500">Exclusive Membership Program</p>
                            </div>
                            <div className="program-content mt-3">
                                <p className="text-sm">Our flagship program designed for neurodivergent learners, offering specialized support and resources.</p>
                                <ul className="program-features list-disc pl-5 mt-2 text-sm space-y-1">
                                    <li>Everyone & Anyone sessions</li>
                                    <li>Malaika House Morning Sessions</li>
                                    <li>Personalized learning plans</li>
                                    <li>Family support resources</li>
                                    <li>Progress tracking and reporting</li>
                                </ul>
                                <a href="#" className="inline-block mt-4 bg-indigo-600 text-white px-3 py-2 rounded">Learn More</a>
                            </div>
                        </div>

                        <div className="program-card border rounded-lg p-4">
                            <div className="program-header">
                                <h3 className="font-semibold">Club Programs</h3>
                                <p className="text-sm text-slate-500">Internal & External Partnerships</p>
                            </div>
                            <div className="program-content mt-3">
                                <p className="text-sm">Diverse club activities that build social skills, explore interests, and create community connections.</p>
                                <ul className="program-features list-disc pl-5 mt-2 text-sm space-y-1">
                                    <li>Dungeons & Dragons Club</li>
                                    <li>Adventure Sessions</li>
                                    <li>Curiosity Club</li>
                                    <li>Square Peg Clubs</li>
                                    <li>Quicket Club Partnership</li>
                                </ul>
                                <a href="#" className="inline-block mt-4 bg-indigo-600 text-white px-3 py-2 rounded">Explore Clubs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section py-12 bg-indigo-700 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="section-title text-2xl font-semibold">Get In Touch</h2>
                    <p className="section-subtitle text-indigo-100">Ready to start your journey with Malaika House? We're here to help.</p>

                    <div className="contact-grid grid md:grid-cols-3 gap-4 mt-6">
                        <div className="contact-card bg-indigo-600 rounded-lg p-4 text-center">
                            <h4 className="font-semibold">Visit Us</h4>
                            <p className="mt-2 text-sm">Schedule a visit to see our facilities and meet our team. We offer both on-site and online consultation options.</p>
                        </div>
                        <div className="contact-card bg-indigo-600 rounded-lg p-4 text-center">
                            <h4 className="font-semibold">Get Information</h4>
                            <p className="mt-2 text-sm">Have questions about our programs, fees, or application process? Contact us for detailed information.</p>
                        </div>
                        <div className="contact-card bg-indigo-600 rounded-lg p-4 text-center">
                            <h4 className="font-semibold">Join Our Community</h4>
                            <p className="mt-2 text-sm">Subscribe to our newsletter for updates on events, new programs, and success stories from our community.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer bg-slate-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <div className="footer-links flex justify-center gap-4 mb-2">
                        <a href="#privacy" className="underline">Privacy Policy</a>
                        <a href="#terms" className="underline">Terms of Service</a>
                        <a href="#accessibility" className="underline">Accessibility</a>
                        <a href="#support" className="underline">Support</a>
                    </div>
                    <p>&copy; 2025 Malaika House. All rights reserved. | Heart-focused learning for every child.</p>
                </div>
            </footer>
        </div>
    );
}
