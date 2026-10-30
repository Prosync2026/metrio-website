import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Briefcase, MapPin, Clock } from 'lucide-react';
import { careersEmail } from '../../data/careers';

/* Pre-filled email: the subject names the role so HR can sort applications,
   the body gives the applicant a short outline to complete. */
const buildMailto = (job) => {
  const subject = `Job Application: ${job.title} (${job.dept}, ${job.location})`;
  const body = [
    'Dear Hiring Team,',
    '',
    `I would like to apply for the position of ${job.title} (${job.dept}, ${job.location}, ${job.type}).`,
    '',
    'Full name:',
    'Phone number:',
    'Current position / company:',
    'Years of experience:',
    'Earliest available start date:',
    '',
    'I have attached my resume for your consideration.',
    '',
    'Thank you.',
  ].join('\n');

  return `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const ApplyDialog = ({ job, onClose }) => {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!job) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const trigger = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    confirmRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      /* Return keyboard focus to the job card that opened the dialog */
      trigger?.focus?.();
    };
  }, [job, onClose]);

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-dialog-title"
        >
          <motion.div
            className="relative w-full max-w-lg bg-white p-7 md:p-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-cream hover:text-dark"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-3">
              Apply by email
            </p>
            <h3 id="apply-dialog-title" className="font-display text-2xl md:text-3xl text-dark mb-4 pr-8">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-gray mb-6">
              <span className="flex items-center gap-2">
                <Briefcase size={14} className="text-gold" />{job.dept}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-gold" />{job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-gold" />{job.type}
              </span>
            </div>

            <p className="text-warm-gray leading-relaxed mb-2">
              This opens your email app with an application for this role, addressed to our hiring
              team. Fill in your details and attach your resume before sending.
            </p>
            <p className="text-sm text-warm-gray mb-8">
              Sending to{' '}
              <span className="font-semibold text-dark select-all">{careersEmail}</span>
            </p>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button type="button" onClick={onClose} className="btn-secondary justify-center">
                Cancel
              </button>
              <a
                ref={confirmRef}
                href={buildMailto(job)}
                onClick={onClose}
                className="btn-primary justify-center"
              >
                <Mail size={16} />
                Open email
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplyDialog;
