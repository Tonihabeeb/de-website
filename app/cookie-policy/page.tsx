import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Settings, 
  Shield, 
  CheckCircle,
  Info,
  Eye
} from 'lucide-react';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly.",
      examples: ["Authentication", "Security", "Basic functionality", "Session management"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website.",
      examples: ["Page views", "User behavior", "Performance metrics", "Traffic analysis"]
    },
    {
      icon: <Cookie className="w-8 h-8" />,
      title: "Preference Cookies",
      description: "These cookies remember your choices and preferences.",
      examples: ["Language settings", "Theme preferences", "Display options", "User settings"]
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
              <Cookie className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              How we use cookies to improve your experience
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
              What Are Cookies?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              analyzing how you use our site.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and understand 
              where our visitors are coming from. By continuing to use our website, you consent to our 
              use of cookies as described in this policy.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 font-semibold mb-1">Cookie Consent</p>
                  <p className="text-blue-700 text-sm">
                    You can control and manage cookies through your browser settings. You can also 
                    opt out of certain types of cookies through our cookie consent banner.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
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
              Types of Cookies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use different types of cookies for various purposes
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {cookieTypes.map((type, index) => (
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
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.examples.map((example, exampleIndex) => (
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
              Questions About Cookies?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              If you have any questions about our use of cookies, please contact us. 
              We're here to help clarify our cookie practices.
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