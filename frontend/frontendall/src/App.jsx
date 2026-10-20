import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedGigs from './components/FeaturedGigs';
import HowItWorks from './components/HowItWorks';
import StudentCta from './components/StudentCta';

function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      <main>
        <HeroSection />
        <FeaturedGigs />
        <HowItWorks />
        <StudentCta />
      </main>
    </div>
  );
}

export default App;