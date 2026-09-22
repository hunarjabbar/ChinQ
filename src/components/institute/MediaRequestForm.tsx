import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, User, Building2, Globe, Send, ShieldCheck, Info } from 'lucide-react';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  organization: z.string().min(2, 'Organization is required'),
  email: z.string().email('Invalid email address'),
  requestType: z.enum(['INTERVIEW', 'BRIEFING', 'SYNDICATION', 'DATA_LICENSE']),
  deadline: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about your request')
});

type FormData = z.infer<typeof schema>;

interface MediaRequestFormProps {
  expertName?: string;
  publicationTitle?: string;
  onSuccess?: () => void;
}

export function MediaRequestForm({ expertName, publicationTitle, onSuccess }: MediaRequestFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Media Request Submitted:', { ...data, expertName, publicationTitle });
      toast.success('Institutional Request Submitted', {
        description: 'Our media office will contact you within 4-6 business hours.'
      });
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'Please check your connection and try again.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
            <input 
              {...register('fullName')}
              type="text"
              placeholder="Full Name"
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
            />
          </div>
          {errors.fullName && <p className="text-[10px] text-rose-500 font-bold uppercase">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Organization / Media Outlet</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
            <input 
              {...register('organization')}
              type="text"
              placeholder="e.g. Al Jazeera, Financial Times"
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
            />
          </div>
          {errors.organization && <p className="text-[10px] text-rose-500 font-bold uppercase">{errors.organization.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Official Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
            <input 
              {...register('email')}
              type="email"
              placeholder="name@organization.com"
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
            />
          </div>
          {errors.email && <p className="text-[10px] text-rose-500 font-bold uppercase">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Request Type</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
            <select 
              {...register('requestType')}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] appearance-none transition-all"
            >
              <option value="INTERVIEW">Expert Interview</option>
              <option value="BRIEFING">Institutional Briefing</option>
              <option value="SYNDICATION">Content Syndication</option>
              <option value="DATA_LICENSE">Data Hub API Access</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Inquiry Details</label>
        <textarea 
          {...register('message')}
          rows={4}
          placeholder="Please describe the scope of your request, specific questions, or syndication requirements."
          className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 p-6 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-[#0284C7] transition-all"
        />
        {errors.message && <p className="text-[10px] text-rose-500 font-bold uppercase">{errors.message.message}</p>}
      </div>

      <div className="p-6 bg-[#0F172A] rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3 text-[#D97706]">
          <ShieldCheck size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Verification Requirement</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">
          Media requests are only processed for accredited journalists and institutional researchers. 
          Freelance inquiries must include a letter of assignment.
        </p>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#0284C7] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send size={16} />
            <span>Submit Institutional Request</span>
          </>
        )}
      </button>
    </form>
  );
}
