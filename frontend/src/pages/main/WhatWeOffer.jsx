import React, { useEffect, useRef } from 'react';

const WhatWeOffer = () => {
    const observerRef = useRef(null);

    useEffect(() => {
        const handleAnchorClick = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.club-category, .session-card, .program-feature').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observerRef.current.observe(card);
        });

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div className="what-we-offer">
            {/* Header */}
            <header className="header">
                <nav className="nav">
                    <div className="nav-container">
                        <a href="index.html" className="logo-link">
                            <img
                                src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
                                alt="Malaika House Logo"
                                className="logo"
                            />
                        </a>

                        <ul className="nav-menu">
                            <li><a href="/" className="nav-link">Home</a></li>
                            <li><a href="/what-we-offer" className="nav-link">What We Offer</a></li>
                            <li><a href="/our-story" className="nav-link">Our Story</a></li>
                            <li><a href="/staff-supporters" className="nav-link">Staff & Supporters</a></li>
                            <li><a href="/parent-info" className="nav-link">Parent Information</a></li>
                            <li><a href="#" className="nav-link">Book a Visit</a></li>
                            <li><a href="/contact-us" className="nav-link active">Contact Us</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>What We Offer</h1>
                    <p>
                        Comprehensive programs and services designed to support neurodivergent learners and their families
                        through every step of their journey
                    </p>
                </div>
            </section>

            {/* Heart Program Section */}
            <section className="heart-program-section">
                <div className="container">
                    <div className="heart-program-content">
                        <h2>Heart Program - Exclusive Membership</h2>
                        <p className="section-description">
                            Our flagship program provides comprehensive support for neurodivergent learners through personalized
                            approaches and inclusive community building
                        </p>

                        <div className="program-features-grid">
                            <div className="program-feature">
                                <span className="feature-icon">👥</span>
                                <h4>Everyone & Anyone</h4>
                                <p>Open enrollment sessions welcoming all learners regardless of background or ability</p>
                            </div>
                            <div className="program-feature">
                                <span className="feature-icon">🌅</span>
                                <h4>Morning Sessions</h4>
                                <p>Specialized morning programs designed specifically for our student members</p>
                            </div>
                            <div className="program-feature">
                                <span className="feature-icon">📋</span>
                                <h4>Individual Plans</h4>
                                <p>Customized learning and support plans tailored to each child's unique needs</p>
                            </div>
                            <div className="program-feature">
                                <span className="feature-icon">👨‍👩‍👧‍👦</span>
                                <h4>Family Support</h4>
                                <p>Resources and guidance for families navigating neurodivergent learning</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clubs Section */}
            <section className="clubs-section">
                <div className="container">
                    <h2>Club Programs</h2>
                    <p className="section-description">
                        Diverse activities that foster social connections, explore interests, and build
                        confidence in supportive environments
                    </p>

                    <div className="clubs-grid">
                        <div className="club-category">
                            <h3>Internal Clubs</h3>
                            <p className="club-description">
                                Clubs managed directly by Malaika House staff, designed to align with our heart-focused approach
                            </p>
                            <ul className="club-list">
                                <li>
                                    <div className="club-name">Dungeons & Dragons Club</div>
                                    <div className="club-detail">Fantasy role-playing that builds creativity and social skills</div>
                                </li>
                                <li>
                                    <div className="club-name">Adventure Sessions</div>
                                    <div className="club-detail">Outdoor and experiential learning opportunities</div>
                                </li>
                                <li>
                                    <div className="club-name">Curiosity Club</div>
                                    <div className="club-detail">Science, exploration, and discovery-based activities</div>
                                </li>
                                <li>
                                    <div className="club-name">Morning Circle Time</div>
                                    <div className="club-detail">Daily community building and emotional check-ins</div>
                                </li>
                            </ul>
                        </div>

                        <div className="club-category">
                            <h3>External Partner Clubs</h3>
                            <p className="club-description">
                                Collaborations with trusted partner organizations to expand opportunities for our learners
                            </p>
                            <ul className="club-list">
                                <li>
                                    <div className="club-name">Square Peg Kids Club</div>
                                    <div className="club-detail">Specialized programs for neurodivergent children</div>
                                </li>
                                <li>
                                    <div className="club-name">Square Peg Teens Club</div>
                                    <div className="club-detail">Teen-focused activities and social development</div>
                                </li>
                                <li>
                                    <div className="club-name">Adult Square Pegs Club</div>
                                    <div className="club-detail">Support and activities for neurodivergent adults</div>
                                </li>
                                <li>
                                    <div className="club-name">Quicket Club Partnership</div>
                                    <div className="club-detail">Special events and ticketed activities</div>
                                </li>
                            </ul>
                        </div>

                        <div className="club-category">
                            <h3>Team WIL Integration</h3>
                            <p className="club-description">
                                Connecting with broader community initiatives and learning opportunities
                            </p>
                            <ul className="club-list">
                                <li>
                                    <div className="club-name">Neurodiversity Training</div>
                                    <div className="club-detail">Educational workshops and awareness sessions</div>
                                </li>
                                <li>
                                    <div className="club-name">Community Fundraising</div>
                                    <div className="club-detail">BackaBuddy and other fundraising initiatives</div>
                                </li>
                                <li>
                                    <div className="club-name">Google Docs Integration</div>
                                    <div className="club-detail">Digital collaboration and documentation</div>
                                </li>
                                <li>
                                    <div className="club-name">Forms Management</div>
                                    <div className="club-detail">Streamlined registration and communication</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Malaika House Sessions */}
            <section className="sessions-section">
                <div className="container">
                    <h2>Malaika House Sessions</h2>
                    <p className="section-description">
                        Flexible session options designed to meet diverse scheduling needs and learning preferences
                    </p>

                    <div className="sessions-grid">
                        <div className="session-card">
                            <h4>Solo Entry Sessions</h4>
                            <p className="session-description">Individual focused sessions for personalized attention and support</p>
                            <ul className="session-benefits">
                                <li>One-on-one attention</li>
                                <li>Customized pace and approach</li>
                                <li>Flexible scheduling</li>
                                <li>Progress tracking</li>
                            </ul>
                        </div>

                        <div className="session-card">
                            <h4>Party for Two</h4>
                            <p className="session-description">Paired learning sessions that encourage peer interaction and collaborative skills</p>
                            <ul className="session-benefits">
                                <li>Social skill development</li>
                                <li>Peer learning opportunities</li>
                                <li>Shared experiences</li>
                                <li>Friendship building</li>
                            </ul>
                        </div>

                        <div className="session-card">
                            <h4>2025 Session Pass</h4>
                            <p className="session-description">Full-term access providing comprehensive support throughout the school term</p>
                            <ul className="session-benefits">
                                <li>July 22 - October term</li>
                                <li>Multiple weekly sessions</li>
                                <li>Priority booking</li>
                                <li>Family support included</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Join Our Community?</h2>
                    <p>
                        Take the first step towards a supportive, inclusive learning environment where your child can thrive.
                        We're here to answer your questions and help you find the right program fit.
                    </p>
                    <div className="cta-buttons">
                        <a href="book-visit.html" className="btn btn-primary">
                            Book a Visit
                        </a>
                        <a href="contact.html" className="btn btn-secondary">
                            Get Information
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Malaika House. All rights reserved. | Empowering neurodivergent learners with heart-focused programs.</p>
                </div>
            </footer>
        </div>
    );
};

export default WhatWeOffer;