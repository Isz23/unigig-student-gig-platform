import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedGigs from './components/FeaturedGigs';
import HowItWorks from './components/HowItWorks';
import StudentCta from './components/StudentCta';
import CampusStories from './components/CampusStories';
import FeaturedFreelancers from './components/FeaturedFreelancers';
import Footer from './components/Footer';



function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      <main>
        <HeroSection />
        <FeaturedGigs />
        <HowItWorks />
        <StudentCta />
        <CampusStories />
        <FeaturedFreelancers />
      </main>
      <Footer />
    </div>
  );
}

export default App;