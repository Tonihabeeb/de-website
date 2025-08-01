const fs = require('fs');
const path = require('path');

// Create the documents directory if it doesn't exist
const documentsDir = path.join(__dirname, '../public/documents');
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir, { recursive: true });
}

// Deep Engineering branding template
const brandingTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{TITLE}}</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #1e3a8a;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
        }
        .title {
            font-size: 28px;
            font-weight: bold;
            color: #1e3a8a;
            text-align: center;
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 10px;
            border-left: 4px solid #1e3a8a;
            padding-left: 10px;
        }
        .content {
            font-size: 12px;
            line-height: 1.8;
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .page-number {
            text-align: center;
            font-size: 10px;
            color: #666;
            margin-top: 20px;
        }
        .highlight {
            background-color: #f0f4ff;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .metrics {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }
        .metric {
            text-align: center;
            flex: 1;
            margin: 0 10px;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
        }
        .metric-label {
            font-size: 10px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">DEEP ENGINEERING</div>
        <div class="subtitle">Iraq's Premier Renewable Energy Company</div>
        <div class="subtitle">Exclusive KPP Licensee for Iraq</div>
    </div>
    
    <div class="title">{{TITLE}}</div>
    
    <div class="content">
        {{CONTENT}}
    </div>
    
    <div class="footer">
        <div>Deep Engineering - Leading Iraq's Energy Transition</div>
        <div>Contact: info@deepengineering.co | www.deepengineering.co</div>
        <div>Generated on: {{DATE}}</div>
    </div>
    
    <div class="page-number">Page {{PAGE}} of {{PAGES}}</div>
</body>
</html>
`;

// Document content with proper HTML formatting
const documents = {
  'environmental-impact-assessment': {
    title: 'Environmental Impact Assessment',
    filename: 'environmental-impact-assessment-2024.pdf',
    content: `
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>This Environmental Impact Assessment (EIA) evaluates the potential environmental effects of Deep Engineering's Kinetic Power Plant (KPP) technology deployment across Iraq. Our comprehensive analysis demonstrates that KPP technology delivers unprecedented environmental benefits while meeting all regulatory requirements.</p>
        </div>

        <div class="section">
            <div class="section-title">Key Findings</div>
            <div class="highlight">
                <ul>
                    <li><strong>Zero Emissions:</strong> KPP technology generates power without any fuel combustion</li>
                    <li><strong>Zero Water Use:</strong> No water required for cooling or steam generation</li>
                    <li><strong>Minimal Land Footprint:</strong> Compact design requires significantly less land</li>
                    <li><strong>Continuous Operation:</strong> 24/7 power generation without weather dependency</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Environmental Benefits</div>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">2.5M</div>
                    <div class="metric-label">Tons CO₂ Avoided/Year</div>
                </div>
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">Emissions</div>
                </div>
                <div class="metric">
                    <div class="metric-value">390 MW</div>
                    <div class="metric-label">Clean Power</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Compliance Status</div>
            <ul>
                <li>✅ Iraq Environmental Protection Law compliance</li>
                <li>✅ International environmental standards adherence</li>
                <li>✅ Regular environmental impact assessments</li>
                <li>✅ ISO 14001 Environmental Management System</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Project Scope</div>
            <ul>
                <li><strong>Capacity:</strong> 390 MW clean power generation</li>
                <li><strong>Technology:</strong> Kinetic Power Plant (KPP) - exclusive Iraq licensee</li>
                <li><strong>Timeline:</strong> 2024-2025 implementation phase</li>
                <li><strong>Locations:</strong> Multiple sites across Iraq</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Monitoring and Reporting</div>
            <p>Our comprehensive environmental monitoring system includes:</p>
            <ul>
                <li>Real-time emissions monitoring</li>
                <li>Air quality measurements</li>
                <li>Noise level assessments</li>
                <li>Biodiversity impact tracking</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Conclusion</div>
            <p>Deep Engineering's KPP technology represents a revolutionary approach to clean energy generation, delivering significant environmental benefits while meeting all regulatory requirements. Our commitment to environmental excellence is validated through international certifications and comprehensive monitoring systems.</p>
        </div>
    `
  },
  'esg-policies': {
    title: 'ESG Policies Framework',
    filename: 'esg-policies-framework-2024.pdf',
    content: `
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>Deep Engineering's comprehensive ESG framework drives sustainable impact through innovative technology and responsible business practices. Our commitment to Environmental, Social, and Governance excellence is embedded in every aspect of our operations.</p>
        </div>

        <div class="section">
            <div class="section-title">Environmental Policy</div>
            <h4>Zero Emissions Technology</h4>
            <ul>
                <li>Implementation of KPP technology with zero fuel combustion</li>
                <li>Carbon footprint reduction and offset programs</li>
                <li>Resource efficiency and waste minimization</li>
                <li>Biodiversity conservation and habitat protection</li>
            </ul>
            
            <h4>Environmental Monitoring</h4>
            <ul>
                <li>Comprehensive environmental monitoring and reporting</li>
                <li>Real-time data collection and analysis</li>
                <li>Regular environmental impact assessments</li>
                <li>Continuous improvement initiatives</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Social Responsibility</div>
            <h4>Community Development</h4>
            <ul>
                <li>Educational programs and scholarships for STEM students</li>
                <li>Infrastructure development in underserved areas</li>
                <li>Skills training and job creation programs</li>
                <li>Support for local businesses and entrepreneurs</li>
            </ul>
            
            <h4>Workforce Development</h4>
            <ul>
                <li>Comprehensive training and development programs</li>
                <li>Health, safety, and wellbeing initiatives</li>
                <li>Diversity, equity, and inclusion programs</li>
                <li>Stakeholder engagement and transparency</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Governance Standards</div>
            <h4>Ethical Business Practices</h4>
            <ul>
                <li>Board diversity and independent oversight</li>
                <li>Risk management and cybersecurity</li>
                <li>Transparent reporting and disclosure</li>
                <li>Stakeholder value creation</li>
            </ul>
            
            <h4>Compliance Framework</h4>
            <ul>
                <li>ISO 14001 Environmental Management System</li>
                <li>ISO 45001 Occupational Health & Safety</li>
                <li>TÜV, SGS, and DEKRA certifications</li>
                <li>Regular compliance audits and reporting</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Performance Metrics</div>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">2.5M</div>
                    <div class="metric-label">Tons CO₂ Avoided</div>
                </div>
                <div class="metric">
                    <div class="metric-value">2,500+</div>
                    <div class="metric-label">Jobs Created</div>
                </div>
                <div class="metric">
                    <div class="metric-value">100%</div>
                    <div class="metric-label">Compliance</div>
                </div>
            </div>
        </div>
    `
  },
  'sustainability-reports': {
    title: 'Annual Sustainability Report 2024',
    filename: 'sustainability-report-2024.pdf',
    content: `
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>Deep Engineering's 2024 Sustainability Report demonstrates our commitment to environmental excellence, social responsibility, and governance transparency. As Iraq's exclusive KPP licensee, we are proud to lead the country's transition to sustainable energy.</p>
        </div>

        <div class="section">
            <div class="section-title">Environmental Performance</div>
            <h4>Carbon Footprint Analysis</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">2.5M</div>
                    <div class="metric-label">Tons CO₂ Avoided</div>
                </div>
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">Emissions</div>
                </div>
                <div class="metric">
                    <div class="metric-value">100%</div>
                    <div class="metric-label">Renewable</div>
                </div>
            </div>
            
            <h4>Environmental Metrics</h4>
            <ul>
                <li><strong>Renewable Energy:</strong> 100% clean power generation</li>
                <li><strong>Emissions:</strong> Zero CO₂, NOₓ, SOₓ, and particulate emissions</li>
                <li><strong>Resource Efficiency:</strong> Maximum resource utilization</li>
                <li><strong>Biodiversity:</strong> Minimal habitat disruption</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Social Impact</div>
            <h4>Job Creation and Development</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">1,200+</div>
                    <div class="metric-label">Direct Jobs</div>
                </div>
                <div class="metric">
                    <div class="metric-value">1,300+</div>
                    <div class="metric-label">Indirect Jobs</div>
                </div>
                <div class="metric">
                    <div class="metric-value">$15M+</div>
                    <div class="metric-label">Community Investment</div>
                </div>
            </div>
            
            <h4>Community Engagement</h4>
            <ul>
                <li><strong>Educational Programs:</strong> STEM education initiatives</li>
                <li><strong>Infrastructure:</strong> Local community development</li>
                <li><strong>Health & Safety:</strong> Comprehensive wellbeing programs</li>
                <li><strong>Stakeholder Engagement:</strong> Transparent communication</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Governance Excellence</div>
            <h4>Corporate Governance</h4>
            <ul>
                <li><strong>Board Diversity:</strong> 40% female representation</li>
                <li><strong>Independent Oversight:</strong> External audit committees</li>
                <li><strong>Risk Management:</strong> Comprehensive risk frameworks</li>
                <li><strong>Transparency:</strong> Regular stakeholder reporting</li>
            </ul>
            
            <h4>Compliance and Certifications</h4>
            <ul>
                <li>✅ ISO 14001: Environmental Management System</li>
                <li>✅ ISO 45001: Occupational Health & Safety</li>
                <li>✅ TÜV Certification: German Technical Inspection</li>
                <li>✅ SGS Certification: International standards compliance</li>
                <li>✅ DEKRA Certification: Quality assurance</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Future Commitments</div>
            <h4>2025 Goals</h4>
            <ul>
                <li><strong>Carbon Reduction:</strong> Increase to 3M tons CO₂ avoided</li>
                <li><strong>Job Creation:</strong> Expand to 3,000+ total positions</li>
                <li><strong>Community Programs:</strong> Double educational initiatives</li>
                <li><strong>Technology Innovation:</strong> Advance KPP technology</li>
            </ul>
        </div>
    `
  },
  'compliance-documents': {
    title: 'Compliance Documentation',
    filename: 'compliance-documents-2024.pdf',
    content: `
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>Deep Engineering maintains the highest standards of regulatory compliance and international certifications. Our comprehensive compliance framework ensures adherence to all environmental, safety, and governance requirements.</p>
        </div>

        <div class="section">
            <div class="section-title">Environmental Compliance</div>
            <h4>Iraq Environmental Protection Law</h4>
            <ul>
                <li><strong>Status:</strong> Full compliance maintained</li>
                <li><strong>Requirements:</strong> All environmental standards met</li>
                <li><strong>Monitoring:</strong> Continuous environmental monitoring</li>
                <li><strong>Reporting:</strong> Regular compliance reporting</li>
            </ul>
            
            <h4>International Standards</h4>
            <ul>
                <li>✅ ISO 14001: Environmental Management System certified</li>
                <li>✅ International Protocols: All environmental protocols followed</li>
                <li>✅ Best Practices: Industry-leading environmental practices</li>
                <li>✅ Continuous Improvement: Regular compliance audits</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Safety Compliance</div>
            <h4>Occupational Health & Safety</h4>
            <ul>
                <li>✅ ISO 45001: Occupational Health & Safety certified</li>
                <li>✅ Safety Protocols: Comprehensive safety frameworks</li>
                <li>✅ Training Programs: Regular safety training</li>
                <li>✅ Emergency Response: Full emergency response capabilities</li>
            </ul>
            
            <h4>Safety Standards</h4>
            <ul>
                <li><strong>Workplace Safety:</strong> Zero harm culture maintained</li>
                <li><strong>Training Programs:</strong> Comprehensive safety training</li>
                <li><strong>Emergency Response:</strong> Full emergency response systems</li>
                <li><strong>Regular Audits:</strong> Monthly safety audits</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Regulatory Certifications</div>
            <h4>International Certifications</h4>
            <ul>
                <li>✅ TÜV Certification: German Technical Inspection Association</li>
                <li>✅ SGS Certification: Société Générale de Surveillance</li>
                <li>✅ DEKRA Certification: German Expert Committee</li>
                <li>✅ Quality Assurance: All international standards met</li>
            </ul>
            
            <h4>Compliance Monitoring</h4>
            <ul>
                <li><strong>Regular Audits:</strong> Quarterly compliance audits</li>
                <li><strong>External Reviews:</strong> Independent third-party reviews</li>
                <li><strong>Stakeholder Reporting:</strong> Transparent compliance reporting</li>
                <li><strong>Continuous Improvement:</strong> Ongoing compliance enhancement</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Permits and Licenses</div>
            <h4>Environmental Permits</h4>
            <ul>
                <li>✅ Operating Permits: All required permits obtained</li>
                <li>✅ Environmental Clearances: Full environmental clearance</li>
                <li>✅ Regulatory Approvals: All regulatory approvals secured</li>
                <li>✅ Compliance Status: 100% compliance maintained</li>
            </ul>
            
            <h4>Project Licenses</h4>
            <ul>
                <li><strong>KPP License:</strong> Exclusive Iraq licensee status</li>
                <li><strong>Technology License:</strong> Full technology licensing</li>
                <li><strong>Operating Licenses:</strong> All operating licenses secured</li>
                <li><strong>Regulatory Compliance:</strong> Full regulatory compliance</li>
            </ul>
        </div>
    `
  },
  'monitoring-data': {
    title: 'Environmental Monitoring Data',
    filename: 'environmental-monitoring-data-2024.pdf',
    content: `
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>Deep Engineering's comprehensive environmental monitoring system provides real-time data on all environmental parameters. Our advanced monitoring technology ensures continuous oversight of environmental performance and compliance.</p>
        </div>

        <div class="section">
            <div class="section-title">Real-time Environmental Monitoring</div>
            <h4>Air Quality Measurements</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">CO₂ ppm</div>
                </div>
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">NOₓ ppm</div>
                </div>
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">SOₓ ppm</div>
                </div>
            </div>
            
            <h4>Monitoring Systems</h4>
            <ul>
                <li><strong>24/7 Monitoring:</strong> Continuous environmental monitoring</li>
                <li><strong>Real-time Data:</strong> Instant data collection and analysis</li>
                <li><strong>Automated Alerts:</strong> Automated environmental alert systems</li>
                <li><strong>Data Validation:</strong> Comprehensive data validation protocols</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Environmental Parameters</div>
            <h4>Air Quality Metrics</h4>
            <ul>
                <li><strong>CO₂ Concentration:</strong> 0 ppm (zero emissions technology)</li>
                <li><strong>NOₓ Concentration:</strong> 0 ppm (zero emissions technology)</li>
                <li><strong>SOₓ Concentration:</strong> 0 ppm (zero emissions technology)</li>
                <li><strong>PM10/PM2.5:</strong> 0 μg/m³ (zero particulate emissions)</li>
            </ul>
            
            <h4>Water Quality Monitoring</h4>
            <ul>
                <li><strong>Water Consumption:</strong> 0 liters (zero water use technology)</li>
                <li><strong>Water Quality:</strong> No water impact (zero water use)</li>
                <li><strong>Wastewater:</strong> No wastewater generation</li>
                <li><strong>Water Conservation:</strong> 100% water conservation</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Noise Level Assessments</div>
            <h4>Acoustic Monitoring</h4>
            <ul>
                <li><strong>Ambient Noise:</strong> Below regulatory limits</li>
                <li><strong>Equipment Noise:</strong> Minimal operational noise</li>
                <li><strong>Community Impact:</strong> No significant noise impact</li>
                <li><strong>Compliance:</strong> Full noise compliance maintained</li>
            </ul>
            
            <h4>Noise Metrics</h4>
            <ul>
                <li><strong>Daytime Levels:</strong> 45-55 dB (well below limits)</li>
                <li><strong>Nighttime Levels:</strong> 35-45 dB (well below limits)</li>
                <li><strong>Peak Levels:</strong> 60 dB maximum (compliance maintained)</li>
                <li><strong>Community Impact:</strong> No significant impact</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Biodiversity Monitoring</div>
            <h4>Habitat Assessment</h4>
            <ul>
                <li><strong>Land Use:</strong> Minimal land footprint</li>
                <li><strong>Habitat Impact:</strong> Minimal habitat disruption</li>
                <li><strong>Species Monitoring:</strong> Regular biodiversity surveys</li>
                <li><strong>Conservation:</strong> Active conservation measures</li>
            </ul>
            
            <h4>Ecological Metrics</h4>
            <ul>
                <li><strong>Land Efficiency:</strong> 90% less land than traditional plants</li>
                <li><strong>Habitat Preservation:</strong> 100% habitat preservation</li>
                <li><strong>Species Protection:</strong> No species impact</li>
                <li><strong>Biodiversity:</strong> Enhanced local biodiversity</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Compliance Monitoring</div>
            <h4>Regulatory Compliance</h4>
            <ul>
                <li>✅ Environmental Laws: Full compliance with all laws</li>
                <li>✅ International Standards: All standards met</li>
                <li>✅ Permit Requirements: All permit requirements met</li>
                <li>✅ Reporting Requirements: All reporting requirements met</li>
            </ul>
            
            <h4>Performance Metrics</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">100%</div>
                    <div class="metric-label">Compliance Rate</div>
                </div>
                <div class="metric">
                    <div class="metric-value">100%</div>
                    <div class="metric-label">Monitoring Coverage</div>
                </div>
                <div class="metric">
                    <div class="metric-value">99.9%</div>
                    <div class="metric-label">Data Accuracy</div>
                </div>
            </div>
        </div>
    `
  },
  'research-studies': {
    title: 'Research & Studies',
    filename: 'research-studies-2024.pdf',
    content: `
        <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>Deep Engineering's research and development program focuses on advancing clean energy technology and environmental sustainability. Our comprehensive research initiatives drive innovation in renewable energy and environmental protection.</p>
        </div>

        <div class="section">
            <div class="section-title">Environmental Technology Studies</div>
            <h4>KPP Technology Research</h4>
            <ul>
                <li><strong>Technology Development:</strong> Advanced KPP technology development</li>
                <li><strong>Efficiency Optimization:</strong> Continuous efficiency improvements</li>
                <li><strong>Environmental Impact:</strong> Comprehensive environmental studies</li>
                <li><strong>Performance Analysis:</strong> Detailed performance analysis</li>
            </ul>
            
            <h4>Research Focus Areas</h4>
            <ul>
                <li><strong>Energy Efficiency:</strong> Maximizing energy conversion efficiency</li>
                <li><strong>Environmental Impact:</strong> Minimizing environmental footprint</li>
                <li><strong>Cost Optimization:</strong> Reducing technology costs</li>
                <li><strong>Scalability:</strong> Ensuring technology scalability</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Climate Impact Research</div>
            <h4>Carbon Reduction Studies</h4>
            <ul>
                <li><strong>Emissions Analysis:</strong> Comprehensive emissions analysis</li>
                <li><strong>Carbon Footprint:</strong> Detailed carbon footprint studies</li>
                <li><strong>Climate Impact:</strong> Climate impact assessment</li>
                <li><strong>Mitigation Strategies:</strong> Carbon mitigation strategies</li>
            </ul>
            
            <h4>Climate Research Metrics</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">2.5M</div>
                    <div class="metric-label">Tons CO₂ Reduced</div>
                </div>
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">Carbon Intensity</div>
                </div>
                <div class="metric">
                    <div class="metric-value">100%</div>
                    <div class="metric-label">Clean Energy</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Technology Innovation</div>
            <h4>Advanced Technologies</h4>
            <ul>
                <li><strong>Next-Generation KPP:</strong> Advanced KPP technology development</li>
                <li><strong>Smart Grid Integration:</strong> Smart grid integration research</li>
                <li><strong>Energy Storage:</strong> Energy storage technology research</li>
                <li><strong>Digital Technologies:</strong> Digital technology integration</li>
            </ul>
            
            <h4>Innovation Metrics</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">$25M</div>
                    <div class="metric-label">R&D Investment</div>
                </div>
                <div class="metric">
                    <div class="metric-value">10+</div>
                    <div class="metric-label">Patent Applications</div>
                </div>
                <div class="metric">
                    <div class="metric-value">5</div>
                    <div class="metric-label">Technology Breakthroughs</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Academic Partnerships</div>
            <h4>University Collaborations</h4>
            <ul>
                <li><strong>Research Partnerships:</strong> University research partnerships</li>
                <li><strong>Academic Programs:</strong> Academic program development</li>
                <li><strong>Student Training:</strong> Student training and development</li>
                <li><strong>Knowledge Sharing:</strong> Knowledge sharing initiatives</li>
            </ul>
            
            <h4>Educational Initiatives</h4>
            <ul>
                <li><strong>STEM Education:</strong> Comprehensive STEM education programs</li>
                <li><strong>Research Training:</strong> Research training programs</li>
                <li><strong>Academic Support:</strong> Academic support initiatives</li>
                <li><strong>Capacity Building:</strong> Local capacity building</li>
            </ul>
        </div>

        <div class="section">
            <div class="section-title">Future Research</div>
            <h4>Research Priorities</h4>
            <ul>
                <li><strong>Technology Advancement:</strong> Advanced technology development</li>
                <li><strong>Environmental Protection:</strong> Enhanced environmental protection</li>
                <li><strong>Cost Reduction:</strong> Technology cost reduction</li>
                <li><strong>Scalability:</strong> Technology scalability research</li>
            </ul>
            
            <h4>Research Goals</h4>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">20%</div>
                    <div class="metric-label">Efficiency Target</div>
                </div>
                <div class="metric">
                    <div class="metric-value">30%</div>
                    <div class="metric-label">Cost Reduction</div>
                </div>
                <div class="metric">
                    <div class="metric-value">0</div>
                    <div class="metric-label">Environmental Impact</div>
                </div>
            </div>
        </div>
    `
  }
};

// Generate HTML files for each document
console.log('Generating branded document files...');

Object.entries(documents).forEach(([key, doc]) => {
  const htmlContent = brandingTemplate
    .replace(/{{TITLE}}/g, doc.title)
    .replace(/{{CONTENT}}/g, doc.content)
    .replace(/{{DATE}}/g, new Date().toISOString().split('T')[0])
    .replace(/{{PAGE}}/g, '1')
    .replace(/{{PAGES}}/g, '1');
  
  const htmlFilePath = path.join(documentsDir, doc.filename.replace('.pdf', '.html'));
  fs.writeFileSync(htmlFilePath, htmlContent);
  console.log(`✅ Generated: ${doc.filename.replace('.pdf', '.html')}`);
});

console.log('\n📁 Branded documents generated in:', documentsDir);
console.log('📝 Note: These are HTML files that can be converted to PDF using browser print or tools like puppeteer');
console.log('🎨 All documents include Deep Engineering branding with professional styling'); 