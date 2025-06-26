// Frontend/src/pages/InstructorDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import TopBar from '../components/TopBar/TopBar';

export default function InstructorDashboard() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    console.log('user details ,',user);

    useEffect(() => {
      
        const fetchEnrollments = async () => {
            try {
                const response = await API.get('enrollments/enrollments/');
                console.log('comes from instructordashboard',response.data.results)
                setEnrollments(response.data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, [user,navigate]);

    const handleApprove = async (enrollmentId) => {
        try {
            await API.post(`enrollments/enrollments/${enrollmentId}/approve/`);
            setEnrollments(enrollments.map(e => 
                e.id === enrollmentId ? {...e, status: 'approved'} : e
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReject = async () => {
        try {
            await API.post(`enrollments/enrollments/${selectedEnrollment}/reject/`, {
                rejection_reason: rejectionReason
            });
            setEnrollments(enrollments.map(e => 
                e.id === selectedEnrollment ? {...e, status: 'rejected', rejection_reason: rejectionReason} : e
            ));
            setShowRejectModal(false);
            setRejectionReason('');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
        <TopBar />
        <div className="container mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Pending Applications</h2>
            {error && (
                <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto rounded shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-left font-semibold">Student</th>
                            <th className="py-3 px-4 text-left font-semibold">Course</th>
                            <th className="py-3 px-4 text-left font-semibold">Applied Date</th>
                            <th className="py-3 px-4 text-left font-semibold">Status</th>
                            <th className="py-3 px-4 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.filter(e => e.status === 'pending').map(enrollment => (
                            <tr key={enrollment.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{enrollment.student.first_name} {enrollment.student.last_name}</td>
                                <td className="py-2 px-4">{enrollment.offering.course.title}</td>
                                <td className="py-2 px-4">{new Date(enrollment.applied_date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 capitalize">{enrollment.status}</td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition"
                                        onClick={() => handleApprove(enrollment.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition"
                                        onClick={() => {
                                            setSelectedEnrollment(enrollment.id);
                                            setShowRejectModal(true);
                                        }}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <h3 className="text-lg font-semibold">Reject Application</h3>
                            <button
                                className="text-gray-400 hover:text-gray-700"
                                onClick={() => setShowRejectModal(false)}
                                aria-label="Close"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="px-6 py-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                Reason for Rejection
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                rows={3}
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-2 border-t px-6 py-4">
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium"
                                onClick={() => setShowRejectModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
                                onClick={handleReject}
                            >
                                Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}