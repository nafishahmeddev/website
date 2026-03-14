import { useState } from 'react';
import Home from './pages/Home';
import MLRoadmap from './pages/MLRoadmap';
import FrontendRoadmap from './pages/FrontendRoadmap';

type Page = 'home' | 'ml' | 'frontend';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleSelectRoadmap = (roadmap: 'ml' | 'frontend') => {
    setCurrentPage(roadmap);
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' && <Home onSelectRoadmap={handleSelectRoadmap} />}
      {currentPage === 'ml' && <MLRoadmap onBack={handleBack} />}
      {currentPage === 'frontend' && <FrontendRoadmap onBack={handleBack} />}
    </>
  );
}