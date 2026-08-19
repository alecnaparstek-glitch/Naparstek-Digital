import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Services from "@/pages/Services";
import Process from "@/pages/Process";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

const Page = ({ children }) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.main>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/work" element={<Page><Work /></Page>} />
        <Route path="/services" element={<Page><Services /></Page>} />
        <Route path="/process" element={<Page><Process /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <div className="noise-overlay" />
      <BrowserRouter>
        <SmoothScroll>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </SmoothScroll>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
