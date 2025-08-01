import React from 'react';
import { motion } from 'framer-motion';
import { 
  Accessibility, 
  Eye, 
  Ear, 
  Hand, 
  Brain, 
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visual Accessibility",
      description: "High contrast ratios, scalable text, and clear visual hierarchy for users with visual impairments.",
      features: [
        "Minimum 4.5:1 contrast ratio",
        "Scalable text up to 200%",
        "Clear visual focus indicators",
        "Consistent color coding"
      ]
    },
    {
      icon: <Ear className="w-8 h-8" />,
      title: "Auditory Accessibility",
      description: "Alternative text and captions for users with hearing impairments.",
      features: [
        "Alt text for all images",
        "Video captions and transcripts",
        "Audio descriptions where needed",
        "Clear audio controls"
      ]
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: "Motor Accessibility",
      description: "Keyboard navigation and touch-friendly interfaces for users with motor impairments.",
      features: [
        "Full keyboard navigation",
        "Large touch targets (44px minimum)",
        "Voice control compatibility",
        "Customizable interaction timing"
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Cognitive Accessibility",
      description: "Clear, simple language and predictable navigation for users with cognitive impairments.",
      features: [
        "Simple, clear language",
        "Consistent navigation patterns",
        "Logical content structure",
        "Reduced distractions"
      ]
    }
  ];

  const complianceStandards = [
    {
      standard: "WCAG 2.1 AA",
      status: "Compliant",
      description: "Web Content Accessibility Guidelines 2.1 Level AA compliance"
    },
    {
      standard: "Section 508",
      status: "Compliant", 
      description: "Federal accessibility standards for electronic and information technology"
    },
    {
      standard: "ADA Title III",
      status: "Compliant",
      description: "Americans with Disabilities Act accessibility requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Accessibility className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Accessibility Statement
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Deep Engineering is committed to ensuring digital accessibility for people with disabilities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Our Commitment
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Deep Engineering is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We believe that websites and mobile applications should be accessible to all users, 
                regardless of their abilities or the devices they use to access the web.
              </p>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-800">
                  WCAG 2.1 AA Compliant
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Accessibility Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Screen reader compatibility</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Keyboard navigation support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>High contrast mode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Text scaling support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Accessibility Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive accessibility features designed to support users with diverse needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {accessibilityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-sky-50 to-green-50 border border-sky-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Compliance Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to meeting and exceeding accessibility standards
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-200"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {standard.standard}
                </h3>
                <p className="text-lg text-green-600 mb-2 font-semibold">
                  {standard.status}
                </p>
                <p className="text-sm text-gray-600">
                  {standard.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Info className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Need Help?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              If you experience any accessibility issues or have suggestions for improvement, 
              please contact us. We value your feedback and are committed to continuous improvement.
            </p>
            <div className="bg-white/10 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-2 text-lg">
                <p><strong>Email:</strong> accessibility@deepengineering.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 