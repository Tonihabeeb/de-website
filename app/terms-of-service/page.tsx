import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Info,
  Scale
} from 'lucide-react';

export default function TermsOfServicePage() {
  const termsSections = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Acceptance of Terms",
      description: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Use License",
      description: "Permission is granted to temporarily download one copy of the materials on Deep Engineering's website for personal, non-commercial transitory viewing only."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Disclaimer",
      description: "The materials on Deep Engineering's website are provided on an 'as is' basis. Deep Engineering makes no warranties, expressed or implied."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Limitations",
      description: "In no event shall Deep Engineering or its suppliers be liable for any damages arising out of the use or inability to use the materials."
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
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Please read these terms carefully before using our services
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
              Agreement to Terms
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the Deep Engineering website and 
              services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              If you disagree with any part of these terms, then you may not access our services. 
              These Terms apply to all visitors, users, and others who access or use our services.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-yellow-800 font-semibold mb-1">Important Notice</p>
                  <p className="text-yellow-700 text-sm">
                    These terms constitute a legally binding agreement between you and Deep Engineering. 
                    Please read them carefully.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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
              Key Terms and Conditions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important terms that govern your use of our services
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {termsSections.map((section, index) => (
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
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {section.description}
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
              Questions About Terms?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              If you have any questions about these Terms of Service, please contact us. 
              We're here to clarify any concerns you may have.
            </p>
            <div className="bg-white/10 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-2 text-lg">
                <p><strong>Email:</strong> legal@deepengineering.com</p>
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