"use client";

import { useState } from 'react';
import { useTextContent } from '@/lib/TextContentContext';

export default function Contact() {
    const { textContent } = useTextContent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.trim().length > 100) {
            newErrors.name = 'Name must be less than 100 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        } else if (formData.message.trim().length > 5000) {
            newErrors.message = 'Message must be less than 5000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('idle');
        setErrorMessage('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', company: '', message: '' });
                setErrors({});

                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 5000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-cream relative overflow-hidden scroll-mt-20">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-brand-deep/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-xs sm:text-sm mb-4 sm:mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                        <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
                        {textContent.contactBadge || "Let's Connect"}
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-brand-deep mb-4 sm:mb-6">
                        {textContent.contactTitle}
                        <span className="block text-brand-gold italic">{textContent.contactSubtitle}</span>
                    </h2>
                    <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto mb-6 sm:mb-8"></div>
                    <p className="text-base sm:text-lg md:text-xl text-brand-deep/80 max-w-2xl sm:max-w-3xl mx-auto">
                        {textContent.contactDescription}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-brand-gold/10">
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-deep mb-4 sm:mb-6">{textContent.contactFormTitle || 'Send a Message'}</h3>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl animate-fade-in">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    {textContent.contactSuccessMessage || 'Thank you! Your message has been sent successfully.'}
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl animate-fade-in">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {errorMessage || textContent.contactErrorMessage || 'Sorry, there was an error sending your message. Please try again.'}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                            <fieldset className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <legend className="sr-only">Personal Information</legend>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-brand-deep mb-2">
                                        {textContent.contactFormLabels?.name || 'Full Name'} <span className="text-brand-gold" aria-label="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? "name-error" : undefined}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-brand-cream/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            errors.name
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-brand-deep/20 focus:ring-brand-gold focus:border-transparent'
                                        }`}
                                        placeholder={textContent.contactFormPlaceholders?.name || 'Your name'}
                                    />
                                    {errors.name && (
                                        <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-brand-deep mb-2">
                                        {textContent.contactFormLabels?.email || 'Email Address'} <span className="text-brand-gold" aria-label="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-brand-cream/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            errors.email
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-brand-deep/20 focus:ring-brand-gold focus:border-transparent'
                                        }`}
                                        placeholder={textContent.contactFormPlaceholders?.email || 'your@email.com'}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
                                    )}
                                </div>
                            </fieldset>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-brand-deep mb-2">{textContent.contactFormLabels?.company || 'Company'}</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300"
                                    placeholder={textContent.contactFormPlaceholders?.company || 'Your company'}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-brand-deep mb-2">
                                    {textContent.contactFormLabels?.message || 'Message'} <span className="text-brand-gold" aria-label="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-brand-cream/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                                        errors.message
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-brand-deep/20 focus:ring-brand-gold focus:border-transparent'
                                    }`}
                                    placeholder={textContent.contactFormPlaceholders?.message || 'Tell me about your project or opportunity...'}
                                ></textarea>
                                {errors.message && (
                                    <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-deep text-brand-cream font-medium py-3 sm:py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_4px_14px_0_rgba(11,19,43,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/90 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-gold">{textContent.contactSubmitButton || 'Send Message'}</span>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info & CTA */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Direct contact */}
                        <div className="bg-brand-deep rounded-2xl p-6 sm:p-8 border-2 border-brand-gold shadow-lg">
                            <h3 className="font-serif text-xl sm:text-2xl text-brand-cream mb-4 sm:mb-6">{textContent.contactInfoTitle || 'Get in Touch Directly'}</h3>
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                                        <span className="text-lg sm:text-xl">📧</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-brand-cream text-sm sm:text-base">Email</div>
                                        <a href={`mailto:${textContent.contactEmail || 'luz.quintanar@email.com'}`} className="text-brand-gold hover:text-brand-cream hover:underline text-sm sm:text-base break-all font-medium">{textContent.contactEmail || 'luz.quintanar@email.com'}</a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                                        <span className="text-lg sm:text-xl">💼</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-brand-cream text-sm sm:text-base">LinkedIn</div>
                                        <a href={textContent.contactLinkedin || '#'} className="text-brand-gold hover:text-brand-cream hover:underline text-sm sm:text-base break-all font-medium">{textContent.contactLinkedin ? textContent.contactLinkedin.replace('https://', '').replace('http://', '') : 'linkedin.com/in/luzquintanar'}</a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-gold/20 rounded-full flex items-center justify-center">
                                        <span className="text-lg sm:text-xl">📱</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-brand-cream text-sm sm:text-base">Phone</div>
                                        <a href={`tel:${textContent.contactPhone?.replace(/\s/g, '') || '+33123456789'}`} className="text-brand-gold hover:text-brand-cream hover:underline text-sm sm:text-base font-medium">{textContent.contactPhone || '+33 1 23 45 67 89'}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-brand-gold/10 rounded-2xl p-6 sm:p-8 border border-brand-gold/30">
                            <h3 className="font-serif text-xl sm:text-2xl text-brand-deep mb-3 sm:mb-4">{textContent.contactAvailabilityTitle || 'Current Availability'}</h3>
                            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-brand-deep font-medium text-sm sm:text-base">{textContent.contactAvailabilityStatus || 'Available for new opportunities'}</span>
                            </div>
                            <p className="text-brand-deep/80 mb-4 sm:mb-6 text-sm sm:text-base">
                                {textContent.contactAvailabilityDescription || "I'm currently exploring exciting product leadership roles in luxury retail and fashion tech. Let's discuss how I can help transform your business."}
                            </p>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-brand-deep/70">
                                {(textContent.contactAvailabilityItems && textContent.contactAvailabilityItems.length > 0 ? textContent.contactAvailabilityItems : [
                                    'Strategic consulting projects',
                                    'Full-time product leadership roles',
                                    'Speaking engagements & workshops'
                                ]).map((item, index) => (
                                    <div key={index}>• {item}</div>
                                ))}
                            </div>
                        </div>

                        {/* Download CV */}
                        <div className="text-center">
                            <a
                                href={textContent.contactCvPath || "/cv.pdf"}
                                download
                                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-deep text-brand-cream font-medium rounded-full transition-all duration-500 shadow-[0_4px_14px_0_rgba(11,19,43,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 text-sm sm:text-base relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/90 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                            >
                                <span className="text-lg sm:text-xl mr-2 relative z-10">📄</span>
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-gold">{textContent.contactDownloadText || 'Download Full Portfolio'}</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="text-center mt-12 sm:mt-16 md:mt-20">
                    <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-brand-deep/5 rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-none mx-auto">
                        <div className="text-brand-deep text-center sm:text-left">
                            <div className="text-sm sm:text-lg font-medium">{textContent.contactBottomInfo?.responseTime?.label || 'Response Time'}</div>
                            <div className="text-lg sm:text-2xl font-bold text-brand-gold">{textContent.contactBottomInfo?.responseTime?.value || '24h'}</div>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-brand-gold/30"></div>
                        <div className="text-brand-deep text-center sm:text-left">
                            <div className="text-sm sm:text-lg font-medium">{textContent.contactBottomInfo?.location?.label || 'Based in'}</div>
                            <div className="text-lg sm:text-2xl font-bold text-brand-gold">{textContent.contactBottomInfo?.location?.value || 'Paris'}</div>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-brand-gold/30"></div>
                        <div className="text-brand-deep text-center sm:text-left">
                            <div className="text-sm sm:text-lg font-medium">{textContent.contactBottomInfo?.languages?.label || 'Languages'}</div>
                            <div className="text-lg sm:text-2xl font-bold text-brand-gold">{textContent.contactBottomInfo?.languages?.value || 'EN • FR • ESP'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
