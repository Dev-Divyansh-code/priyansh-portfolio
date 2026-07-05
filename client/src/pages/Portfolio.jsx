import { useEffect, useState } from 'react';
import { fetchProfile, fetchProjects, fetchWorks } from '../api/client';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import WorkGallery from '../components/WorkGallery';

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [works, setWorks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchProfile(), fetchWorks(), fetchProjects()])
      .then(([p, w, pr]) => {
        setProfile(p);
        setWorks(w);
        setProjects(pr);
      })
      .catch(() => {
        setError('Could not connect to the server. Make sure MongoDB is running and you ran: npm run seed');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-xblank px-4 font-title text-xghoststroke">
        Loading portfolio...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-xblank px-6 text-center">
        <h1 className="font-serif text-2xl text-xstroke sm:text-3xl">Server not connected</h1>
        <p className="max-w-md text-sm text-xghoststroke">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-content" id="top">
      <div className="pointer-events-none fixed top-0 z-50 hidden h-20 w-full bg-gradient-to-t from-xblank/0 to-xblank sm:block" />
      <div className="pointer-events-none fixed bottom-0 z-40 hidden h-20 w-full bg-gradient-to-b from-xblank/0 to-xblank sm:block" />

      <Navbar socials={profile.socials} />
      <main className="flex flex-col items-center">
        <Hero profile={profile} />
        <WorkGallery works={works} />
        <Projects projects={projects} />
        <About profile={profile} />
        <Contact socials={profile.socials} />
        <Footer name={profile.name} />
      </main>
    </div>
  );
}