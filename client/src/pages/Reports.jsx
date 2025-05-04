import { FileText, FileSpreadsheet } from 'lucide-react';
import { useRef } from 'react';

export default function Reports() {
  const csvRef = useRef(null);
  const pdfRef = useRef(null);

  const token = localStorage.getItem('token');

  const download = async (type) => {
    const res = await fetch(`http://localhost:5000/api/export/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) return alert('Please log in again.');

    const blob = await res.blob();
    const url  = window.URL.createObjectURL(blob);
    const a    = (type === 'csv' ? csvRef : pdfRef).current;
    a.href     = url;
    a.download = type === 'csv' ? 'transactions.csv' : 'transactions.pdf';
    a.click();                 // triggers the browser download
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#001e30] h-screen p-6 text-white space-y-6">
      <h2 className="text-2xl font-semibold">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSV */}
        <button
          onClick={() => download('csv')}
          className="flex items-center gap-4 p-6 bg-[#33363c] rounded-xl shadow-sm border border-base-200 hover:bg-base-200 transition-colors"
        >
          <div className="p-3 bg-success/10 rounded-lg">
            <FileSpreadsheet className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="font-medium">Export as CSV</h3>
            <p className="text-sm text-base-content/70">
              Download your transactions in spreadsheet format
            </p>
          </div>
        </button>
        {/* hidden anchor used only to trigger file‑save */}
        <a ref={csvRef} style={{ display: 'none' }} />

        {/* PDF */}
        <button
          onClick={() => download('pdf')}
          className="flex items-center gap-4 p-6 bg-[#33363c] rounded-xl shadow-sm border border-base-200 hover:bg-base-200 transition-colors"
        >
          <div className="p-3 bg-error/10 rounded-lg">
            <FileText className="w-6 h-6 text-error" />
          </div>
          <div>
            <h3 className="font-medium">Export as PDF</h3>
            <p className="text-sm text-base-content/70">
              Download your transactions in document format
            </p>
          </div>
        </button>
        <a ref={pdfRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
