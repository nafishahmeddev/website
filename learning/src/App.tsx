import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import { LoadingFallback } from './components/LoadingFallback';
import { Home } from './components/Home';
import { TopicLayout } from './components/TopicLayout';

const Roadmap = lazy(() => import('./components/Roadmap').then(m => ({ default: m.Roadmap })));

// Phase 1 - Topic 1: Python for ML
const T1_1_Overview = lazy(() => import('./content/phase1/t1_1/Overview').then(m => ({ default: m.default })));
const T1_1_Basics = lazy(() => import('./content/phase1/t1_1/PythonBasics').then(m => ({ default: m.default })));
const T1_1_DataTypes = lazy(() => import('./content/phase1/t1_1/DataTypes').then(m => ({ default: m.default })));
const T1_1_Comprehensions = lazy(() => import('./content/phase1/t1_1/ListComprehensions').then(m => ({ default: m.default })));
const T1_1_Functions = lazy(() => import('./content/phase1/t1_1/FunctionsLambdas').then(m => ({ default: m.default })));
const T1_1_Modules = lazy(() => import('./content/phase1/t1_1/ModulesPackages').then(m => ({ default: m.default })));

// Phase 1 - Topic 2: NumPy
const T1_2_Overview = lazy(() => import('./content/phase1/t1_2/Overview').then(m => ({ default: m.default })));
const T1_2_Vs = lazy(() => import('./content/phase1/t1_2/NumPyVsLists').then(m => ({ default: m.default })));
const T1_2_Shapes = lazy(() => import('./content/phase1/t1_2/ShapesIndexing').then(m => ({ default: m.default })));
const T1_2_Broadcasting = lazy(() => import('./content/phase1/t1_2/BroadcastingVectorization').then(m => ({ default: m.default })));
const T1_2_Functions = lazy(() => import('./content/phase1/t1_2/CommonFunctions').then(m => ({ default: m.default })));
const T1_2_Perf = lazy(() => import('./content/phase1/t1_2/Performance').then(m => ({ default: m.default })));

// Phase 1 - Topic 3: Pandas
const T1_3_Overview = lazy(() => import('./content/phase1/t1_3/Overview').then(m => ({ default: m.default })));
const T1_3_Series = lazy(() => import('./content/phase1/t1_3/SeriesDataFrames').then(m => ({ default: m.default })));
const T1_3_Selection = lazy(() => import('./content/phase1/t1_3/SelectionFiltering').then(m => ({ default: m.default })));
const T1_3_GroupBy = lazy(() => import('./content/phase1/t1_3/GroupByAggregation').then(m => ({ default: m.default })));
const T1_3_Missing = lazy(() => import('./content/phase1/t1_3/MissingData').then(m => ({ default: m.default })));
const T1_3_Merging = lazy(() => import('./content/phase1/t1_3/MergingJoining').then(m => ({ default: m.default })));

// Phase 1 - Topic 4: Data Visualization
const T1_4_Overview = lazy(() => import('./content/phase1/t1_4/Overview').then(m => ({ default: m.default })));
const T1_4_Matplotlib = lazy(() => import('./content/phase1/t1_4/MatplotlibBasics').then(m => ({ default: m.default })));
const T1_4_Seaborn = lazy(() => import('./content/phase1/t1_4/SeabornArt').then(m => ({ default: m.default })));

// Phase 1 - Topic 5: Linear Algebra
const T1_5_Overview = lazy(() => import('./content/phase1/t1_5/Overview').then(m => ({ default: m.default })));
const T1_5_Vectors = lazy(() => import('./content/phase1/t1_5/VectorsSpaces').then(m => ({ default: m.default })));
const T1_5_Matrices = lazy(() => import('./content/phase1/t1_5/MatricesTransformations').then(m => ({ default: m.default })));

// Phase 1 - Topic 6: Calculus
const T1_6_Derivatives = lazy(() => import('./content/phase1/t1_6/Derivatives').then(m => ({ default: m.default })));

// Phase 1 - Topic 7: Probability
const T1_7_Distributions = lazy(() => import('./content/phase1/t1_7/ProbabilityDist').then(m => ({ default: m.default })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Component-Based Static Routing */}
          <Route path="/topic/python-for-ml" element={<TopicLayout />}>
            <Route path="overview" element={<T1_1_Overview />} />
            <Route path="python-basics" element={<T1_1_Basics />} />
            <Route path="data-types" element={<T1_1_DataTypes />} />
            <Route path="list-comprehensions" element={<T1_1_Comprehensions />} />
            <Route path="functions-lambdas" element={<T1_1_Functions />} />
            <Route path="modules-packages" element={<T1_1_Modules />} />
            <Route index element={<Navigate to="overview" replace />} />
          </Route>

          <Route path="/topic/numpy-arrays" element={<TopicLayout />}>
            <Route path="overview" element={<T1_2_Overview />} />
            <Route path="numpy-vs-lists" element={<T1_2_Vs />} />
            <Route path="shapes-indexing" element={<T1_2_Shapes />} />
            <Route path="broadcasting-vectorization" element={<T1_2_Broadcasting />} />
            <Route path="common-functions" element={<T1_2_Functions />} />
            <Route path="performance" element={<T1_2_Perf />} />
            <Route index element={<Navigate to="overview" replace />} />
          </Route>

          <Route path="/topic/pandas-dataframes" element={<TopicLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<T1_3_Overview />} />
            <Route path="series-dataframes" element={<T1_3_Series />} />
            <Route path="selection-filtering" element={<T1_3_Selection />} />
            <Route path="groupby-aggregation" element={<T1_3_GroupBy />} />
            <Route path="missing-data" element={<T1_3_Missing />} />
            <Route path="merging-joining" element={<T1_3_Merging />} />
          </Route>

          <Route path="/topic/data-visualization" element={<TopicLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<T1_4_Overview />} />
            <Route path="matplotlib-basics" element={<T1_4_Matplotlib />} />
            <Route path="seaborn-art" element={<T1_4_Seaborn />} />
          </Route>

          <Route path="/topic/linear-algebra" element={<TopicLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<T1_5_Overview />} />
            <Route path="vectors-spaces" element={<T1_5_Vectors />} />
            <Route path="matrices-transformations" element={<T1_5_Matrices />} />
          </Route>

          <Route path="/topic/calculus" element={<TopicLayout />}>
             <Route index element={<Navigate to="derivatives" replace />} />
             <Route path="derivatives" element={<T1_6_Derivatives />} />
          </Route>

          <Route path="/topic/probability" element={<TopicLayout />}>
             <Route index element={<Navigate to="probability-dist" replace />} />
             <Route path="probability-dist" element={<T1_7_Distributions />} />
          </Route>

          {/* Fallback for other topics (can use dynamic segment if not yet componentized) */}
          <Route path="/topic/:topicSlug" element={<TopicLayout />}>
             <Route path=":lessonId" element={<div className="p-20 text-center">Component coming soon...</div>} />
             <Route index element={<Navigate to="overview" replace />} />
          </Route>

          {/* Legacy route compatibility / fallback */}
          <Route path="/roadmap/:topicId" element={<Roadmap />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
