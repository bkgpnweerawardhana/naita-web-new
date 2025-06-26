import TopBar from '../components/TopBar/TopBar';
import Navbar from '../components/Navbar/Navbar';
import Institutions from '../components/Institutions/Institutions';
import Footer from '../components/Footer/Footer';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function InstitutionsPage() {
     const location = useLocation();
     useEffect(() => {
        // Check if there's a hash in the URL (e.g., #district-offices-section)
      
        if (location.hash) {
            // Use a timeout to ensure the DOM is fully rendered before scrolling
            // This is especially useful if content is fetched asynchronously
            const timer = setTimeout(() => {
                const element = document.getElementById(location.hash.substring(1)); // Remove the '#'
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Small delay, adjust if needed

            return () => clearTimeout(timer); // Cleanup the timeout
        }
    }, [location]);
    return (
        <div className="bg-white">
            <TopBar />
            <Navbar />
            <Breadcrumb/>
            <Institutions />
            <Footer />
        </div>
    );
}