import { 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  Headphones, 
  CreditCard, 
  Shield 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070e1b] text-gray-400 font-sans pt-16 pb-10 border-t border-slate-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= උඩ කොටස: Main Footer Grid ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          
          {/* Brand & Socials (Col 1 - 4 Columns Wide) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#00a86b] flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
                U
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Uni<span className="text-[#00c978]">Gig</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              The premier university gig marketplace connecting campus projects and homework help with verified student freelancers.
            </p>

            {/* Social Icons (Inline SVGs) */}
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a 
                href="#github" 
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-[#131c2e] hover:bg-[#1e2b45] flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="#linkedin" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#131c2e] hover:bg-[#1e2b45] flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* Discord */}
              <a 
                href="#discord" 
                aria-label="Discord"
                className="w-9 h-9 rounded-full bg-[#131c2e] hover:bg-[#1e2b45] flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="#instagram" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#131c2e] hover:bg-[#1e2b45] flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Campus Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Campus Categories
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#academics" className="hover:text-white transition-colors">Academics & Tutoring</a></li>
              <li><a href="#coding" className="hover:text-white transition-colors">Coding & Tech Help</a></li>
              <li><a href="#graphics" className="hover:text-white transition-colors">Graphics & UI/UX</a></li>
              <li><a href="#writing" className="hover:text-white transition-colors">Writing & Proofreading</a></li>
              <li><a href="#video" className="hover:text-white transition-colors">Video & Reels</a></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Student Hub
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#browse" className="hover:text-white transition-colors">Browse All Gigs</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Student Dashboard</a></li>
              <li><a href="#applications" className="hover:text-white transition-colors">My Applications</a></li>
              <li><a href="#profile" className="hover:text-white transition-colors">Student Profile</a></li>
              <li><a href="#favorites" className="hover:text-white transition-colors">Saved Favorites</a></li>
            </ul>
          </div>

          {/* Campus Sellers */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Campus Sellers
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#seller-dashboard" className="hover:text-white transition-colors">Seller Dashboard</a></li>
              <li><a href="#post-gig" className="hover:text-white transition-colors">Post a New Gig</a></li>
              <li><a href="#manage-gigs" className="hover:text-white transition-colors">Manage My Gigs</a></li>
              <li><a href="#applicants" className="hover:text-white transition-colors">View Applicants</a></li>
              <li><a href="#public-seller" className="hover:text-white transition-colors">Public Seller Profile</a></li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Trust & Safety
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#00c978] shrink-0" />
                <span>100% Student Verified</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Lock className="w-4 h-4 text-[#00c978] shrink-0" />
                <span>Milestone Escrow Security</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#00c978] shrink-0" />
                <span>Honor Code Integrity</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Headphones className="w-4 h-4 text-[#00c978] shrink-0" />
                <span>24/7 Campus Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ================= යට කොටස: Copyright & Verification Badges ================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Copyright text */}
          <p className="text-gray-500 text-center md:text-left">
            © 2026 UniGig Technologies. Built for university students worldwide.
          </p>

          {/* Peer Collaboration Badges */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-medium">Peer Collaboration:</span>
            
            {/* Student ID Verified Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07241d] border border-[#00c978]/30 text-[#00c978] font-semibold text-xs shadow-sm">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Student ID Verified</span>
            </div>

            {/* Secure Escrow Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07241d] border border-[#00c978]/30 text-[#00c978] font-semibold text-xs shadow-sm">
              <Shield className="w-3.5 h-3.5" />
              <span>Secure Escrow</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}