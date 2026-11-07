import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import FreelancerCard from './FreelancerCard';

export default function FeaturedFreelancers() {
  const freelancers = [
    {
      id: 1,
      name: 'Sanduni Fernando',
      school: 'UoP • Mathematics',
      badge: "Dean's List",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      rating: '4.9',
      completedOrders: '140+ Completed',
      skills: ['Calculus', 'Linear Algebra', 'Exam Prep', 'LaTeX'],
    },
    {
      id: 2,
      name: 'Dulaksha Nipun',
      school: 'SEUSL • Computer Science',
      badge: 'Top Rated Seller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: '5.0',
      completedOrders: '98+ Completed',
      skills: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'],
    },
    {
      id: 3,
      name: 'Kavindu Senanayake',
      school: 'UoM • Visual & Tech Design',
      badge: 'Featured Creator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: '4.8',
      completedOrders: '75+ Completed',
      skills: ['Figma', 'Poster Design', 'Branding', 'Illustrator'],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-sans">
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] p-6 sm:p-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Top Campus Talent</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Student Freelancers
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Vetted student leaders ready to help with your academic projects and campus tasks
            </p>
          </div>

          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#007a4d] hover:text-[#006640] transition-colors group"
          >
            <span>View All Freelancers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <FreelancerCard
              key={freelancer.id}
              freelancer={freelancer}
            />
          ))}
        </div>

      </div>
    </section>
  );
}