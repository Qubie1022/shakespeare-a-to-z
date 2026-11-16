const grid = document.getElementById('wordGrid');
const filter = document.getElementById('letterFilter');
const search = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const modal = document.getElementById('wordModal');
let words = [];
let activeLetter = 'ALL';

function esc(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function buildFilters() {
  filter.innerHTML = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter =>
    `<button type="button" data-letter="${letter}" class="${letter === activeLetter ? 'active' : ''}" aria-label="${letter === 'ALL' ? '全部' : letter}">${letter === 'ALL' ? 'ALL' : letter}</button>`
  ).join('');
}
function render() {
  const term = search.value.trim().toLocaleLowerCase();
  const visible = words.filter(w => (activeLetter === 'ALL' || w.letter === activeLetter) &&
    [w.word,w.zh,w.meaning,w.quote,w.play].join(' ').toLocaleLowerCase().includes(term));
  grid.innerHTML = visible.map(w => `
    <article class="word-card" tabindex="0" role="button" data-word="${w.letter}" aria-label="學習 ${esc(w.word)}">
      <div class="card-image-wrap"><img class="card-image" src="${w.image}" alt="${esc(w.word)} 的印象派油畫" loading="lazy"><span class="card-letter">${w.letter}</span></div>
      <div class="card-body"><h3 class="card-title">${esc(w.word)}</h3><p class="card-zh">${esc(w.zh)}</p><p class="card-quote">“${esc(w.quote)}”</p><div class="card-bottom"><span>${esc(w.play)}</span><span class="listen-hint">LISTEN &nbsp; ↗</span></div></div>
    </article>`).join('');
  noResults.hidden = visible.length !== 0;
}
function openWord(w) {
  document.getElementById('modalImage').src = w.image;
  document.getElementById('modalImage').alt = `${w.word} 印象派油畫`;
  document.getElementById('modalLetter').textContent = w.letter;
  document.getElementById('modalEyebrow').textContent = `LETTER ${w.letter} · A WORD FROM SHAKESPEARE`;
  document.getElementById('modalWord').textContent = w.word;
  document.getElementById('modalZh').textContent = w.zh;
  document.getElementById('modalMeaning').textContent = w.meaning;
  document.getElementById('modalQuote').textContent = `“${w.quote}”`;
  document.getElementById('modalSource').textContent = `— ${w.play}, ${w.scene}`;
  document.getElementById('modalContext').textContent = w.context;
  document.getElementById('wordAudio').src = w.wordAudio;
  document.getElementById('quoteAudio').src = w.quoteAudio;
  document.getElementById('modalDisclaimer').textContent = w.letter === 'X' ? '編輯註：Xanthippe 是莎士比亞文本中極少見的 X 字首典故人名，這裡直接引用含有該詞的原句。' : '';
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeModal() {
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
  document.getElementById('wordAudio').pause(); document.getElementById('quoteAudio').pause();
}
filter.addEventListener('click', e => { const b=e.target.closest('button[data-letter]'); if(!b)return; activeLetter=b.dataset.letter; buildFilters(); render(); });
search.addEventListener('input', render);
grid.addEventListener('click', e => { const card=e.target.closest('[data-word]'); if(card){const w=words.find(x=>x.letter===card.dataset.word);if(w)openWord(w);} });
grid.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){const card=e.target.closest('[data-word]');if(card){e.preventDefault();const w=words.find(x=>x.letter===card.dataset.word);if(w)openWord(w);}} });
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target.dataset.close)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
fetch('vocabulary.json').then(r=>{if(!r.ok)throw new Error('找不到 vocabulary.json');return r.json();}).then(data=>{words=data;buildFilters();render();}).catch(err=>{grid.innerHTML=`<p class="loading">載入失敗：${esc(err.message)}。請確認 index.html、script.js 與 vocabulary.json 位於同一層資料夾。</p>`;});
