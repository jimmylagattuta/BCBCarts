import React, { lazy, Suspense, useEffect, useState } from 'react';


// Lazy-load everything else:
const LazySocial = lazy(() => import('../components/Social'));
const LazyReviewsComponent = lazy(() => import('../components/ReviewsComponent'));

const Home = ({ scrollToContact, reviews }) => {
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);

  // Decide when to load the rest: immediately, after a small delay, or on user action
  useEffect(() => {
    // Example: load them immediately after Home mounts
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 0); // or 1000ms, 2000ms, etc.

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Eager-load only Intro */}


      {/* Conditionally render everything else */}
      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazySocial />
          <LazyReviewsComponent reviews={reviews} />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
