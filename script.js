const form = document.getElementById('feedbackForm');
const statusBox = document.getElementById('status');
const button = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusBox.className = 'status'; statusBox.textContent = '';
  const endpoint = window.BUKUIN_ENDPOINT;
  if (!endpoint || endpoint.includes('PASTE_GOOGLE')) {
    statusBox.className = 'status err';
    statusBox.textContent = 'Website belum terhubung ke database. Pemilik BUKUIN perlu memasang URL Google Apps Script pada config.js.';
    return;
  }
  const fd = new FormData(form);
  if (fd.get('website')) return; // honeypot anti-bot
  fd.set('testimonialConsent', fd.get('testimonialConsent') === 'Ya' ? 'Ya' : 'Tidak');
  button.disabled = true; button.textContent = 'Mengirim...';
  try {
    // text/plain menghindari preflight CORS pada Apps Script.
    const payload = Object.fromEntries(fd.entries());
    await fetch(endpoint, {method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(payload)});
    form.reset();
    statusBox.className = 'status ok';
    statusBox.innerHTML = '<strong>Terima kasih!</strong><br>Masukanmu sudah dikirim dan akan membantu pengembangan BUKUIN berikutnya.';
  } catch (err) {
    statusBox.className = 'status err';
    statusBox.textContent = 'Masukan belum berhasil dikirim. Coba lagi beberapa saat.';
  } finally {
    button.disabled = false; button.textContent = 'Kirim Masukan';
  }
});
