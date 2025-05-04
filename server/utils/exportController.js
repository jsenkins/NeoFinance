// server/utils/exportController.js
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Parser } from 'json2csv';
import Transaction from '../models/Transaction.js';

export async function exportPDF(req, res) {
  const tx = await Transaction.find({ user: req.userId });
  const pdf = await PDFDocument.create();
  const page = pdf.addPage();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  let y = page.getHeight() - 25;
  page.drawText('Transactions:', { x: 50, y, font, size: 14 });
  tx.forEach(t => {
    y -= 18;
    page.drawText(
      `${t.date.toISOString().slice(0,10)} • ${t.category} • ${t.amount}`,
      { x: 50, y, font, size: 10 }
    );
  });
  const buf = await pdf.save();
  res.setHeader('Content-Type','application/pdf').send(buf);
}

export async function exportCSV(req, res) {
  const tx = await Transaction.find({ user: req.userId }).lean();
  const csv = new Parser().parse(tx);
  res
    .header('Content-Type','text/csv')
    .attachment('transactions.csv')
    .send(csv);
}
