import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const dataCategories = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Personal Information",
      description: "Name, email address, phone number, and other contact information you provide.",
      examples: ["Email addresses", "Phone numbers", "Names", "Company information"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Technical Data",
      description: "Information about your device, browser, and how you interact with our website.",
      examples: ["IP addresses", "Browser type", "Device information", "Usage analytics"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Information",
      description: "Data related to account security and authentication.",
      examples: ["Login credentials", "Session data", "Security logs", "Access patterns"]
    }
  ];

  const dataUses = [
    {
      title: "Service Provision",
      description: "To provide and maintain our services, including customer support and technical assistance."
    },
    {
      title: "Communication",
      description: "To communicate with you about our services, updates, and important information."
    },
    {
      title: "Improvement",
      description: "To analyze usage patterns and improve our website and services."
    },
    {
      title: "Legal Compliance",
      description: "To comply with legal obligations and protect our rights and safety."
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
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              How we collect, use, and protect your personal information
            </p>
            <p className="text-lg text-primary-100">
              Last updated: August 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Introduction
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Deep Engineering ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website or use our services.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              By using our website, you consent to the data practices described in this policy. 
              If you do not agree with our policies and practices, please do not use our website.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold mb-1">Important Notice</p>
                  <p className="text-blue-700 text-sm">
                    This policy applies to information we collect on our website and through other 
                    means, such as email, telephone, or otherwise.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Information We Collect */}
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
              Information We Collect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collect several types of information to provide and improve our services
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {dataCategories.map((category, index) => (
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
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Use Information */}
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
              How We Use Your Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use the information we collect for various purposes to provide and improve our services
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {dataUses.map((use, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white shadow-lg border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {use.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {use.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Data Protection
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-gray-800">Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-gray-800">Access Controls</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-gray-800">Secure Storage</span>
                </div>
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
                <h3 className="text-2xl font-bold mb-4">Your Rights</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Access your personal data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Correct inaccurate data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Request data deletion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>Object to data processing</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Questions About Privacy?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us. We're here to help.
            </p>
            <div className="bg-white/10 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-2 text-lg">
                <p><strong>Email:</strong> privacy@deepengineering.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 