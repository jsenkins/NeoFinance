import { useExportCSVQuery, useExportPDFQuery } from '../store/api';

export default function Reports(){
  const { data: csv } = useExportCSVQuery();
  const { data: pdf } = useExportPDFQuery();
  return (
    <div>
      <h2 className="text-xl mb-4">Reports</h2>
      <a href="http://localhost:5000/api/export/csv" className="mr-4 text-blue-600">Download CSV</a>
      <a href="http://localhost:5000/api/export/pdf" className="text-blue-600">Download PDF</a>
    </div>
  );
}
