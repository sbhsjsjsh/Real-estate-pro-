'use client';

import {useState, useEffect} from 'react';
import {motion} from 'motion/react';
import {Lock, Database, Calendar, User, Phone, Briefcase, Search} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  businessType: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '9931') {
      setIsAuthorized(true);
      fetchLeads();
    } else {
      setError('Invalid password');
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/leads?password=9931`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (err) {
      setError('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.businessType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
        >
          <div className="w-16 h-16 bg-[#004d40]/10 text-[#004d40] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-center text-gray-500 mb-8 text-sm">Enter password to view leads</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              autoFocus
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] outline-none transition-all"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button className="w-full py-4 rounded-xl bg-[#004d40] text-white font-bold hover:bg-[#00695c] transition-colors">
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-[#004d40]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#004d40] text-white rounded-lg">
              <Database size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Leads Dashboard</h1>
              <p className="text-xs text-gray-400">Total Leads: {leads.length}</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm border-transparent focus:bg-white focus:border-[#004d40] outline-none transition-all w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#004d40]/10 border-t-[#004d40] rounded-full animate-spin"></div>
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">WhatsApp</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 font-medium">
                          <User size={14} className="text-[#004d40]/40" />
                          {lead.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                          target="_blank" 
                          className="flex items-center gap-2 text-sm text-[#004d40] hover:underline"
                        >
                          <Phone size={14} />
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#004d40]/10 text-[#004d40]">
                          <Briefcase size={12} />
                          {lead.businessType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No leads found</h3>
            <p className="text-gray-500">When you capture leads, they will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
