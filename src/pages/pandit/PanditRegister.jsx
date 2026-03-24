import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const steps = ['Personal Info', 'Professional', 'Documents', 'Done'];

const specializations = [
  'Weddings', 'Griha Pravesh', 'Satyanarayana Puja', 'Ganesh Puja',
  'Rudrabhishek', 'Lakshmi Puja', 'Navagraha Shanti', 'Namakaran',
  'Annaprashana', 'Mundan', 'Upanayana', 'Shraddha', 'Online Puja',
];
const languages = ['Telugu', 'Tamil', 'Hindi', 'Sanskrit', 'Kannada', 'Marathi', 'Malayalam', 'Bengali'];

export default function PanditRegister() {
  const { loginPandit } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', password: '',
    experience: '', bio: '', pricePerPuja: '',
    languages: [], traditions: [], specializations: [],
    idProof: false, qualification: false, addressProof: false,
  });

  const toggle = (field, value) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((v) => v !== value) : [...f[field], value],
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
            <p className="text-gray-500 mb-6">
              Thank you for registering. Our team will verify your documents and approve your profile within <strong>24–48 hours</strong>. You'll receive an email once approved.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => { loginPandit({ name: form.name || 'New Pandit', email: form.email, id: 99 }); navigate('/pandit/dashboard'); }}
                className="w-full gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all"
              >
                View Demo Dashboard
              </button>
              <Link to="/" className="block text-sm text-gray-500 hover:text-saffron">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🕉️</span>
            <span className="text-2xl font-bold text-maroon" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pandit<span className="text-saffron">Connect</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Register as Pandit</h1>
          <p className="text-gray-500 text-sm mt-1">Join 500+ verified pandits on our platform</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < step ? 'gradient-saffron text-white' : i === step ? 'bg-saffron text-white ring-4 ring-orange-100' : 'bg-gray-100 text-gray-400'}`}>
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              <p className={`text-xs mt-1.5 font-medium hidden sm:block ${i === step ? 'text-saffron' : 'text-gray-400'}`}>{s}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Personal Information</h2>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Pandit Ramesh Sharma', type: 'text' },
                { key: 'email', label: 'Email', placeholder: 'pandit@example.com', type: 'email' },
                { key: 'phone', label: 'Phone', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
                { key: 'city', label: 'City', placeholder: 'Hyderabad', type: 'text' },
                { key: 'password', label: 'Password', placeholder: 'Min 6 characters', type: 'password' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Professional Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Years of Experience</label>
                  <input type="number" placeholder="e.g., 10" value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price per Puja (₹)</label>
                  <input type="number" placeholder="e.g., 2500" value={form.pricePerPuja} onChange={(e) => setForm((f) => ({ ...f, pricePerPuja: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio / About You</label>
                <textarea rows={3} placeholder="Tell families about your experience and expertise..." value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-saffron resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <button key={l} type="button" onClick={() => toggle('languages', l)} className={`text-sm px-3 py-1.5 rounded-full border transition-all ${form.languages.includes(l) ? 'bg-saffron text-white border-saffron' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((s) => (
                    <button key={s} type="button" onClick={() => toggle('specializations', s)} className={`text-sm px-3 py-1.5 rounded-full border transition-all ${form.specializations.includes(s) ? 'bg-saffron text-white border-saffron' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Document Verification</h2>
              <p className="text-sm text-gray-500 mb-5">Upload these documents for verification. This ensures families trust you.</p>
              {[
                { key: 'idProof', label: 'Government ID Proof', desc: 'Aadhaar, PAN, or Voter ID', icon: '🪪' },
                { key: 'qualification', label: 'Religious Qualification', desc: 'Certificate from Gurukul, temple, or institution', icon: '📜' },
                { key: 'addressProof', label: 'Address Proof', desc: 'Utility bill, bank statement, or rental agreement', icon: '🏠' },
              ].map(({ key, label, desc, icon }) => (
                <label key={key} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form[key] ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-orange-200'}`}>
                  <input type="checkbox" checked={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  {form[key] && <CheckCircle size={18} className="text-green-500 ml-auto" />}
                </label>
              ))}
              <p className="text-xs text-gray-400 mt-2">In this demo, just check the checkboxes. In production, actual file upload will be here.</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
                ← Back
              </button>
            )}
            <button
              onClick={step < 2 ? () => setStep((s) => s + 1) : handleSubmit}
              className="flex-1 gradient-saffron text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all"
            >
              {step < 2 ? 'Continue →' : 'Submit Application'}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already registered?{' '}
          <Link to="/pandit/login" className="text-saffron font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
