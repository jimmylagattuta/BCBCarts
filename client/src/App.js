// App.js
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from './utils/ScrollToTop';

// Lazy load your routes/components as needed
const Home = lazy(() => import("./utilities/Home"));
const LocationsPage = lazy(() => import("./pages/LocationsPage"));
const Services = lazy(() => import("./pages/Services"));
const PrivacyPolicy = lazy(() => import("./sections/PrivacyPolicy"));
const FAQ = lazy(() => import("./pages/main/FAQ"));
const AboutUs = lazy(() => import("./pages/AboutUs")); // Import AboutUs
const CarRentals = lazy(() => import("./pages/CarRentals"));
const Blogs = lazy(() => import("./pages/Blogs")); // or "./pages/main/Blogs" if stored there
const BlogDetail = lazy(() => import("./pages/BlogDetail")); // add this line

// Add more routes as needed

function App() {

  console.log(process.env.REACT_APP_RECAPTCHA);

  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <main className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:locationId" element={<LocationsPage />} />


            <Route path="/contact" element={<LocationsPage />} />
            <Route path="/services/:serviceId?" element={<Services />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* Other routes */}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
