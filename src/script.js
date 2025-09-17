async function getCharacters() {
  try {
    const res = await fetch('data/characters.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Characters data:', data);

    const ul = document.getElementById('characters');
    if (ul && Array.isArray(data)) {
      ul.innerHTML = data
        .map(c => `<li data-id="${escapeHtml(String(c.id))}">${escapeHtml(String(c.name))}</li>`)
        .join('');
    }
  } catch (err) {
    console.error('Failed to get characters:', err);
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"'`=\/]/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  })[s]);
}

// Appelle getCharacters une fois le DOM chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', getCharacters);
} else {
  getCharacters();
}