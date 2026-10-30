// src/pages/Home.jsx
import HeroSection from '../components/HeroSection';
import FeaturedGigs from '../components/FeaturedGigs';
import HowItWorks from '../components/HowItWorks';
import StudentCta from '../components/StudentCta';
import FeaturedFreelancers from '../components/FeaturedFreelancers';
import CampusStories from '../components/CampusStories';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedGigs />
      <HowItWorks />
      <StudentCta />
      <FeaturedFreelancers />
      <CampusStories />
    </>
  );
}