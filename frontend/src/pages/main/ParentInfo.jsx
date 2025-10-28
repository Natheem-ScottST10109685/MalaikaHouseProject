import React, { useEffect } from 'react';

const ParentInformation = () => {
    useEffect(() => {
        const handleAnchorClick = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
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
        <div className="parent-information">
            {/* Header */}
            <header className="header">
                <nav className="nav-container">
                    <a href="index.html" className="logo">
                        <img
                            src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
                            alt="Malaika House Logo"
                        />
                    </a>
                    <ul className="nav-menu">
                        <li className="nav-item"><a href="/">Home</a></li>
                        <li className="nav-item"><a href="/what-we-offer">What We Offer</a></li>
                        <li className="nav-item"><a href="/our-story">Our Story</a></li>
                        <li className="nav-item"><a href="/staff-supporters">Staff & Supporters</a></li>
                        <li className="nav-item"><a href="/parent-info">Parent Information</a></li>
                        <li className="nav-item"><a href="#">Book a Visit</a></li>
                        <li className="nav-item"><a href="/contact-us" className="active">Contact Us</a></li>
                    </ul>
                </nav>
            </header>

            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Parent Information</h1>
                    <p>Everything you need to know about joining the Malaika House community and supporting your child's journey</p>
                </div>
            </section>

            {/* Quick Links */}
            <section className="quick-links">
                <div className="container">
                    <div className="links-grid">
                        <a href="#fees" className="quick-link-card">
                            <div className="link-icon">💰</div>
                            <h3>Fees & Pricing</h3>
                            <p>Transparent pricing for all our programs and services</p>
                        </a>
                        <a href="#application" className="quick-link-card">
                            <div className="link-icon">📝</div>
                            <h3>Application Process</h3>
                            <p>Step-by-step guide to joining our community</p>
                        </a>
                        <a href="#guidelines" className="quick-link-card">
                            <div className="link-icon">📋</div>
                            <h3>Guidelines & Expectations</h3>
                            <p>What to expect and how we work together</p>
                        </a>
                        <a href="#resources" className="quick-link-card">
                            <div className="link-icon">📚</div>
                            <h3>Support Resources</h3>
                            <p>Materials and tools to support your child's journey</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Fees Section */}
            <section className="fees-section" id="fees">
                <div className="container">
                    <h2 className="section-title">Fees & Pricing</h2>
                    <p className="section-subtitle">
                        Flexible pricing options designed to make our programs accessible while ensuring quality support for every learner
                    </p>

                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <div className="pricing-header">
                                <div className="plan-name">Solo Entry</div>
                                <div className="plan-price">R450</div>
                                <div className="plan-period">per session</div>
                            </div>
                            <div className="pricing-content">
                                <ul className="plan-features">
                                    <li>Individual focused session</li>
                                    <li>Personalized attention</li>
                                    <li>Flexible scheduling</li>
                                    <li>Progress tracking</li>
                                    <li>Family consultation included</li>
                                </ul>
                                <a href="book-visit.html" className="plan-cta">Book Session</a>
                            </div>
                        </div>

                        <div className="pricing-card">
                            <div className="featured-badge">Most Popular</div>
                            <div className="pricing-header featured">
                                <div className="plan-name">Party for Two</div>
                                <div className="plan-price">R750</div>
                                <div className="plan-period">per session (2 children)</div>
                            </div>
                            <div className="pricing-content">
                                <ul className="plan-features">
                                    <li>Paired learning experience</li>
                                    <li>Social skill development</li>
                                    <li>Peer interaction opportunities</li>
                                    <li>Shared activities and games</li>
                                    <li>Family support for both families</li>
                                </ul>
                                <a href="book-visit.html" className="plan-cta">Book for Two</a>
                            </div>
                        </div>

                        <div className="pricing-card">
                            <div className="pricing-header">
                                <div className="plan-name">2025 Session Pass</div>
                                <div className="plan-price">R2,200</div>
                                <div className="plan-period">per term (July 22 - Oct)</div>
                            </div>
                            <div className="pricing-content">
                                <ul className="plan-features">
                                    <li>Full term access</li>
                                    <li>Multiple weekly sessions</li>
                                    <li>Priority booking</li>
                                    <li>Comprehensive progress reports</li>
                                    <li>Family support program</li>
                                    <li>Auto-renewal option</li>
                                </ul>
                                <a href="book-visit.html" className="plan-cta">Get Term Pass</a>
                            </div>
                        </div>
                    </div>

                    <div className="payment-info">
                        <h3>Payment & Booking Information</h3>
                        <p>Payments must be processed before booking confirmation</p>
                        <p>Cancellations can be transferred to new sessions</p>
                        <p>Financial assistance available - contact us to discuss options</p>
                    </div>
                </div>
            </section>

            {/* Application Process */}
            <section className="application-section" id="application">
                <div className="container">
                    <h2 className="section-title">Application Process</h2>
                    <p className="section-subtitle">
                        A simple, supportive process designed to ensure the best fit for your child and our community
                    </p>

                    <div className="process-steps">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h4>Contact Us</h4>
                            <p>
                                Reach out via phone, email, or contact form to learn about our programs and ask any questions you have about our approach.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h4>Schedule a Visit</h4>
                            <p>
                                Book a time to visit our facility, meet our team, and see if Malaika House feels like the right fit for your family.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h4>Choose Your Program</h4>
                            <p>
                                Based on your visit and discussion with our team, select the program option that best meets your child's needs and your family's schedule.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h4>Complete Booking</h4>
                            <p>
                                Fill out enrollment forms, process payment, and book your child's first session to begin their journey with us.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guidelines Section */}
            <section className="guidelines-section" id="guidelines">
                <div className="container">
                    <h2 className="section-title">Guidelines & Expectations</h2>
                    <p className="section-subtitle">
                        Our shared commitments to creating a safe, supportive, and effective learning environment
                    </p>

                    <div className="guidelines-grid">
                        <div className="guideline-card">
                            <div className="guideline-icon">🤝</div>
                            <h4>Family Partnership</h4>
                            <ul className="guideline-list">
                                <li>Open communication with staff</li>
                                <li>Regular progress meetings</li>
                                <li>Collaborative goal setting</li>
                                <li>Shared celebration of successes</li>
                                <li>Problem-solving together</li>
                            </ul>
                        </div>

                        <div className="guideline-card">
                            <div className="guideline-icon">📅</div>
                            <h4>Attendance & Scheduling</h4>
                            <ul className="guideline-list">
                                <li>Consistent attendance encouraged</li>
                                <li>24-hour cancellation notice</li>
                                <li>Flexible rescheduling options</li>
                                <li>Term-based planning approach</li>
                                <li>Google Calendar integration</li>
                            </ul>
                        </div>

                        <div className="guideline-card">
                            <div className="guideline-icon">🛡️</div>
                            <h4>Safety & Well-being</h4>
                            <ul className="guideline-list">
                                <li>Physical and emotional safety priority</li>
                                <li>Inclusive, respectful environment</li>
                                <li>Clear behavioral expectations</li>
                                <li>Crisis support protocols</li>
                                <li>Confidentiality maintained</li>
                            </ul>
                        </div>

                        <div className="guideline-card">
                            <div className="guideline-icon">📞</div>
                            <h4>Communication</h4>
                            <ul className="guideline-list">
                                <li>Regular progress updates</li>
                                <li>Multiple communication channels</li>
                                <li>Prompt response to concerns</li>
                                <li>Family education and support</li>
                                <li>Community building opportunities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="resources-section" id="resources">
                <div className="container">
                    <h2 className="section-title">Support Resources</h2>
                    <p className="section-subtitle">
                        Tools, materials, and information to support your child's learning journey at home and beyond
                    </p>

                    <div className="resources-grid">
                        <a href="#" className="resource-card">
                            <div className="resource-icon">📖</div>
                            <h4>Parent Handbook</h4>
                            <p>
                                Comprehensive guide covering our approaches, policies, and practical tips for supporting neurodivergent learners.
                            </p>
                        </a>

                        <a href="#" className="resource-card">
                            <div className="resource-icon">🎯</div>
                            <h4>Learning Activities</h4>
                            <p>
                                Home-based activities and exercises designed to reinforce skills and concepts from our programs.
                            </p>
                        </a>

                        <a href="#" className="resource-card">
                            <div className="resource-icon">🧠</div>
                            <h4>Neurodiversity Information</h4>
                            <p>
                                Educational materials about different learning styles, strengths, and support strategies.
                            </p>
                        </a>

                        <a href="#" className="resource-card">
                            <div className="resource-icon">👥</div>
                            <h4>Community Resources</h4>
                            <p>
                                Directory of local services, support groups, and organizations that serve neurodivergent families.
                            </p>
                        </a>

                        <a href="#" className="resource-card">
                            <div className="resource-icon">📱</div>
                            <h4>Digital Tools</h4>
                            <p>
                                Recommended apps, websites, and digital resources that support learning and development.
                            </p>
                        </a>

                        <a href="#" className="resource-card">
                            <div className="resource-icon">💬</div>
                            <h4>Parent Network</h4>
                            <p>
                                Connect with other Malaika House families for support, friendship, and shared experiences.
                            </p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Malaika House. All rights reserved. | Supporting families on their unique learning journeys.</p>
                </div>
            </footer>
        </div>
    );
};

export default ParentInformation;