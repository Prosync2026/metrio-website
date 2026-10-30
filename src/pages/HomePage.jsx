import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import BusinessGrid from '../components/BusinessGrid';
import StatsBar from '../components/StatsBar';
import ValuesSection from '../components/ValuesSection';
import ProjectPreview from '../components/ProjectPreview';
import NewsHighlights from '../components/NewsHighlights';

const HomePage = () => (
  <>
    <Hero />
    <AboutPreview />
    <BusinessGrid />
    <StatsBar />
    <section className="py-20 md:py-28 bg-linen">
      <div className="container-metrio">
        <ValuesSection />
      </div>
    </section>
    <ProjectPreview />
    <NewsHighlights />
  </>
);

export default HomePage;
