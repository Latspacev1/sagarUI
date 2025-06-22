import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import { Save, RotateCcw, CheckCircle } from 'lucide-react';

interface FormData {
  environmental: {
    emissions: string;
    energy: string;
    water: string;
    waste: string;
    renewable_energy: string;
    recycling_rate: string;
  };
  social: {
    employees: string;
    safety_incidents: string;
    training_hours: string;
    community_investment: string;
    diversity_rate: string;
    employee_satisfaction: string;
  };
  governance: {
    board_meetings: string;
    audit_completion: string;
    policy_updates: string;
    compliance_score: string;
    ethics_training: string;
    transparency_score: string;
  };
}

const initialFormData: FormData = {
  environmental: {
    emissions: '',
    energy: '',
    water: '',
    waste: '',
    renewable_energy: '',
    recycling_rate: ''
  },
  social: {
    employees: '',
    safety_incidents: '',
    training_hours: '',
    community_investment: '',
    diversity_rate: '',
    employee_satisfaction: ''
  },
  governance: {
    board_meetings: '',
    audit_completion: '',
    policy_updates: '',
    compliance_score: '',
    ethics_training: '',
    transparency_score: ''
  }
};

export const ManualEntry: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('esg-form-draft');
    return savedData ? JSON.parse(savedData) : initialFormData;
  });
  const [activeSection, setActiveSection] = useState<'environmental' | 'social' | 'governance'>('environmental');
  const [savedSections, setSavedSections] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    const updatedData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    };
    setFormData(updatedData);
    localStorage.setItem('esg-form-draft', JSON.stringify(updatedData));
  };

  const handleSectionSave = (section: keyof FormData) => {
    setSavedSections(prev => new Set(prev).add(section));
    // In a real app, this would save to backend
    console.log(`Saved ${section} section:`, formData[section]);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSavedSections(new Set());
    localStorage.removeItem('esg-form-draft');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Submitted ESG data:', formData);
    setSavedSections(new Set(['environmental', 'social', 'governance']));
    localStorage.removeItem('esg-form-draft');
    setIsSubmitting(false);
  };

  const sections = [
    { 
      key: 'environmental' as const, 
      label: 'Environmental',
      fields: [
        { key: 'emissions', label: 'CO2 Emissions (tons)', type: 'number', unit: 'tons' },
        { key: 'energy', label: 'Energy Consumption (MWh)', type: 'number', unit: 'MWh' },
        { key: 'water', label: 'Water Usage (gallons)', type: 'number', unit: 'gallons' },
        { key: 'waste', label: 'Waste Generated (tons)', type: 'number', unit: 'tons' },
        { key: 'renewable_energy', label: 'Renewable Energy (%)', type: 'number', unit: '%' },
        { key: 'recycling_rate', label: 'Recycling Rate (%)', type: 'number', unit: '%' }
      ]
    },
    { 
      key: 'social' as const, 
      label: 'Social',
      fields: [
        { key: 'employees', label: 'Total Employees', type: 'number', unit: '' },
        { key: 'safety_incidents', label: 'Safety Incidents', type: 'number', unit: '' },
        { key: 'training_hours', label: 'Training Hours per Employee', type: 'number', unit: 'hours' },
        { key: 'community_investment', label: 'Community Investment ($)', type: 'number', unit: '$' },
        { key: 'diversity_rate', label: 'Workforce Diversity (%)', type: 'number', unit: '%' },
        { key: 'employee_satisfaction', label: 'Employee Satisfaction (%)', type: 'number', unit: '%' }
      ]
    },
    { 
      key: 'governance' as const, 
      label: 'Governance',
      fields: [
        { key: 'board_meetings', label: 'Board Meetings Held', type: 'number', unit: '' },
        { key: 'audit_completion', label: 'Audit Completion (%)', type: 'number', unit: '%' },
        { key: 'policy_updates', label: 'Policy Updates', type: 'number', unit: '' },
        { key: 'compliance_score', label: 'Compliance Score (%)', type: 'number', unit: '%' },
        { key: 'ethics_training', label: 'Ethics Training Completion (%)', type: 'number', unit: '%' },
        { key: 'transparency_score', label: 'Transparency Score (%)', type: 'number', unit: '%' }
      ]
    }
  ];

  const currentSection = sections.find(s => s.key === activeSection)!;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-grid-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-grid-3">
          <h1 className="text-2xl font-semibold text-latspace-dark">Manual ESG Data Entry</h1>
          <div className="flex space-x-grid-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-grid-3 py-grid-2 border border-latspace-dark text-sm font-medium text-latspace-dark bg-white hover:bg-latspace-dark hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-grid" />
              Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center px-grid-3 py-grid-2 border border-latspace-dark text-sm font-medium text-white bg-latspace-dark hover:bg-latspace-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-grid" />
              {isSubmitting ? 'Submitting...' : 'Submit All'}
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-grid-6 px-grid-4" aria-label="Tabs">
              {sections.map((section) => {
                const isSaved = savedSections.has(section.key);
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`whitespace-nowrap py-grid-3 px-grid-2 border-b-2 font-semibold text-sm uppercase tracking-wider ${
                      activeSection === section.key
                        ? 'border-latspace-dark text-latspace-dark'
                        : 'border-transparent text-latspace-medium hover:text-latspace-dark'
                    }`}
                  >
                    {section.label}
                    {isSaved && <CheckCircle className="w-4 h-4 ml-grid text-latspace-dark" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-grid-4">
            <div className="border border-gray-200 p-grid-3 mb-grid-4 grid-pattern">
              <h2 className="text-base font-semibold text-latspace-dark uppercase tracking-wide">
                {currentSection.label} Data
              </h2>
              <p className="text-sm text-latspace-medium mt-grid">
                Enter your facility's {currentSection.label.toLowerCase()} metrics for this reporting period.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-4">
              {currentSection.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-latspace-dark mb-grid uppercase tracking-wider">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      value={formData[activeSection][field.key as keyof typeof formData[typeof activeSection]]}
                      onChange={(e) => handleInputChange(activeSection, field.key, e.target.value)}
                      className="w-full px-grid-2 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                    {field.unit && (
                      <div className="absolute right-grid-2 top-1/2 transform -translate-y-1/2 text-latspace-medium text-xs font-mono">
                        {field.unit}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-grid-6 flex justify-between">
              <div className="text-xs text-latspace-medium">
                {savedSections.has(activeSection) ? (
                  <span className="flex items-center text-latspace-dark font-mono">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    SECTION SAVED
                  </span>
                ) : (
                  <span className="font-mono">CHANGES AUTO-SAVED AS DRAFTS</span>
                )}
              </div>
              <button
                onClick={() => handleSectionSave(activeSection)}
                className={`px-grid-4 py-grid-2 font-medium text-sm ${
                  savedSections.has(activeSection)
                    ? 'border border-latspace-dark text-latspace-dark'
                    : 'bg-latspace-dark text-white hover:bg-latspace-medium'
                }`}
              >
                {savedSections.has(activeSection) ? 'SAVED' : 'SAVE SECTION'}
              </button>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 p-grid-3">
          <h3 className="text-xs font-semibold text-latspace-dark mb-grid-2 uppercase tracking-wider">Data Entry Guidelines</h3>
          <ul className="text-xs text-latspace-medium space-y-grid font-mono">
            <li>• DATA IS AUTOMATICALLY SAVED AS YOU TYPE</li>
            <li>• SAVE EACH SECTION BEFORE MOVING TO NEXT</li>
            <li>• SUBMIT ALL SECTIONS TOGETHER WHEN COMPLETE</li>
            <li>• CONTACT ADMINISTRATOR FOR METRIC ASSISTANCE</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};