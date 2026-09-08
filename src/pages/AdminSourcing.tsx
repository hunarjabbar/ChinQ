import React, { useState, useEffect } from 'react';
import { Mail, Search, CheckCircle, Clock, XCircle, MoreVertical, Eye, Calendar, Building2, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminSourcing() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/sourcing', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        setInquiries(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/sourcing/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchInquiries();
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateAdminNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/admin/sourcing/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ adminNotes: notes })
      });
      if (res.ok) {
        fetchInquiries();
        setSelectedInquiry({ ...selectedInquiry, adminNotes: notes });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REVIEWED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTACTED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CLOSED': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.replace('_', ' ');
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-brand-800 uppercase">Sourcing Inquiries</h1>
        <p className="text-gray-500 font-medium text-xs mt-1">Manage global sourcing requests, factory audits, and logistics support tickets.</p>
      </div>

      <div className="bg-white border border-gray-200 flex-1 overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="border-b border-gray-200 text-xs uppercase font-black text-gray-500 tracking-wider">
                <th className="p-4">Ticket ID</th>
                <th className="p-4">Client</th>
                <th className="p-4">Company</th>
                <th className="p-4">Inquiry Type</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium text-gray-700">
              {inquiries.map(inquiry => (
                <tr key={inquiry.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedInquiry(inquiry)}>
                  <td className="p-4 font-bold text-brand-800">{inquiry.ticketId}</td>
                  <td className="p-4">
                    <div className="font-bold text-ink-900">{inquiry.fullName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{inquiry.email}</div>
                  </td>
                  <td className="p-4">{inquiry.company}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">{getTypeLabel(inquiry.inquiryType)}</span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-black tracking-widest uppercase border ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-brand-800 p-1"><Eye size={16} /></button>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 font-sans italic">No sourcing inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)}>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-gray-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-black font-bold text-brand-800">Inquiry Details</h2>
                    <span className={`px-2 py-1 text-xs font-black tracking-widest uppercase border ${getStatusColor(selectedInquiry.status)}`}>
                      {selectedInquiry.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Ticket size={12}/> {selectedInquiry.ticketId}</span>
                    <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedInquiry(null)} className="text-gray-400 hover:text-gray-800 bg-white p-2 border border-gray-200 shadow-sm"><XCircle size={20} /></button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Client Information</h3>
                    <div className="font-bold text-sm text-ink-900 mb-1">{selectedInquiry.fullName}</div>
                    <div className="text-xs flex items-center gap-2 text-gray-600 mb-2"><Mail size={12}/> {selectedInquiry.email}</div>
                    <div className="text-xs flex items-center gap-2 text-gray-600"><Building2 size={12}/> {selectedInquiry.company}</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Request Parameters</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500">Type</span>
                        <span className="font-bold">{getTypeLabel(selectedInquiry.inquiryType)}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500">Market</span>
                        <span className="font-bold">{selectedInquiry.targetMarket}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Message</h3>
                  <div className="bg-gray-50 p-4 border border-gray-200 text-sm font-sans leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Internal Admin Notes</h3>
                  <textarea 
                    className="w-full text-xs p-3 border border-gray-300 focus:border-brand-800 focus:outline-none min-h-[100px] resize-none"
                    placeholder="Add internal notes about this inquiry..."
                    defaultValue={selectedInquiry.adminNotes}
                    onBlur={(e) => updateAdminNotes(selectedInquiry.id, e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1 italic">Notes are saved automatically on blur.</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => updateStatus(selectedInquiry.id, 'PENDING')}
                      className={`text-xs px-4 py-2 font-bold uppercase tracking-wider border ${selectedInquiry.status === 'PENDING' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Pending
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedInquiry.id, 'REVIEWED')}
                      className={`text-xs px-4 py-2 font-bold uppercase tracking-wider border ${selectedInquiry.status === 'REVIEWED' ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Reviewed
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedInquiry.id, 'CONTACTED')}
                      className={`text-xs px-4 py-2 font-bold uppercase tracking-wider border ${selectedInquiry.status === 'CONTACTED' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Contacted
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedInquiry.id, 'CLOSED')}
                      className={`text-xs px-4 py-2 font-bold uppercase tracking-wider border ${selectedInquiry.status === 'CLOSED' ? 'bg-gray-200 border-gray-300 text-gray-800' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      Closed
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
