'use client';

import { useState } from 'react';
import { MessageSquare, Building2, Settings, DollarSign } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  projectType?: string;
  capacity?: string;
  timeline?: string;
  budget?: string;
  technicalArea?: string;
  investmentAmount?: string;
  investmentType?: string;
}

interface FormErrors {
  [key: string]: string;
}

type FormType = 'general' | 'project' | 'technical' | 'investment';

export default function EnhancedContactForms() {
  const [activeForm, setActiveForm] = useState<FormType>('general');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    projectType: '',
    capacity: '',
    timeline: '',
    budget: '',
    technicalArea: '',
    investmentAmount: '',
    investmentType: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formTypes: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-6 h-6" /> },
    { id: 'project', label: 'Project Inquiry', icon: <Building2 className="w-6 h-6" /> },
    { id: 'technical', label: 'Technical Support', icon: <Settings className="w-6 h-6" /> },
    { id: 'investment', label: 'Investment', icon: <DollarSign className="w-6 h-6" /> }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Common validations
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    // Form-specific validations
    if (activeForm === 'project') {
      if (!formData.projectType) newErrors.projectType = 'Project type is required';
      if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    }

    if (activeForm === 'technical') {
      if (!formData.technicalArea) newErrors.technicalArea = 'Technical area is required';
    }

    if (activeForm === 'investment') {
      if (!formData.investmentAmount) newErrors.investmentAmount = 'Investment amount is required';
      if (!formData.investmentType) newErrors.investmentType = 'Investment type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        projectType: '',
        capacity: '',
        timeline: '',
        budget: '',
        technicalArea: '',
        investmentAmount: '',
        investmentType: ''
      });
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderFormFields = () => {
    switch (activeForm) {
      case 'project':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px] ${
                    errors.projectType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select project type</option>
                  <option value="new-installation">New KPP Installation</option>
                  <option value="upgrade">System Upgrade</option>
                  <option value="maintenance">Maintenance Contract</option>
                  <option value="consultation">Technical Consultation</option>
                </select>
                {errors.projectType && <p className="text-red-500 text-base mt-1">{errors.projectType}</p>}
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Required Capacity *
                </label>
                <select
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px] ${
                    errors.capacity ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select capacity</option>
                  <option value="50-mw">50 MW</option>
                  <option value="100-mw">100 MW</option>
                  <option value="200-mw">200 MW</option>
                  <option value="custom">Custom Capacity</option>
                </select>
                {errors.capacity && <p className="text-red-500 text-base mt-1">{errors.capacity}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (0-6 months)</option>
                  <option value="short-term">Short-term (6-12 months)</option>
                  <option value="medium-term">Medium-term (1-2 years)</option>
                  <option value="long-term">Long-term (2+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                >
                  <option value="">Select budget range</option>
                  <option value="under-50m">Under €50M</option>
                  <option value="50-100m">€50M - €100M</option>
                  <option value="100-200m">€100M - €200M</option>
                  <option value="over-200m">Over €200M</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'technical':
        return (
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Technical Area *
            </label>
            <select
              value={formData.technicalArea}
              onChange={(e) => handleInputChange('technicalArea', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] ${
                errors.technicalArea ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select technical area</option>
              <option value="specifications">Technical Specifications</option>
              <option value="installation">Installation & Commissioning</option>
              <option value="maintenance">Maintenance & Operations</option>
              <option value="performance">Performance Optimization</option>
              <option value="troubleshooting">Troubleshooting</option>
              <option value="training">Technical Training</option>
            </select>
            {errors.technicalArea && <p className="text-red-500 text-base mt-1">{errors.technicalArea}</p>}
          </div>
        );

      case 'investment':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Investment Amount *
              </label>
              <select
                value={formData.investmentAmount}
                onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] ${
                  errors.investmentAmount ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select amount</option>
                <option value="under-10m">Under €10M</option>
                <option value="10-50m">€10M - €50M</option>
                <option value="50-100m">€50M - €100M</option>
                <option value="over-100m">Over €100M</option>
              </select>
              {errors.investmentAmount && <p className="text-red-500 text-base mt-1">{errors.investmentAmount}</p>}
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Investment Type *
              </label>
              <select
                value={formData.investmentType}
                onChange={(e) => handleInputChange('investmentType', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] ${
                  errors.investmentType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select type</option>
                <option value="direct-investment">Direct Project Investment</option>
                <option value="joint-venture">Joint Venture</option>
                <option value="technology-licensing">Technology Licensing</option>
                <option value="equity-participation">Equity Participation</option>
              </select>
              {errors.investmentType && <p className="text-red-500 text-base mt-1">{errors.investmentType}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your inquiry. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
        <p className="text-gray-600">
          Get in touch with our team for any inquiries about KPP technology, projects, or investment opportunities.
        </p>
      </div>

      {/* Form Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {formTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveForm(type.id as FormType)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center touch-target ${
              activeForm === type.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="text-2xl mb-2">{type.icon}</div>
            <div className="text-sm font-medium text-gray-800">{type.label}</div>
          </button>
        ))}
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px] ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-base mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px] ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-base mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px]"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px]"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Form-specific Fields */}
        {renderFormFields()}

        {/* Message Field */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please provide details about your inquiry..."
          />
          {errors.message && <p className="text-red-500 text-base mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mobile-button touch-target w-full md:w-auto min-h-[44px]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>

      {/* Contact Information */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
          <div>
            <span className="font-medium text-gray-700">📍 Address:</span>
            <p className="text-gray-600">Roya Tower A 1-14, Erbil-44001, Iraq</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">📧 Email:</span>
            <p className="text-gray-600">info@deepengineering.co</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">📞 Phone:</span>
            <p className="text-gray-600">+964 XXX XXX XXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
} 