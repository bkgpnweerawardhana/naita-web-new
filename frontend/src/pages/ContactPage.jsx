import TopBar from '../components/TopBar/TopBar';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';  // there is a mistake in the name remember to check it 
import Footer from '../components/Footer/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'react-feather';

export default function ContactPage() {
    return (
        <div className="bg-white">
            <TopBar />
            <Navbar />
            <Breadcrumb />
            
            {/* Main Contact Content */}
            <section className="py-16 bg-[#87212E]/10">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions or need assistance? Reach out to us through any of these channels.
                        </p>
                    </div>

                    {/* Contact Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Contact Card 1 - Address */}
                        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                            <div className="bg-red-100 p-4 rounded-full mb-4">
                                <MapPin className="text-red-800 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Location</h3>
                            <p className="text-gray-600 mb-4">
                                No. 971, Sri Jayewardenepura Mawatha,<br />
                                Welikada, Rajagiriya,<br />
                                Sri Lanka.
                            </p>
                            <button className="mt-auto px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                View on Map
                            </button>
                        </div>

                        {/* Contact Card 2 - Contact Info */}
                        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                            <div className="bg-red-100 p-4 rounded-full mb-4">
                                <Phone className="text-red-800 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h3>
                            <div className="space-y-2 text-gray-600 mb-4">
                                <p className="flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4 text-red-800" />
                                    <span>0112 888 782</span>
                                </p>
                                <p className="flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4 text-red-800" />
                                    <span>0112 888 783 (Fax)</span>
                                </p>
                                <p className="flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4 text-red-800" />
                                    <span>info@naita.gov.lk</span>
                                </p>
                            </div>
                            <button className="mt-auto px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call Now
                            </button>
                        </div>

                        {/* Contact Card 3 - Hours */}
                        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                            <div className="bg-red-100 p-4 rounded-full mb-4">
                                <Clock className="text-red-800 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Working Hours</h3>
                            <div className="space-y-2 text-gray-600 mb-4">
                                <p><strong>Weekdays:</strong> 8:30 AM - 4:15 PM</p>
                                <p><strong>Saturday:</strong> 8:30 AM - 12:30 PM</p>
                                <p><strong>Sunday:</strong> Closed</p>
                                <p><strong>Public Holidays:</strong> Closed</p>
                            </div>
                            <button className="mt-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                                Download Holiday List
                            </button>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="md:flex">
                            {/* Form Side */}
                            <div className="md:w-1/2 p-8 md:p-12">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="+94 77 123 4567"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <select 
                                            id="subject" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="course">Course Inquiry</option>
                                            <option value="admission">Admission Process</option>
                                            <option value="certificate">Certificate Verification</option>
                                            <option value="feedback">Feedback/Suggestion</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                                        <textarea 
                                            id="message" 
                                            rows="4" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="Type your message here..."
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="w-full md:w-auto px-8 py-3 bg-red-800 text-white rounded-lg hover:bg-red-900 transition flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Map Side */}
                            <div className="md:w-1/2 bg-gray-100">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.348682523786!2d79.88787631539365!3d6.934355920386337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b5d5f07ad%3A0x3c67e4b0a5e0b5b4!2sNational%20Apprentice%20and%20Industrial%20Training%20Authority!5e0!3m2!1sen!2slk!4v1621234567890!5m2!1sen!2slk" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}