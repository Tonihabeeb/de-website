import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import { Users, Handshake, BarChart3, CheckCircle2, Globe, Award } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function StakeholderDashboardPage() {
  return (
    <AuthGuard>
      <div>
        <HeroSection
          title="Stakeholder Dashboard"
          subtitle="Manage stakeholder mapping, communication, and relationships for Deep Engineering projects."
        />
        <section className="section-padding bg-white">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold">Stakeholder Mapping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="bg-gray-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Local Communities</h4>
                <div className="text-primary">Project beneficiaries</div>
              </div>
              <div className="bg-gray-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Government Agencies</h4>
                <div className="text-primary">Regulatory partners</div>
              </div>
              <div className="bg-gray-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">International Partners</h4>
                <div className="text-primary">Technology & finance</div>
              </div>
              <div className="bg-gray-light p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Certification Bodies</h4>
                <div className="text-primary">Quality & compliance</div>
              </div>
            </div>
            <div className="bg-gray-light p-8 rounded-lg text-center text-gray-500">
              Communication tracking, decision matrix, and relationship management interface coming soon.
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
} 