import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import { useEffect, useState } from 'react';
import { 
    getBoardMembers, 
    getQualityPolicy, 
    getObjectives 
} from '../services/AboutUsService';
import BoardMemberCard from '../components/AboutUs/BoardMemberCard';
import TopBar from '../components/TopBar/TopBar';

import aboutus from '../assets/naita-aboutus.jpeg';
import Footer from '../components/Footer/Footer';

export default function AboutUs() {
    const [boardMembers, setBoardMembers] = useState({
        minister: [],
        deputy: [],
        director: [],
        management: []
    });
    const [qualityPolicy, setQualityPolicy] = useState('');
    const [objectives, setObjectives] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [members, policy, objectivesData] = await Promise.all([
                    fetchBoardMembers(),
                    getQualityPolicy(),
                    getObjectives()
                ]);
                
                setBoardMembers(members);
                setQualityPolicy(policy?.content || '');
                setObjectives(objectivesData);
            } catch (error) {
                console.error('Failed to load about us data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchBoardMembers = async () => {
            const [minister, deputy, director, management] = await Promise.all([
                getBoardMembers('minister'),
                getBoardMembers('deputy'),
                getBoardMembers('director'),
                getBoardMembers('management')
            ]);
            
            return {
                minister,
                deputy,
                director,
                management
            };
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Loading about us data...</div>;
    }

    return (
        <div className="bg-gray-100 pb-96">
          {/* Navbar */}
          <TopBar/>
          <Navbar/>
        
            {/* Hero Section */}
            <div className="relative h-48 w-full overflow-hidden lg:h-64">
                <div className="absolute inset-0 z-0 bg-red-800"></div>
                <div
                  className="absolute right-0 top-0 h-full w-[150px] lg:w-[200px] bg-cover bg-center opacity-20 lg:opacity-40"
                  style={{
                    backgroundImage: `url(${aboutus})`,
                    maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                  }}
                ></div>

                <div className="hero-container relative z-20">
                    <div className="absolute z-20 p-4 lg:max-w-[960px] text-center">
                         <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide lg:text-5xl">
                            Who We Are
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-100 max-w-4xl mx-auto lg:text-xl">
                            <span className="italic text-red-200">The National Apprentice and Industrial Training Authority (NAITA)</span> is a Sri Lankan government body focused on vocational and technical training for youth. Established under the <strong className="text-white">Tertiary and Vocational Education Act No. 20 of 1990</strong>, NAITA succeeded the National Apprenticeship Board (NAB). Our mission is to <span className="text-red-100 font-medium">empower the nation’s youth</span> with industry-relevant skills through robust, accessible training programs.
                        </p>
                    </div>
                    </div><div className="container mx-auto px-4">
                        
                </div>
            </div>


            {/* History Section */}
            <div className="history-main-container mx-4 mt-10 lg:mt-20">
                <div className="text-xl font-bold text-gray-700 mb-4 lg:text-2xl">
                    <h1>Our History</h1>
                </div>

                {/* Timeline Items */}
                {[
                    {
                        year: "1971",
                        title: "National Apprentice Board(NAB) was founded",
                        points: [
                            "Established to Regulate and coordinate Apprenticeship Training",
                            "Developed with support from United Nations and ILO"
                        ]
                    },
                    {
                        year: "1981",
                        title: "Apprenticeship Training Institute Established",
                        points: [
                            "Set up with support from the Federal Republic of Germany"
                        ]
                    },
                    {
                        year: "1984",
                        title: "Technical Training Institute Established",
                        points: [
                            "Developed with assistance from UNDP & ILO to expand training programs"
                        ]
                    },
                    {
                        year: "1989",
                        title: "Automobile Engineering Training Institute Launched",
                        points: [
                            "Established in partnership with Japan to specialize in automotive skills"
                        ]
                    },
                    {
                        year: "1990",
                        title: "NAITA Formed Under TVE Act No. 20",
                        points: [
                            "National Apprentice & Industrial Training Authority (NAITA) replaced NAB with a broader mandate to drive vocational and industrial training"
                        ]
                    }
                ].map((item, index) => (
                    <div key={index} className="grid grid-cols-10">
                        <div className="timeline-style-container ml-3 lg:ml-10">
                            <div className="w-1 h-full flex flex-col items-center justify-start overflow-visible bg-red-800 lg:w-[6px]">
                                <div className="w-5 h-5 my-4 bg-red-800 rounded-full lg:min-w-7 lg:min-h-7 lg:my-8"></div>
                            </div>
                        </div>
                        <div className="col-span-9 my-4 mr-2 lg:my-8">
                            <div className="text-justify text-base font-semibold flex flex-row mb-5 text-gray-700 lg:text-xl">
                                <span className="text-nowrap text-red-800">{item.year} - </span>
                                <span>{item.title}</span>
                            </div>
                            {item.points.map((point, i) => (
                                <div key={i} className="flex flex-row gap-x-2 items-baseline mb-2">
                                    <div className="min-w-2 min-h-2 bg-gray-700 rounded-full lg:min-w-3 lg:min-h-3"></div>
                                    <div className="text-base text-justify text-gray-600 lg:text-xl">
                                        <p>{point}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Vision & Mission Section */}
            <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between lg:mx-20">
                {/* Vision */}
                <div className="vision-main-container flex flex-col justify-center items-center w-full lg:h-96">
                    <div className="bg-[url(bulb.png)] w-36 h-36 bg-contain bg-no-repeat"></div>
                    <div className="text-xl font-bold text-center text-gray-700 mb-5">
                        OUR <span className="text-red-800 italic text">VISION</span>
                    </div>
                    <div className="text-gray-600 text-center text-pretty mx-3 p-0 text-base lg:text-xl italic text lg:max-w-[650px]">
                        <p>To become the most efficient training providing organization effectively contributing to achieve prosperity in Sri Lanka through Human Resource Development.</p>
                    </div>
                </div>

                <div className="hidden lg:flex lg:bg-gray-300 lg:h-24 lg:w-2"></div>

                {/* Mission */}
                <div className="vision-main-container flex flex-col justify-center mt-10 items-center w-full lg:h-96 lg:mt-0">
                    <div className="bg-[url(target.png)] w-32 h-36 bg-cover bg-no-repeat"></div>
                    <div className="text-xl font-bold text-center text-gray-700 mb-5">
                        OUR <span className="text-red-800">MISSION</span>
                    </div>
                    <div className="text-gray-600 italic text text-center max-w-[380px] mx-auto text-pretty text-base lg:text-xl lg:max-w-[650px]">
                        <p>Providing vocational and Technical Training for youth, to acquire employable skills through well formulated skills programs with highest professional Standards to meet the skilled manpower requirement in the industry.</p>
                    </div>
                </div>
            </div>

            {/* Objectives Section - Dynamic */}
            <div className="mt-10 mx-4 lg:mx-20">
                <div className="text-xl font-bold text-gray-700 mb-4 lg:text-2xl">
                    <h1>Our Objectives</h1>
                </div>
                {objectives.map((objective) => (
                    <div key={objective.id} className="flex flex-row gap-x-2 py-3 items-baseline lg:items-center">
                        <div className="min-w-2 min-h-2 bg-red-800 rounded-full lg:min-w-3 lg:min-h-3 italic text"></div>
                        <div className="text-base text-gray-600 text-justify mr-2 lg:text-xl italic text">
                            <p>{objective.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quality Policy Section - Dynamic */}
            <div className="mx-4 mt-10 lg:mx-20">
                <div className="text-xl font-bold text-gray-700 mb-4 lg:text-2xl">
                    <h1>Quality Policy</h1>
                </div>
                <div className="lg:mr-20 lg:text-xl text-gray-600">
                    <p className="whitespace-break-spaces text-justify lg:whitespace-normal">
                        {qualityPolicy}
                    </p>
                </div>

                {/* Certification Logos */}
                <div className="mx-4 grid grid-cols-2 gap-x-2 mt-10 lg:flex lg:flex-row lg:justify-center lg:gap-x-4">
                    <div className="bg-white rounded-sm h-[168px] w-[170px] flex justify-center border-t-2 border-red-800 shadow-sm p-4 lg:h-[250px] lg:w-[253px] lg:border-t-4">
                        <div className="bg-[url(slsilogo.png)] w-full h-full bg-cover"></div>
                    </div>
                    <div className="bg-white rounded-sm h-[168px] w-[170px] flex justify-center border-t-2 border-red-800 shadow-sm p-4 lg:h-[250px] lg:w-[253px] lg:border-t-4">
                        <div className="bg-[url(awardlogo.png)] w-full h-full bg-cover"></div>
                    </div>
                </div>
            </div>

            {/* Board Management Section */}
            <div className="board-main-container mx-4 mt-20">
                <div className="text-xl font-bold text-gray-700 mb-4">
                    <h1>Board of Management</h1>
                </div>

                {/* Minister */}
                {boardMembers.minister.length > 0 && (
                    <div className="flex flex-col mt-10 gap-y-5 items-center">
                        <div className="text-base font-bold text-gray-600">
                            Minister of Education
                        </div>
                        {boardMembers.minister.map((member) => (
                            <BoardMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                )}

                {/* Deputy Minister */}
                {boardMembers.deputy.length > 0 && (
                    <div className="flex flex-col mt-10 gap-y-5 items-center">
                        <div className="text-base font-bold text-gray-600">
                            Deputy Minister of Vocational Education
                        </div>
                        {boardMembers.deputy.map((member) => (
                            <BoardMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                )}

                {/* Director General */}
                {boardMembers.director.length > 0 && (
                    <div className="flex flex-col mt-10 gap-y-5 items-center">
                        <div className="text-base font-bold text-gray-600">
                            Head of Authority
                        </div>
                        <div className="grid grid-cols-2 gap-x-2">
                            {boardMembers.director.map((member) => (
                                <BoardMemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Top Management */}
                {boardMembers.management.length > 0 && (
                    <div className="flex flex-col mt-10 gap-y-5 items-center">
                        <div className="text-base font-bold text-gray-600">
                            Top Management
                        </div>
                        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                            {boardMembers.management.map((member) => (
                                <BoardMemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
             <Footer />
        </div>
        
    );
}