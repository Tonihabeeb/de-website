'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { CheckCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import GoogleOfficeMap from '@/components/maps/GoogleOfficeMap';
import HeroSection from '@/components/sections/HeroSection';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: 'Headquarters',
      address: 'Roya Tower A 1-14, Erbil-44001, Iraq',
      phone: '+964 750 466 3879',
      phone2: '+964 751 235 3179',
      email: 'info@deepengineering.co'
    },
    {
      title: 'Basra Office',
      address: 'Al Muhendisen - Al Zubair Road, Basra, Iraq',
      phone: '+964 773 033 3879',
      email: 'basra@deepengineering.co'
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Deep Engineering',
      url: 'https://deepengineering.co',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+964 750 466 3879',
          contactType: 'customer support',
          areaServed: 'IQ',
          availableLanguage: ['English', 'Arabic'],
          email: 'info@deepengineering.co',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+964 751 235 3179',
          contactType: 'customer support',
          areaServed: 'IQ',
          availableLanguage: ['English', 'Arabic'],
          email: 'info@deepengineering.co',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+964 773 033 3879',
          contactType: 'branch office',
          areaServed: 'IQ',
          availableLanguage: ['English', 'Arabic'],
          email: 'basra@deepengineering.co',
        }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Erbil, Kurdistan Region',
        addressLocality: 'Erbil',
        addressCountry: 'IQ'
      }
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with our team to learn more about KPP technology, discuss partnership opportunities, or explore project collaboration."
      />

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInWhenVisible>
              <div>
                <h2 className="mb-6">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded" role="alert" aria-live="polite">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert" aria-live="assertive">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      There was an error sending your message. Please try again.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-base font-medium text-gray-text mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } min-h-[44px]`}
                        placeholder="Your full name"
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                        required
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-base text-red-600" role="alert">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-base font-medium text-gray-text mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } min-h-[44px]`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-base text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-base font-medium text-gray-text mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-base font-medium text-gray-text mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                        placeholder="+964 XXX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-base font-medium text-gray-text mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      } min-h-[44px]`}
                    >
                      <option value="">Select a subject</option>
                      <option value="KPP Technology Inquiry">KPP Technology Inquiry</option>
                      <option value="Project Partnership">Project Partnership</option>
                      <option value="Investment Opportunities">Investment Opportunities</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-base text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-base font-medium text-gray-text mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } min-h-[44px]`}
                      placeholder="Tell us about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-base text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]"
                    aria-describedby={isSubmitting ? "submitting-status" : undefined}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  {isSubmitting && (
                    <p id="submitting-status" className="sr-only" aria-live="polite">
                      Form is being submitted, please wait.
                    </p>
                  )}
                </form>
              </div>
            </FadeInWhenVisible>

            {/* Contact Information */}
            <FadeInWhenVisible delay={0.2}>
              <div>
                <h2 className="mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-text mb-8 leading-relaxed">
                  We're here to help you understand KPP technology and explore 
                  how it can benefit your energy projects. Reach out to us through 
                  any of the channels below.
                </p>

                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="bg-gray-light p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-primary mb-4">{info.title}</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <span className="text-gray-text">{info.address}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div className="text-gray-text space-y-1">
                            <a href={`tel:${info.phone.replace(/\s+/g, '')}`} className="underline block min-w-[44px] min-h-[44px]">{info.phone}</a>
                            {info.phone2 && (
                              <a href={`tel:${info.phone2.replace(/\s+/g, '')}`} className="underline block min-w-[44px] min-h-[44px]">{info.phone2}</a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <a href={`mailto:${info.email}`} className="text-gray-text underline min-w-[44px] min-h-[44px]">{info.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="mt-8 bg-primary text-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href="/technology" className="block text-gray-200 hover:text-white transition-colors">
                      Learn About KPP Technology
                    </Link>
                    <Link href="/projects" className="block text-gray-200 hover:text-white transition-colors">
                      View Our Projects
                    </Link>
                    <Link href="/team" className="block text-gray-200 hover:text-white transition-colors">
                      Meet Our Team
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Office Locations Map */}
      <section className="section-padding bg-gray-light">
        <div className="container">
          <FadeInWhenVisible>
            <div className="text-center mb-8">
              <h2 className="mb-4">Our Locations</h2>
              <p className="text-lg text-gray-text max-w-3xl mx-auto">
                Deep Engineering operates from strategic locations across Iraq to serve
                our clients and partners effectively.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center min-h-[220px]">
            <GoogleOfficeMap />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=36.191856681457985,43.968337343201846"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 min-w-[44px] min-h-[44px]"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 