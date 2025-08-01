import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Target, 
  Globe, 
  Lightbulb, 
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation Excellence",
      description: "Pioneering sustainable energy solutions through cutting-edge KPP technology."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Committed to reducing carbon emissions worldwide with renewable energy."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Environmental Stewardship",
      description: "Protecting our planet through clean, continuous energy generation."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Delivering reliable, efficient power solutions with 95%+ efficiency."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      expertise: "KPP System Architecture",
      image: "/team/sarah-chen.jpg"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Engineering",
      expertise: "Mechanical Systems",
      image: "/team/marcus-rodriguez.jpg"
    },
    {
      name: "Dr. Elena Petrova",
      role: "Research Director",
      expertise: "Energy Physics",
      image: "/team/elena-petrova.jpg"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Deep Engineering
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Revolutionizing renewable energy through innovative KPP technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/technology"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Our Technology
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                View Our Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
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
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Deep Engineering is dedicated to transforming the global energy landscape through 
                innovative Kinetic Power Plant (KPP) technology. We believe in creating sustainable, 
                continuous energy solutions that power the future without compromising our planet.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our revolutionary KPP system generates clean, renewable energy 24/7, achieving 
                unprecedented efficiency while eliminating fuel costs and carbon emissions.
              </p>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-800">
                  95%+ Efficiency Rate
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
                <h3 className="text-2xl font-bold mb-4">Key Achievements</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <span>500+ kW Continuous Power Generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-green-400" />
                    <span>Zero Carbon Emissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    <span>24/7 Renewable Energy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-red-400" />
                    <span>Environmental Protection</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guiding principles that drive our innovation and commitment to sustainable energy
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-sky-50 to-green-50 border border-sky-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert professionals driving innovation in sustainable energy technology
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-white shadow-lg border border-gray-200"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-lg text-gray-600 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500">
                  {member.expertise}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Energy?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Join us in revolutionizing renewable energy with our innovative KPP technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/technology"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
