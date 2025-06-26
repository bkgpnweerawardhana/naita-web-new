// src/pages/Inquiries.jsx
import { PhoneCall } from 'lucide-react';

const Inquiries = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Phone Icon */}
      <PhoneCall className="text-white w-5 h-5" />

      {/* Call Button */}
      <a
        href="tel:+94112888782"
        className="inline-block bg-white text-rose-800 font-semibold px-4 py-1.5 rounded-full shadow-sm hover:bg-red-100 transition-all text-sm"
      >
        📞 Call Us: +94 11 288 8782 – 5
      </a>
    </div>
  );
};

export default Inquiries;
