import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Inbox, CheckCircle, Clock, Eye, X } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale, SecretariatFormSubmission } from '../../types/portals';

export function SecretariatFormsCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [selectedInquiry, setSelectedInquiry] = useState<SecretariatFormSubmission | null>(null);

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const inquiries = portalStore.getInquiries();

  const handleUpdateStatus = (id: string, newStatus: SecretariatFormSubmission['status']) => {
    portalStore.updateInquiryStatus(id, newStatus);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-[#E5E7EB]">
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
          Institutional Inquiries & Proposals
        </h1>
        <p className="text-xs text-[#4B5563]">
          Manage diplomatic correspondence, investment clearance requests, and consular fast-track submissions.
        </p>
      </div>

      {selectedInquiry && (
        <div className="p-6 rounded-2xl bg-white border-2 border-[var(--color-brand-800)] space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[var(--color-brand-800)] font-bold uppercase">
                INQUIRY DOSSIER #{selectedInquiry.id}
              </span>
              <h3 className="font-serif font-black text-lg text-[#000000]">
                {selectedInquiry.subject}
              </h3>
            </div>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="p-1 text-[#4B5563] hover:text-[#000000] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#4B5563] block">Delegate / Submitter:</span>
              <span className="font-bold text-[#000000]">{selectedInquiry.name}</span>
            </div>
            <div>
              <span className="text-[#4B5563] block">Organization:</span>
              <span className="font-bold text-[#000000]">{selectedInquiry.organization}</span>
            </div>
            <div>
              <span className="text-[#4B5563] block">Email:</span>
              <span className="font-mono text-[#000000]">{selectedInquiry.email}</span>
            </div>
            <div>
              <span className="text-[#4B5563] block">Department:</span>
              <span className="font-mono text-[var(--color-brand-800)] uppercase font-bold">{selectedInquiry.department}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#000000] leading-relaxed">
            {selectedInquiry.message}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#4B5563]">Update Workflow:</span>
              <button
                onClick={() => handleUpdateStatus(selectedInquiry.id, 'in_review')}
                className="px-3 py-1.5 rounded-lg border border-amber-300 text-amber-700 bg-amber-50 text-xs font-bold cursor-pointer"
              >
                Mark In Review
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedInquiry.id, 'resolved')}
                className="px-3 py-1.5 rounded-lg border border-green-300 text-green-700 bg-green-50 text-xs font-bold cursor-pointer"
              >
                Resolve & Clear
              </button>
            </div>

            <button
              onClick={() => setSelectedInquiry(null)}
              className="px-4 py-1.5 rounded-xl border border-[#E5E7EB] text-xs font-bold hover:bg-[#F9FAFB] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">Subject & Submitter</th>
              <th className="p-4 text-start">Department</th>
              <th className="p-4 text-start">Submitted</th>
              <th className="p-4 text-start">Status</th>
              <th className="p-4 text-end">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {inquiries.map(inq => (
              <tr key={inq.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#000000] line-clamp-1">{inq.subject}</div>
                  <div className="text-[11px] text-[#4B5563] mt-0.5">{inq.name} ({inq.organization})</div>
                </td>
                <td className="p-4 font-mono text-[11px] text-[var(--color-brand-800)] uppercase">
                  {inq.department}
                </td>
                <td className="p-4 text-[#4B5563] font-mono text-[11px]">
                  {new Date(inq.submittedAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      inq.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : inq.status === 'in_review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {inq.status}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <button
                    onClick={() => setSelectedInquiry(inq)}
                    className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <Eye size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecretariatFormsCrud;
