import React, { useEffect } from 'react';

const StaffSupporters = () => {
    useEffect(() => {
        // Smooth scrolling for navigation
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

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };
    }, []);

    return (
        <div className="staff-supporters">
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
                            <li><a href="Home Page.html" className="nav-link">Home</a></li>
                            <li><a href="What We Offer.html" className="nav-link">What We Offer</a></li>
                            <li><a href="Our Story.html" className="nav-link">Our Story</a></li>
                            <li><a href="Staff Supporters.html" className="nav-link">Staff & Supporters</a></li>
                            <li><a href="Parent Information.html" className="nav-link">Parent Information</a></li>
                            <li><a href="Book a Visit.html" className="nav-link">Book a Visit</a></li>
                            <li><a href="Contact us.html" className="nav-link active">Contact Us</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Our Team & Supporters</h1>
                    <p>Meet the passionate individuals and organizations who make our heart-focused mission possible</p>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="leadership-section">
                <div className="container">
                    <h2>Leadership Team</h2>
                    <p className="section-description">
                        Our founders and leaders who guide Malaika House with vision, expertise, and unwavering commitment to neurodivergent learners
                    </p>

                    <div className="leadership-grid">
                        <div className="leader-card">
                            <div className="leader-header">
                                <div className="leader-avatar amarta">A</div>
                                <div>
                                    <div className="leader-name">Amarta</div>
                                    <div className="leader-title">Co-Founder & Director</div>
                                </div>
                            </div>
                            <p className="leader-bio">
                                Amarta brings years of experience in education and a deep passion for creating inclusive learning environments. Her vision for heart-focused education has been the driving force behind Malaika House's development.
                            </p>
                            <ul className="leader-credentials">
                                <li>Educational Leadership Certification</li>
                                <li>Neurodiversity Training Specialist</li>
                                <li>Content Management & Curriculum Development</li>
                                <li>Community Partnership Building</li>
                            </ul>
                        </div>

                        <div className="leader-card">
                            <div className="leader-header">
                                <div className="leader-avatar elria">E</div>
                                <div>
                                    <div className="leader-name">Elria</div>
                                    <div className="leader-title">Co-Founder & Creative Director</div>
                                </div>
                            </div>
                            <p className="leader-bio">
                                Elria leads our branding, design, and creative initiatives while also managing content and events. Her artistic vision ensures that every aspect of Malaika House reflects our values and mission.
                            </p>
                            <ul className="leader-credentials">
                                <li>Brand Development & Design Leadership</li>
                                <li>Event Management & Coordination</li>
                                <li>Creative Content Development</li>
                                <li>Supporter Relations & Acknowledgments</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Staff Section */}
            <section className="staff-section">
                <div className="container">
                    <h2>Our Facilitators & Staff</h2>
                    <p className="section-description">
                        Dedicated professionals who bring expertise, compassion, and creativity to every interaction with our learners and families
                    </p>

                    <div className="staff-grid">
                        <div className="staff-card">
                            <div className="staff-icon">👨‍🏫</div>
                            <div className="staff-content">
                                <div className="staff-name">Lead Learning Facilitator</div>
                                <div className="staff-role">Heart Program Specialist</div>
                                <p className="staff-description">
                                    Specialized in neurodivergent learning approaches with extensive experience in personalized education and social-emotional development.
                                </p>
                                <div className="staff-tags">
                                    <span className="tag tag-blue">Autism Support</span>
                                    <span className="tag tag-blue">ADHD Strategies</span>
                                    <span className="tag tag-blue">Social Skills</span>
                                </div>
                            </div>
                        </div>

                        <div className="staff-card">
                            <div className="staff-icon">👩‍💼</div>
                            <div className="staff-content">
                                <div className="staff-name">Family Support Coordinator</div>
                                <div className="staff-role">Parent & Community Liaison</div>
                                <p className="staff-description">
                                    Dedicated to building strong relationships with families and providing resources and guidance throughout the learning journey.
                                </p>
                                <div className="staff-tags">
                                    <span className="tag tag-green">Family Counseling</span>
                                    <span className="tag tag-green">Resource Navigation</span>
                                    <span className="tag tag-green">Community Building</span>
                                </div>
                            </div>
                        </div>

                        <div className="staff-card">
                            <div className="staff-icon">👨‍🎨</div>
                            <div className="staff-content">
                                <div className="staff-name">Creative Arts Facilitator</div>
                                <div className="staff-role">Clubs & Activities Coordinator</div>
                                <p className="staff-description">
                                    Brings creativity and play into learning through art, music, drama, and hands-on activities that engage and inspire.
                                </p>
                                <div className="staff-tags">
                                    <span className="tag tag-purple">Art Therapy</span>
                                    <span className="tag tag-purple">Music Integration</span>
                                    <span className="tag tag-purple">Creative Expression</span>
                                </div>
                            </div>
                        </div>

                        <div className="staff-card">
                            <div className="staff-icon">👩‍⚕️</div>
                            <div className="staff-content">
                                <div className="staff-name">Behavioral Support Specialist</div>
                                <div className="staff-role">Therapeutic Services</div>
                                <p className="staff-description">
                                    Provides behavioral support and therapeutic interventions to help learners develop coping strategies and self-regulation skills.
                                </p>
                                <div className="staff-tags">
                                    <span className="tag tag-pink">Behavioral Analysis</span>
                                    <span className="tag tag-pink">Self-Regulation</span>
                                    <span className="tag tag-pink">Therapeutic Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="partners-section">
                <div className="container">
                    <h2>Our Partners & Collaborators</h2>
                    <p className="section-description">
                        Working together with trusted organizations to expand opportunities and support for our community
                    </p>

                    <div className="partners-grid">
                        <div className="partner-card">
                            <div className="partner-icon">🧩</div>
                            <div className="partner-name">Square Peg</div>
                            <p className="partner-description">Partnering to provide specialized programs for kids, teens, and adults in the neurodivergent community.</p>
                        </div>

                        <div className="partner-card">
                            <div className="partner-icon">🎫</div>
                            <div className="partner-name">Quicket Club</div>
                            <p className="partner-description">Special events and ticketed activities that provide unique experiences for our learners.</p>
                        </div>

                        <div className="partner-card">
                            <div className="partner-icon">🤝</div>
                            <div className="partner-name">Team WIL Project</div>
                            <p className="partner-description">Collaborative initiatives for neurodiversity training, fundraising, and community awareness.</p>
                        </div>

                        <div className="partner-card">
                            <div className="partner-icon">💰</div>
                            <div className="partner-name">BackaBuddy</div>
                            <p className="partner-description">Fundraising platform supporting our mission and helping us reach more families in need.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supporters Section */}
            <section className="supporters-section">
                <div className="container">
                    <h2>Our Supporters & Sponsors</h2>
                    <p className="section-description">
                        We are grateful to the individuals and organizations who believe in our mission and support our work
                    </p>

                    <div className="supporters-grid">
                        <div className="supporter-card">
                            <div className="supporter-icon">💼</div>
                            <div className="supporter-name">Corporate Sponsor A</div>
                            <div className="supporter-tier">Major Sponsor</div>
                            <p className="supporter-description">Providing significant funding support for our Heart Program and facility operations.</p>
                        </div>

                        <div className="supporter-card">
                            <div className="supporter-icon">🏫</div>
                            <div className="supporter-name">Educational Foundation</div>
                            <div className="supporter-tier">Grant Provider</div>
                            <p className="supporter-description">Supporting our research and development of innovative neurodivergent learning approaches.</p>
                        </div>

                        <div className="supporter-card">
                            <div className="supporter-icon">❤️</div>
                            <div className="supporter-name">Community Champions</div>
                            <div className="supporter-tier">Individual Donors</div>
                            <p className="supporter-description">Dedicated individuals who contribute regularly to support our mission and programs.</p>
                        </div>

                        <div className="supporter-card">
                            <div className="supporter-icon">🏪</div>
                            <div className="supporter-name">Local Business Network</div>
                            <div className="supporter-tier">In-Kind Supporters</div>
                            <p className="supporter-description">Providing services, supplies, and resources that help us operate efficiently.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <h2>What Our Community Says</h2>
                    <p className="section-description">
                        Hear from families, partners, and supporters who have experienced the Malaika House difference
                    </p>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "The team at Malaika House truly understands our child's needs. Their heart-focused approach has made such a difference in his confidence and learning."
                            </p>
                            <div className="testimonial-author">Sarah M.</div>
                            <div className="testimonial-role">Parent of Heart Program Member</div>
                        </div>

                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "Working with Malaika House has been incredible. Their commitment to inclusive, personalized education aligns perfectly with our values."
                            </p>
                            <div className="testimonial-author">Dr. James L.</div>
                            <div className="testimonial-role">Educational Consultant</div>
                        </div>

                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "As a partner organization, we've seen firsthand how Malaika House creates positive change in the lives of neurodivergent learners and their families."
                            </p>
                            <div className="testimonial-author">Maria K.</div>
                            <div className="testimonial-role">Square Peg Representative</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Team Section */}
            <section className="join-section">
                <div className="container">
                    <h2>Join Our Team</h2>
                    <p className="join-description">
                        Are you passionate about neurodivergent education and heart-focused learning? We're always looking for dedicated individuals who share our vision and values.
                    </p>
                    <a href="contact.html" className="btn btn-primary">
                        Get In Touch
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Malaika House. All rights reserved. | Powered by passionate people who believe in every learner's potential.</p>
                </div>
            </footer>
        </div>
    );
};

export default StaffSupporters;