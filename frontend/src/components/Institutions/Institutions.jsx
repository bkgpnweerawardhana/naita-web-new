import { useState, useEffect } from 'react';
import { getInstitutions } from '../../services/InstitutionService';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../TopBar/TopBar';


export default function Institutions() {
    const [headOffice, setHeadOffice] = useState(null);
    const [nationalInstitutions, setNationalInstitutions] = useState([]);
    const [districtOffices, setDistrictOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeMap, setActiveMap] = useState(null);
    const { language } = useLanguage();

 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all institutions
                const institutions = await getInstitutions(language);
                
                
                // Filter by type
                const headOfficeData = institutions.find(inst => inst.type === 'HEAD');
                const nationalData = institutions.filter(inst => inst.type === 'NATIONAL');
                const districtData = institutions.filter(inst => inst.type === 'DISTRICT');
            
                setHeadOffice(headOfficeData || null);
                setNationalInstitutions(nationalData);
                setDistrictOffices(districtData);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [language]);  // This will re-fetch data if the language changes

    if (loading) return <div className="text-center py-12">Loading institutions...</div>;
    if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
 
    return (
        <>
    
        <div className="main-container bg-gray-100 pb-10">
            {/* Head Office Section */}
            {headOffice && (
                <div className="head-office-container relative mx-2 mb-20">
                    <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                        {headOffice.image_url ? (
                            <img src={headOffice.image_url} alt={headOffice.name} className="w-full h-full object-cover object-center" />
                        ) : (
                            <div className="w-full h-full bg-gray-300"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                        <div className="absolute top-6 left-6 bg-white/80 rounded-full px-5 py-2 shadow text-red-800 font-bold text-lg flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
                            </svg>
                            Head Office
                        </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto -mt-20 relative z-10">
                        <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-shrink-0 hidden md:block">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-700" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M24 4c-7.18 0-13 5.82-13 13 0 9.5 13 27 13 27s13-17.5 13-27c0-7.18-5.82-13-13-13zm0 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                                </svg>
                            </div>
                            
                            <div className="flex-1">
                                <div className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">{headOffice.name}</div>
                                <div className="text-lg text-gray-600 mb-4">
                                    {headOffice.description || 'The head office serves as the central hub for coordinating vocational training and apprenticeship programs.'}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
                                        </svg>
                                        <span>{headOffice.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                                        </svg>
                                        <span>{headOffice.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <ellipse cx="12" cy="12" rx="6" ry="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span><a href={headOffice.website} className="hover:underline text-blue-700" target="_blank" rel="noreferrer">{headOffice.website}</a></span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm13.707 7.293a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0l2 2z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.05a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.98.35 2 .59 3.05.72A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>{headOffice.phone1} {headOffice.phone2 && `| ${headOffice.phone2}`}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <button 
                                        onClick={() => setActiveMap(headOffice)}
                                        className="inline-flex items-center gap-2 px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 12.414a4 4 0 1 0-1.414 1.414l4.243 4.243a1 1 0 0 0 1.414-1.414z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
                                        </svg>
                                        View on Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* National Institutions Section */}
            <div id='national-institutes-section' className="mt-60">
                <div className="text-xl font-semibold text-gray-800 mb-8">National Institutions</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
                    {nationalInstitutions.map((institution) => (
                        <div key={institution.id} className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {institution.image_url ? (
                                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${institution.image_url})` }}></div>
                            ) : (
                                <div className="h-48 bg-gray-300"></div>
                            )}
                            
                            <div className="p-6 flex flex-col flex-1">
                                <div className="text-lg font-bold text-gray-800 mb-2">{institution.name}</div>
                                <div className="text-base text-gray-600 mb-4 flex-1">
                                    {institution.description || `${institution.name} is one of Sri Lanka's premier institutions.`}
                                </div>
                                
                                <div className="details text-base text-gray-600 flex flex-col gap-y-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
                                        </svg>
                                        <span>{institution.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                                        </svg>
                                        <span>{institution.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <ellipse cx="12" cy="12" rx="6" ry="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span><a href={institution.website} className="hover:underline text-blue-700" target="_blank" rel="noreferrer">{institution.website}</a></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm13.707 7.293a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0l2 2z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.05a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.98.35 2 .59 3.05.72A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>{institution.phone1} {institution.phone2 && `| ${institution.phone2}`}</span>
                                    </div>
                                </div>
                                
                                <div 
                                    className="text-base font-semibold text-red-800 text-end cursor-pointer mt-auto"
                                    onClick={() => setActiveMap(institution)}
                                >
                                    view on map
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* District Offices Section */}
            <div id="district-offices-section" className="mt-10 mx-4">
                <div className="text-xl font-semibold text-gray-800 mb-5">District Offices</div>
                <div className="overflow-x-auto">
                    <div className="flex gap-6 min-w-[1200px]">
                        {districtOffices.map((office) => (
                            <div key={office.id} className="bg-white rounded-sm shadow-sm min-w-[300px]">
                                {office.image_url ? (
                                    <div className="w-full h-[264px] bg-cover" style={{ backgroundImage: `url(${office.image_url})` }}></div>
                                ) : (
                                    <div className="w-full h-[264px] bg-gray-300"></div>
                                )}
                                
                                <div className="p-4">
                                    <div className="text-xl font-semibold text-gray-800">{office.city}</div>
                                    <div className="details-container mt-5">
                                        <div className="details text-base text-gray-600 flex flex-col gap-y-2">
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
                                                </svg>
                                                <span>{office.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                                                </svg>
                                                <span>{office.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    <ellipse cx="12" cy="12" rx="6" ry="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                                <span><a href={office.website} className="hover:underline text-blue-700" target="_blank" rel="noreferrer">{office.website}</a></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm13.707 7.293a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414l2-2a1 1 0 0 1 1.414 0l2 2z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.05a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.98.35 2 .59 3.05.72A2 2 0 0 1 22 16.92z"/>
                                                </svg>
                                                <span>{office.phone1} {office.phone2 && `| ${office.phone2}`}</span>
                                            </div>
                                        </div>
                                        
                                        <div 
                                            className="text-base font-semibold text-red-800 text-end cursor-pointer"
                                            onClick={() => setActiveMap(office)}
                                        >
                                            view on map
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {   console.log('google map link',activeMap)}
            {/* Map Modal */}
            {activeMap && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fade-in">
                        <button 
                            onClick={() => setActiveMap(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <div className="text-xl font-bold mb-3 text-gray-800">{activeMap.name} Location</div>
                        <iframe
                            src={activeMap.google_map_link}
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .head-office-container .max-w-3xl {
                        margin-top: -3rem !important;
                    }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease;
                }
            `}</style>
        </div>
        </>
    );
}

