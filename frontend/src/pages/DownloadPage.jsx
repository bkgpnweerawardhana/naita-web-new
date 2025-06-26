import { FaDownload } from 'react-icons/fa';

import Navbar from '../components/Navbar/Navbar';
import TopBar from '../components/TopBar/TopBar';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import Footer from '../components/Footer/Footer';

const pdfFiles = [
  {
    name: 'Apprentice-Application-form-NEW',
    file: '/files/Apprentice-Application-form-NEW.pdf',
  },
  {
    name: 'CELV-Application',
    file: '/files/CELV-Application.pdf',
  },
  {
    name: 'NVQ-RPL-Application-2025.01.1',
    file: '/files/NVQ-RPL-Application-2025.01.1.pdf',
  },
];

export default function DownloadPage() {
  return (
    <div className="bg-gray-100 pb-96">
        <TopBar/>
                  <Navbar/>
                  
    <div className="min-h-screen bg-gray-100 py-10 px-4">
        
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Download Center
        </h1>
        <ul className="space-y-4">
          {pdfFiles.map((doc, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
            >
              <span className="text-gray-800 font-medium">{doc.name}</span>
              <a
                href={doc.file}
                download
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaDownload />
                <span>Download</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
     <Footer />
    </div>
  );
}
