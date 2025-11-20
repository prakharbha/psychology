'use client';

import { useState, useEffect } from 'react';

interface CatalogueDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogueDownloadModal({ isOpen, onClose }: CatalogueDownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name.trim() || !formData.mobile.trim()) {
        setError('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }

      // Validate mobile number (basic validation)
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
        setError('Please enter a valid 10-digit mobile number');
        setIsSubmitting(false);
        return;
      }

      // Send notification to Telegram (optional)
      try {
        const telegramMessage = `📥 *Catalog Download Request*\n\n` +
          `👤 *Name:* ${formData.name}\n` +
          `📱 *Mobile:* ${formData.mobile}\n` +
          `📄 *Catalog:* 2025 Catalog`;

        await fetch('/api/telegram/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: telegramMessage }),
        });
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError);
        // Continue with download even if notification fails
      }

      // Download the catalog
      const link = document.createElement('a');
      link.href = '/catalogue-2025.pdf';
      link.download = 'Prakhar_Psychological_Testing_Catalogue_2025.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal after download
      setTimeout(() => {
        onClose();
        setFormData({ name: '', mobile: '' });
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error('Error downloading catalog:', error);
      setError('Failed to download catalog. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData({ ...formData, [name]: digitsOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[111] flex items-center justify-center p-4">
        <div
          className="glass-card rounded-2xl p-8 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
            Download 2025 Catalog
          </h2>
          <p className="text-slate-600 mb-6">
            Please provide your details to download our catalog
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-blue-700 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-blue-700 transition-all"
                placeholder="10-digit mobile number"
                maxLength={10}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-dark-blue-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Downloading...' : 'Download Catalog'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

