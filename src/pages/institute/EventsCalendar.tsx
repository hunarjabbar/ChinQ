import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Clock as ClockIcon, 
  Users, 
  Video, 
  X, 
  Plus, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '../../lib/utils';
import { Button } from '../../components/Button';

const registrationSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  organization: z.string().min(2, 'Organization is required'),
  position: z.string().min(2, 'Job title is required'),
  attendanceType: z.enum(['IN_PERSON', 'VIRTUAL']),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function EventsCalendar() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      attendanceType: 'VIRTUAL'
    }
  });

  const attendanceType = watch('attendanceType');

  const onSubmit = (data: RegistrationFormData) => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedEventId(null);
      reset();
    }, 3000);
  };

  const events = [
    {
      id: '1',
      title: 'Iraq-China Economic Summit & Bilateral Expo 2026',
      date: 'Nov 12-14, 2026',
      location: 'Sulaymaniyah, Kurdistan Region',
      type: 'SUMMIT',
      status: 'REGISTRATION OPEN',
      description: 'The annual high-level summit bringing together sovereign wealth funds, infrastructure ministers, and strategic fellows.',
      attendees: '400+ Delegates',
      isVirtual: true
    },
    {
      id: '2',
      title: 'Digital Silk Road Roundtable: 5G Security',
      date: 'Oct 05, 2026',
      location: 'Virtual / Beijing Hub',
      type: 'WORKSHOP',
      status: 'INVITE ONLY',
      description: 'A technical closed-door session on the deployment of Chinese telecommunications standards in West Asian logistics nodes.',
      attendees: '24 Experts',
      isVirtual: true
    },
    {
      id: '3',
      title: 'Macroeconomic Outlook: CNY/IQD Settlement',
      date: 'Oct 22, 2026',
      location: 'Baghdad Central Hall',
      type: 'FORUM',
      status: 'UPCOMING',
      description: 'Evaluating the first anniversary of direct local currency settlement between the Central Bank of Iraq and Chinese counterparties.',
      attendees: '120 Delegates',
      isVirtual: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-[var(--accent-primary)]">
          <Calendar size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Policy Dialogues</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-[var(--surface-dark)] uppercase tracking-tighter">
          Institutional Events
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] font-medium max-w-2xl leading-relaxed">
          The Institute hosts a series of high-level summits, technical workshops, 
          and policy forums to facilitate direct bilateral exchange.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Upcoming Events</h3>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <button className="text-[var(--accent-primary)] underline underline-offset-4 decoration-[var(--accent-primary)]/30">Chronological</button>
            <button className="text-[var(--color-text-muted)] hover:text-[var(--text-primary)]">By Type</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-[var(--color-snowman)] rounded-3xl p-8 border border-[var(--color-border)] shadow-sm hover:shadow-[var(--shadow-blood-glow)] hover:border-[var(--accent-primary)] transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-snowman-alt)] border border-[var(--color-border)] rounded-2xl w-full lg:w-48 text-center shrink-0">
                  <Calendar size={32} className="text-[var(--accent-primary)] mb-2" />
                  <span className="text-lg font-black text-[var(--surface-dark)] uppercase tracking-tighter">{event.date.split(',')[0]}</span>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{event.date.split(',')[1]}</span>
                </div>

                <div className="flex-grow space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[var(--accent-primary)] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                      {event.type}
                    </span>
                    <span className="bg-[#ecfdf5] text-[var(--color-success)] border border-[#a7f3d0] px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                      {event.status}
                    </span>
                    {event.isVirtual && (
                      <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                        <Video size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Virtual Access</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[var(--surface-dark)] uppercase tracking-tight group-hover:text-[var(--accent-primary)] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-6 text-xs font-bold text-[var(--color-text-muted)]">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[var(--accent-primary)]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[var(--accent-primary)]" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--color-text-muted)] font-medium leading-relaxed max-w-3xl">
                    {event.description}
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-3 w-full lg:w-auto">
                  <Button 
                    variant={event.status === 'INVITE ONLY' ? 'secondary' : 'primary'}
                    size="md"
                    onClick={() => setSelectedEventId(event.id)}
                    className="w-full lg:w-48 font-black uppercase tracking-widest"
                    disabled={event.status === 'INVITE ONLY'}
                  >
                    {event.status === 'INVITE ONLY' ? 'Invite Only' : 'Register Now'}
                  </Button>
                  <Button 
                    variant="outline"
                    size="md"
                    className="w-full lg:w-48 font-black uppercase tracking-widest"
                  >
                    View Agenda
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events Archive Link */}
      <div className="pt-8 text-center">
        <Link to={`/${lang}/institute/publications?type=ANNUAL_REPORT`} className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-snowman-alt)] border border-[var(--color-border)] rounded-2xl text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all">
          <ClockIcon size={18} />
          <span>View Past Events Archive</span>
        </Link>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedEventId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEventId(null)}
              className="absolute inset-0 bg-[var(--surface-dark)]/85 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[var(--color-snowman)] rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden border border-[var(--color-border)]"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[var(--surface-dark)] uppercase tracking-tighter">Event Registration</h2>
                    <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">
                      {events.find(e => e.id === selectedEventId)?.title}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedEventId(null)}
                    className="p-2 hover:bg-[var(--color-snowman-alt)] rounded-full transition-colors text-[var(--color-text-muted)] hover:text-[var(--text-primary)]"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-[#ecfdf5] border border-[#a7f3d0] text-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-black text-[var(--surface-dark)] uppercase tracking-tight">Registration Received</h3>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium">
                      Your request has been logged. Our protocol team will review your application 
                      and send institutional credentials within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Full Name</label>
                        <input 
                          {...register('name')}
                          className={cn(
                            "w-full bg-[var(--color-snowman-alt)] border rounded-xl px-4 py-3 text-xs font-bold outline-none transition-all text-[var(--text-primary)]",
                            errors.name ? "border-[var(--color-error)]" : "border-[var(--color-border)] focus:border-[var(--accent-primary)]"
                          )}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Institutional Email</label>
                        <input 
                          {...register('email')}
                          className={cn(
                            "w-full bg-[var(--color-snowman-alt)] border rounded-xl px-4 py-3 text-xs font-bold outline-none transition-all text-[var(--text-primary)]",
                            errors.email ? "border-[var(--color-error)]" : "border-[var(--color-border)] focus:border-[var(--accent-primary)]"
                          )}
                          placeholder="j.doe@org.gov"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Organization</label>
                        <input 
                          {...register('organization')}
                          className={cn(
                            "w-full bg-[var(--color-snowman-alt)] border rounded-xl px-4 py-3 text-xs font-bold outline-none transition-all text-[var(--text-primary)]",
                            errors.organization ? "border-[var(--color-error)]" : "border-[var(--color-border)] focus:border-[var(--accent-primary)]"
                          )}
                          placeholder="Ministry of Trade"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Official Position</label>
                        <input 
                          {...register('position')}
                          className={cn(
                            "w-full bg-[var(--color-snowman-alt)] border rounded-xl px-4 py-3 text-xs font-bold outline-none transition-all text-[var(--text-primary)]",
                            errors.position ? "border-[var(--color-error)]" : "border-[var(--color-border)] focus:border-[var(--accent-primary)]"
                          )}
                          placeholder="Director General"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Attendance Modality</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => reset({ ...watch(), attendanceType: 'VIRTUAL' })}
                          className={cn(
                            "p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all text-center",
                            attendanceType === 'VIRTUAL' 
                              ? "border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--accent-text)]" 
                              : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                          )}
                        >
                          Virtual / Remote
                        </button>
                        <button
                          type="button"
                          onClick={() => reset({ ...watch(), attendanceType: 'IN_PERSON' })}
                          className={cn(
                            "p-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all text-center",
                            attendanceType === 'IN_PERSON' 
                              ? "border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--accent-text)]" 
                              : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                          )}
                        >
                          In-Person Presence
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full font-black uppercase tracking-widest"
                    >
                      Complete Registration
                    </Button>
                  </form>
                )}

                <div className="pt-6 border-t border-[var(--color-border)] flex items-center gap-3 text-[var(--color-text-muted)]">
                  <AlertCircle size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Formal credentials required for diplomatic forums</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default EventsCalendar;
