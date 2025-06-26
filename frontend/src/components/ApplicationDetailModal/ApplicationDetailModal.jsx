import { Modal, Button } from 'react-bootstrap';
import { User, Mail, Phone, Calendar, Book, Briefcase, X } from 'react-feather';

export default function ApplicationDetailModal({ application, show, onHide }) {
    if (!application) return null;
    
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="text-naita-red">
                    Application Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="text-naita-red mb-3">Student Information</h5>
                        <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                                <User className="me-2 text-muted" size={18} />
                                <span className="fw-bold">Name:</span>
                                <span className="ms-2">{application.student_details.full_name}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Mail className="me-2 text-muted" size={18} />
                                <span className="fw-bold">Email:</span>
                                <span className="ms-2">{application.student_details.email}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Phone className="me-2 text-muted" size={18} />
                                <span className="fw-bold">Phone:</span>
                                <span className="ms-2">{application.student_details.phone || 'N/A'}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <span className="fw-bold me-2">NIC:</span>
                                <span>{application.student_details.nic_number || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <h5 className="text-naita-red mb-3">Course Information</h5>
                        <div className="mb-3">
                            <div className="d-flex align-items-center mb-2">
                                <Book className="me-2 text-muted" size={18} />
                                <span className="fw-bold">Course:</span>
                                <span className="ms-2">{application.offering.course.title}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <Calendar className="me-2 text-muted" size={18} />
                                <span className="fw-bold">Dates:</span>
                                <span className="ms-2">
                                    {new Date(application.offering.start_date).toLocaleDateString()} - 
                                    {new Date(application.offering.end_date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <span className="fw-bold me-2">Institution:</span>
                                <span>{application.institution.name}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <span className="fw-bold me-2">Schedule:</span>
                                <span>{application.offering.schedule}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-3">
                    <div className="col-12">
                        <h5 className="text-naita-red mb-3">Application Details</h5>
                        <div className="mb-3">
                            <div className="d-flex mb-2">
                                <span className="fw-bold me-2">Applied Date:</span>
                                <span>{new Date(application.applied_date).toLocaleString()}</span>
                            </div>
                            <div className="d-flex mb-2">
                                <span className="fw-bold me-2">Status:</span>
                                <span className={`badge bg-${application.status === 'approved' ? 'success' : 
                                    application.status === 'rejected' ? 'danger' : 'warning'}`}>
                                    {application.status}
                                </span>
                            </div>
                            {application.comments && (
                                <div className="mb-2">
                                    <span className="fw-bold me-2">Student Comments:</span>
                                    <p className="mt-1">{application.comments}</p>
                                </div>
                            )}
                            {application.rejection_reason && (
                                <div className="mb-2">
                                    <span className="fw-bold me-2">Rejection Reason:</span>
                                    <p className="mt-1">{application.rejection_reason}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {application.student_details.education?.length > 0 && (
                    <div className="row mt-3">
                        <div className="col-12">
                            <h5 className="text-naita-red mb-3">Education Qualifications</h5>
                            <ul className="list-group">
                                {application.student_details.education.map((edu, index) => (
                                    <li key={index} className="list-group-item">
                                        <strong>{edu.qualification}</strong> - {edu.institution} ({edu.year})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                
                {application.student_details.experience?.length > 0 && (
                    <div className="row mt-3">
                        <div className="col-12">
                            <h5 className="text-naita-red mb-3">Work Experience</h5>
                            <ul className="list-group">
                                {application.student_details.experience.map((exp, index) => (
                                    <li key={index} className="list-group-item">
                                        <strong>{exp.position}</strong> at {exp.company} ({exp.duration})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}