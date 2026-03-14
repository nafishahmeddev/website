import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import { LoadingFallback } from './components/LoadingFallback';
import { Home } from './components/Home';

const Roadmap = lazy(() => import('./components/Roadmap').then(m => ({ default: m.Roadmap })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<Roadmap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
