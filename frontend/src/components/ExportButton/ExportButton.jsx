import { Download } from 'react-feather';
import API from '../services/api';

export default function ExportButton({ districtId }) {
    const handleExport = async () => {
        try {
            const response = await API.get('enrollments/enrollments/export/', {
                responseType: 'blob',
            });
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `enrollments_${districtId}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export data. Please try again.');
        }
    };

    return (
        <button 
            onClick={handleExport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
            <Download size={16} />
            Export to Excel
        </button>
    );
}