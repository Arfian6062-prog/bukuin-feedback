const SHEET_NAME = 'Feedback';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (data.website) return output_({ok:true}); // honeypot

    const required = ['rating','feature','recommend','version'];
    for (const key of required) {
      if (!String(data[key] || '').trim()) return output_({ok:false, error:'Data wajib belum lengkap'});
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(['Timestamp','Versi','Rating','Fitur Favorit','Kendala','Fitur Diminta','Rekomendasi','Nama','WhatsApp','Izin Testimoni']);
      sh.setFrozenRows(1);
    }

    sh.appendRow([
      new Date(), safe_(data.version, 40), safe_(data.rating, 1), safe_(data.feature, 60),
      safe_(data.difficulty, 1000), safe_(data.request, 1000), safe_(data.recommend, 20),
      safe_(data.name, 80), safe_(data.whatsapp, 30), data.testimonialConsent === 'Ya' ? 'Ya' : 'Tidak'
    ]);
    return output_({ok:true});
  } catch (err) {
    return output_({ok:false, error:'Server error'});
  }
}

function safe_(value, max) {
  let s = String(value || '').trim().slice(0, max);
  // Mencegah formula injection ketika input dibuka di spreadsheet.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function output_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
