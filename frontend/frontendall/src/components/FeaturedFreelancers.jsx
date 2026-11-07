import FreelancerCard from './FreelancerCard';

export default function FeaturedFreelancers() {
  // Freelancers Data Array
  const freelancers = [
    {
      id: 1,
      name: 'Alex Chen',
      school: 'MIT • Mathematics',
      badge: "Dean's List",
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      rating: '4.9',
      completedOrders: '140+ Completed',
      skills: ['Calculus', 'Linear Algebra', 'Exam Prep', 'LaTeX'],
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      school: 'Stanford • Computer Science',
      badge: 'Level 2 Seller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: '5.0',
      completedOrders: '98+ Completed',
      skills: ['React', 'JavaScript', 'CSS/HTML', 'Python'],
    },
    {
      id: 3,
      name: 'Marcus Vance',
      school: 'Brown • Visual Arts',
      badge: 'Featured Creator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: '4.8',
      completedOrders: '75+ Completed',
      skills: ['Figma', 'Poster Design', 'Branding', 'Photoshop'],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-sans">
      {/* Outer Border Box */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] p-6 sm:p-10">
        
        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#00875a]">
            Top Campus Talent
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-1">
            Featured Student Freelancers
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Vetted student leaders ready to help with your projects
          </p>
        </div>

        {/* Freelancers Grid */}
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