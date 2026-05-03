// dashboard.js — Civiq Jundiaí
// Pós-revisão técnica: confiabilidade, segurança, manutenção (2026-05)

// ── CONSTANTES ────────────────────────────────────────────────────────────

const SHEET_ID  = '10N2pNmLP0eWKjuY1NySq4zMhfBz57E6YpweAQS92am4';
const CSV_URL   = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
const POLL_MS   = 30000;

// ── DADOS ESTÁTICOS ───────────────────────────────────────────────────────

const ESCOLAS = [
  {i:0,n:"EMEB Prof.ª Anna Pontes Chagas",b:"Samambaias",lat:-23.1897971,lng:-46.9150478,apt:3195},
  {i:1,n:"EE Prof. Albino Melo de Oliveira",b:"Engordadouro",lat:-23.1451436,lng:-46.9376991,apt:2478},
  {i:2,n:"EMEB Prof.º Pedro Clarismundo Fornari",b:"Rio Acima",lat:-23.11018,lng:-46.8869716,apt:3557},
  {i:3,n:"EE Dr. Antenor Soares Gandra",b:"Centro",lat:-23.1936932,lng:-46.8810617,apt:1818},
  {i:4,n:"EE Dom Joaquim Justino Carreira",b:"Parque Almerinda",lat:-23.1443806,lng:-46.9889875,apt:4142},
  {i:5,n:"Colégio Divino Salvador",b:"Vila Arens II",lat:-23.1984675,lng:-46.8750381,apt:8995},
  {i:6,n:"EE Prof. José Feliciano de Oliveira",b:"Jardim Tamoio",lat:-23.191572,lng:-46.8561443,apt:5543},
  {i:7,n:"EE Barão de Jundiaí",b:"Jd. Sagrado Coração",lat:-23.1819366,lng:-46.8491893,apt:5556},
  {i:8,n:"EMEB Prof.ª Beatriz Blattner Pupo",b:"Jardim Novo Horizonte",lat:-23.14255761,lng:-46.98502391,apt:3157},
  {i:9,n:"EE Prof.ª Ana Pinto Duarte Paes",b:"Ponte São João",lat:-23.1790512,lng:-46.8776394,apt:4949},
  {i:10,n:"EMEB Prof.ª Armanda Santina Polenti",b:"Parque São Luiz",lat:-23.1489763,lng:-46.8719605,apt:3248},
  {i:11,n:"EE Prof.ª Maria José Maia de Toledo",b:"Jardim São Camilo Novo",lat:-23.1767925,lng:-46.8670828,apt:4779},
  {i:12,n:"EE Bispo Dom Gabriel Paulino Bueno Couto",b:"Vila Virgínia",lat:-23.187745,lng:-46.8951884,apt:5865},
  {i:13,n:"EE Prof.º João Batista Curado",b:"Jardim Tarumã",lat:-23.1723772,lng:-46.8701204,apt:5260},
  {i:14,n:"EE Rafael de Oliveira",b:"Chácara Planalto",lat:-23.187814,lng:-46.98691,apt:3746},
  {i:15,n:"EE Prof. Adoniro Ladeira",b:"Jardim Shangai",lat:-23.1725074,lng:-46.9134584,apt:5240},
  {i:16,n:"EE Prof.ª Cecília Rolemberg Porto Guelli",b:"Vila Rio Branco",lat:-23.1746221,lng:-46.887384,apt:5698},
  {i:17,n:"EE Prof.ª Albertina Fortarel",b:"Jardim Ermida II",lat:-23.1873609,lng:-46.9627544,apt:5201},
  {i:18,n:"EE Prof.ª Benedita Arruda",b:"Vila Didi",lat:-23.2111494,lng:-46.857273,apt:6348},
  {i:19,n:"EMEB Prof.ª Marina de Almeida Rinaldi Carvalho",b:"Tulipas",lat:-23.1536997,lng:-46.9628175,apt:4176},
  {i:20,n:"EMEB Anézio de Oliveira",b:"Vila Marlene",lat:-23.1570294,lng:-46.9190886,apt:2825},
  {i:21,n:"EMEB Glória da Silva Rocha Genovese",b:"Vila Cristo Redentor",lat:-23.2056921,lng:-46.8541377,apt:1967},
  {i:22,n:"EE Padre Maurílio Tomanik",b:"Cecap",lat:-23.1444185,lng:-46.915965,apt:3825},
  {i:23,n:"EMEB Pedro de Oliveira",b:"Vila Joana",lat:-23.1829126,lng:-46.8748205,apt:4793},
  {i:24,n:"EE Maria de Almeida Schledorn",b:"Tulipas",lat:-23.1533582,lng:-46.9634439,apt:4251},
  {i:25,n:"SESI Luiz Latorre",b:"Vila Bandeirantes",lat:-23.1676935,lng:-46.9032473,apt:7677},
  {i:26,n:"EMEB Ivo de Bona",b:"Parque Almerinda P. Chaves",lat:-23.1466949,lng:-46.9981522,apt:4911},
  {i:27,n:"EMEB Prof.ª Geralda Berthola Facca",b:"Jardim do Lago",lat:-23.2179158,lng:-46.8620878,apt:5149},
  {i:28,n:"EMEB Prof. João Fernandes Neto",b:"Jardim São Vicente",lat:-23.1375826,lng:-46.9277214,apt:1386},
  {i:29,n:"Faculdades Padre Anchieta",b:"Vila Vianelo",lat:-23.1937502,lng:-46.8861392,apt:2872},
  {i:30,n:"EMEB Prof. Luiz Biela de Souza",b:"Jardim Santa Gertrudes",lat:-23.2485642,lng:-46.8598817,apt:1629},
  {i:31,n:"EMEB Vereador João Batista Toledo",b:"Jardim Tamoio",lat:-23.1925357,lng:-46.8523484,apt:2130},
  {i:32,n:"EE Prof. Luiz Rivelli",b:"Vila Marlene",lat:-23.1567954,lng:-46.9184097,apt:3817},
  {i:33,n:"Faculdade Escola Superior Ed. Física",b:"Anhangabaú",lat:-23.1937268,lng:-46.8956451,apt:2902},
  {i:34,n:"EE Prof. Orozimbo Sostena",b:"Jardim Estádio",lat:-23.2138176,lng:-46.8679731,apt:3968},
  {i:35,n:"EE Prof.ª Maria de Lourdes de França Silveira",b:"Jardim Pacaembu",lat:-23.1865118,lng:-46.8652234,apt:7689},
  {i:36,n:"EMEB Prof.ª Anna Rita Alves Ludke",b:"Vila Alvorada",lat:-23.1850355,lng:-46.9116001,apt:4380},
  {i:37,n:"ETEC Benedito Storani",b:"Recanto Quarto Centenário",lat:-23.1895315,lng:-46.9434079,apt:4400},
  {i:38,n:"EE Prof. Getúlio Nogueira de Sá",b:"Caxambu",lat:-23.1526515,lng:-46.8521254,apt:4097},
  {i:39,n:"EMEB Prof. José Leme do Prado Filho",b:"Jardim Esplanada",lat:-23.2129729,lng:-46.8705151,apt:3428},
  {i:40,n:"FATEC Deputado Ary Fossen",b:"Centro",lat:-23.1805837,lng:-46.8840819,apt:2572},
  {i:41,n:"EE Conde do Parnaíba",b:"Centro",lat:-23.1852992,lng:-46.8862725,apt:4401},
  {i:42,n:"EMEB Antônio Loureiro",b:"Vila Helena",lat:-23.2100246,lng:-46.8821624,apt:3027},
  {i:43,n:"EMEB Dr. José Romeiro Pereira",b:"Vila Arens II",lat:-23.2039337,lng:-46.8752446,apt:3461},
  {i:44,n:"EMEB Prof.ª Cesarina Fortarel Gonçalves Dias",b:"Vila Jundiainópolis",lat:-23.2131416,lng:-46.8840099,apt:1983},
  {i:45,n:"EE Paulo Mendes Silva",b:"Vila Arens II",lat:-23.203493,lng:-46.8715079,apt:5227},
  {i:46,n:"EMEB Prof.ª Benedita Alzira de Moraes Camunhas",b:"Fazenda Grande",lat:-23.17125455,lng:-46.965158,apt:2838},
  {i:47,n:"EMEB Deputado Ranieri Mazzilli",b:"Vila Esperança",lat:-23.2218535,lng:-46.8553738,apt:2377},
  {i:48,n:"SESI 409",b:"Jardim Brasil",lat:-23.1797633,lng:-46.8991465,apt:3183},
  {i:49,n:"CMEJA Prof. Dr. André Franco Montoro",b:"Vila Argos Velha",lat:-23.1926778,lng:-46.8763634,apt:4788},
  {i:50,n:"Faculdade Anhanguera",b:"Vila das Hortênsias",lat:-23.1774578,lng:-46.9130868,apt:8420},
  {i:51,n:"EMEB Marcos Gasparian",b:"Centro",lat:-23.1868118,lng:-46.8889687,apt:1891},
  {i:52,n:"Faculdades Padre Anchieta 2",b:"Vila Vianelo",lat:-23.1937473,lng:-46.8860936,apt:2107},
  {i:53,n:"EMEB Aparecida Merino Elias",b:"Medeiros",lat:-23.1773282,lng:-46.99045525,apt:3079},
  {i:54,n:"EE Prof.º José Silva Jr.",b:"Jardim Bandeiras",lat:-23.1551887,lng:-46.8717781,apt:3550},
  {i:55,n:"EMEB Prof.º Oscar Augusto Guelli",b:"Roseira",lat:-23.1434036,lng:-46.8186644,apt:2374},
  {i:56,n:"EMEB Prof. Fábio Rodrigues Mendes",b:"Engordadouro",lat:-23.1509548,lng:-46.9258098,apt:2443},
  {i:57,n:"EE Prof.ª Joceny Villela Curado",b:"Vila Comercial",lat:-23.223784,lng:-46.8844091,apt:4742},
  {i:58,n:"EE Adib Miguel Haddad",b:"Jardim Santa Gertrudes",lat:-23.2483111,lng:-46.8544198,apt:6294},
  {i:59,n:"EMEB Prof.º Flávio D'Angiere",b:"Anhangabaú",lat:-23.1867271,lng:-46.8953595,apt:1390},
  {i:60,n:"EE Dr. Eloy de Miranda Chaves",b:"Jardim Boa Vista",lat:-23.1822746,lng:-46.867948,apt:2774},
  {i:61,n:"EMEB Prof.ª Isabel Christina Marques de Oliveira",b:"Jardim Guanabara",lat:-23.1785812,lng:-46.9251166,apt:3583},
  {i:62,n:"EE Cel. Siqueira de Moraes",b:"Vila Vianelo",lat:-23.1994507,lng:-46.8840478,apt:5901},
  {i:63,n:"EMEB Prof. Patrícia Pires",b:"Parque Centenário",lat:-23.13908218,lng:-46.9158539,apt:2129},
  {i:64,n:"EMEB Prof.º João Luiz de Campos",b:"Jardim Florestal",lat:-23.1640292,lng:-46.8958881,apt:2244},
  {i:65,n:"EMEB Prof.ª Dina Rosete Zandona Cunninghan",b:"Jardim do Lírio",lat:-23.1744023,lng:-46.8507024,apt:2379},
  {i:66,n:"EE Diógenes Duarte Paes",b:"Parque Brasília",lat:-23.1833917,lng:-46.9165147,apt:6357},
  {i:67,n:"EMEB Prof.ª Judith Almeida Curado Arruda",b:"Cidade Nova",lat:-23.191881,lng:-46.8437771,apt:3179},
  {i:68,n:"EMEB Prof.ª Maria Angélica Lourençon",b:"Corrupira",lat:-23.1098104,lng:-46.9192305,apt:1863},
  {i:69,n:"EMEB Luiz Bárbaro",b:"Vila Graff",lat:-23.1857805,lng:-46.8780044,apt:988},
  {i:70,n:"EE Monsenhor Venerando Nalini",b:"Ivoturucaia",lat:-23.1812237,lng:-46.8084188,apt:4759},
  {i:71,n:"EMEB Prof.ª Helena Meirelles Maia Torres",b:"Vila Helena",lat:-23.2098628,lng:-46.8818126,apt:1742},
  {i:72,n:"SENAC Jundiaí",b:"Jardim Paulista",lat:-23.1975931,lng:-46.8955683,apt:4342},
  {i:73,n:"EMEB Rotary Club",b:"Anhangabaú",lat:-23.1974977,lng:-46.891328,apt:2765},
  {i:74,n:"EMEB Prof. Cléo Nogueira Barbosa",b:"Jardim Novo Horizonte",lat:-23.1438957,lng:-46.9940533,apt:2440},
  {i:75,n:"EMEB Geraldo Pinto Duarte Paes",b:"Jardim Ermida II",lat:-23.1895237,lng:-46.9619237,apt:4383},
  {i:76,n:"EE Prof.ª Deolinda Copelli de Souza Lima",b:"Vila Ruy Barbosa",lat:-23.1954153,lng:-46.8598079,apt:5187},
  {i:77,n:"EMEB Prof. Nassib Cury",b:"Fazenda Grande",lat:-23.1714307,lng:-46.9659205,apt:3529},
  {i:78,n:"EMEB Prof. Carlos Foot Guimarães",b:"Jardim Santa Gertrudes",lat:-23.2545171,lng:-46.8594606,apt:2759},
  {i:79,n:"EMEB Aparecido Garcia",b:"Jardim Martins",lat:-23.2317173,lng:-46.883172,apt:3196},
  {i:80,n:"EMEB Prof. Lázaro Miranda Duarte",b:"Vila Nova Jundiainópolis",lat:-23.2167034,lng:-46.8857096,apt:1978},
  {i:81,n:"EE Prof.ª Alessandra Cristina Rodrigues Pezzato",b:"Parque Residencial Jundiaí",lat:-23.14333451,lng:-47.00553746,apt:5248},
  {i:82,n:"EE Jurandyr de Souza Lima",b:"Traviú",lat:-23.1176452,lng:-46.9659196,apt:2072},
  {i:83,n:"EMEB Melânia Fortarel Barbosa",b:"Poste",lat:-23.1344054,lng:-46.9739351,apt:1361},
  {i:84,n:"EMEB Prof. Antônio Adelino Marques da Silva Brandão",b:"Morada das Vinhas",lat:-23.1370744,lng:-46.9287292,apt:5590},
  {i:85,n:"EE Dr. Rafael Mauro",b:"Vila Maringá",lat:-23.2253472,lng:-46.8770892,apt:2367},
  {i:86,n:"EMEB Ver. José Pedro Raymundo",b:"Vila Rio Branco",lat:-23.1746514,lng:-46.8872161,apt:1518},
  {i:87,n:"EMEB Prof.ª Clotilde Mazzali Bollini",b:"Jardim Pacaembu",lat:-23.1881468,lng:-46.8609193,apt:1981},
  {i:88,n:"EE Prof. Francisco Napoleão Maia",b:"Vila Salermo",lat:-23.2164399,lng:-46.8804506,apt:3172},
  {i:89,n:"EMEB Carla Andressa de Oliveira Sinigalia",b:"Vila Hortolândia",lat:-23.1682565,lng:-46.914834,apt:1388},
  {i:90,n:"EMEB Duílio Maziero",b:"Toca",lat:-23.1330096,lng:-46.8281219,apt:1055},
];

const ESCOLA_MAP = {};
ESCOLAS.forEach(e => { ESCOLA_MAP[e.i] = e; });

const TEMAS = [
  {id:'saude',      nome:'Saúde Pública',           cols:['saude_ubs','saude_pa','saude_espera','saude_atendimento','saude_especialistas']},
  {id:'educacao',   nome:'Educação',                 cols:['edu_creche','edu_fundamental','edu_infra','edu_qualidade','edu_transporte']},
  {id:'seguranca',  nome:'Segurança Pública',        cols:['seg_policiamento','seg_iluminacao','seg_dia','seg_noite','seg_gcm']},
  {id:'mobilidade', nome:'Mobilidade e Transporte',  cols:['mob_asfalto','mob_onibus','mob_sinalizacao','mob_calcadas','mob_ciclo']},
  {id:'limpeza',    nome:'Limpeza Urbana',           cols:['limp_coleta','limp_seletiva','limp_ruas','limp_pracas','limp_bueiros']},
  {id:'infra',      nome:'Infraestrutura e Obras',   cols:['infra_asfalto','infra_saneamento','infra_areas','infra_obras','infra_velocidade']},
];
const LIKERT = {'Ótimo':10,'Bom':7.5,'Regular':5,'Ruim':2.5,'Péssimo':0,'Não sei':null};

// ── UTILITÁRIOS ───────────────────────────────────────────────────────────

// Escapa conteúdo de usuário antes de inserir no DOM via innerHTML.
// Usar em QUALQUER valor vindo de CSV, planilha ou formulário externo.
function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Hash djb2 leve para detectar mudança de conteúdo CSV sem re-render desnecessário.
function _hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (Math.imul(33, h) ^ s.charCodeAt(i)) | 0;
  return h;
}

// ── IDW CANVAS HEATMAP ────────────────────────────────────────────────────
// Renderiza gradiente de IAP por interpolação IDW (potência 2) em canvas nativo.
// Usa latLngToLayerPoint + setPosition para alinhar com o mapa em qualquer zoom/pan.
const IDWHeatLayer = L.Layer.extend({
  onAdd(map) {
    this._map = map;
    if (!map.getPane('heatPane')) {
      const p = map.createPane('heatPane');
      p.style.zIndex = 350;
      p.style.pointerEvents = 'none';
    }
    this._canvas = L.DomUtil.create('canvas', '', map.getPane('heatPane'));
    this._canvas.style.cssText = 'position:absolute;pointer-events:none;filter:blur(4px);transition:opacity .15s;';
    map.on('moveend viewreset', this._draw, this);
    map.on('zoomstart', () => { this._canvas.style.opacity = '0'; });
    map.on('zoomend',   () => { this._canvas.style.opacity = '1'; this._draw(); });
    this._draw();
  },

  onRemove(map) {
    L.DomUtil.remove(this._canvas);
    map.off('moveend viewreset zoomstart zoomend', null, this);
  },

  setData(data) { // data: [{lat, lng, v}]
    this._data = data;
    this._draw();
  },

  _draw() {
    if (!this._map) return;
    const map = this._map, sz = map.getSize(), c = this._canvas;
    c.width = sz.x; c.height = sz.y; // resize limpa canvas automaticamente
    if (!this._data || !this._data.length) return;

    // Compensa o CSS transform do overlayPane para alinhamento geográfico correto.
    const offset = map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(c, offset);

    const pts = this._data.map(p => {
      const lp = map.latLngToLayerPoint([p.lat, p.lng]);
      return { x: lp.x - offset.x, y: lp.y - offset.y, v: p.v };
    });

    const ctx = c.getContext('2d');
    const img = ctx.createImageData(sz.x, sz.y);
    const px  = img.data;
    const S   = 3;   // bloco de pixels
    const R   = 220; // raio de fade (px) — escala com zoom naturalmente

    for (let cy = 0; cy < sz.y; cy += S) {
      for (let cx = 0; cx < sz.x; cx += S) {
        let wSum = 0, vSum = 0, minD = Infinity;
        for (const p of pts) {
          const d = Math.hypot(cx - p.x, cy - p.y);
          if (d < minD) minD = d;
          if (d < 1) { wSum = 1e9; vSum = p.v * 1e9; break; }
          const w = 1 / (d * d);
          wSum += w; vSum += p.v * w;
        }
        if (wSum === 0) continue;
        const fade = minD >= R ? 0 : 0.5 * (1 + Math.cos(Math.PI * minD / R));
        const a = Math.round(fade * 205);
        if (a < 4) continue;
        const [r, g, b] = _iapRgb(vSum / wSum);
        for (let dy = 0; dy < S && cy + dy < sz.y; dy++) {
          for (let dx = 0; dx < S && cx + dx < sz.x; dx++) {
            const i = ((cy + dy) * sz.x + (cx + dx)) * 4;
            px[i] = r; px[i+1] = g; px[i+2] = b; px[i+3] = a;
          }
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  },
});

// Escala perceptual contínua: vermelho → laranja → amarelo → ciano → verde
function _iapRgb(v) {
  const stops = [[0,[220,38,38]],[3,[249,115,22]],[5,[234,179,8]],[7,[20,184,166]],[10,[22,163,74]]];
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i][0]) {
      const t = (v - stops[i-1][0]) / (stops[i][0] - stops[i-1][0]);
      return stops[i-1][1].map((c, j) => Math.round(c + t * (stops[i][1][j] - c)));
    }
  }
  return [22, 163, 74];
}

// ── MAPA ──────────────────────────────────────────────────────────────────

let mapa = null, idwLayer = null, pinsLayer = null, modoMapa = 'heat';

function initMapa() {
  if (mapa) return;
  mapa = L.map('mapa-leaflet', { center: [-23.185, -46.883], zoom: 12, zoomControl: true, scrollWheelZoom: true });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(mapa);
  idwLayer  = new IDWHeatLayer().addTo(mapa);
  pinsLayer = L.layerGroup().addTo(mapa);
}

// Definição canônica única de corNota.
// Para n=null → cinza (sem dado). Para n=0 → vermelho.
function corNota(n) {
  if (n == null) return '#7B95B8';
  if (n <= 3)    return '#FF4D6D';
  if (n <= 5)    return '#FF8A3D';
  if (n <= 6)    return '#FFD060';
  return '#00E5A0';
}

function corTexto(n) {
  if (n == null) return 'rgba(255,255,255,.15)';
  if (n <= 3)    return '#FF4D6D';
  if (n <= 5)    return '#FF8A3D';
  if (n <= 6)    return '#FFD060';
  return '#00E5A0';
}

// Exposto no window porque o HTML usa onclick="setMapMode(...)"
function setMapMode(modo, btn) {
  modoMapa = modo;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  atualizarVisualizacaoMapa();
}
window.setMapMode = setMapMode;

// Estado de scores por escola — módulo-local, não mais em window._escolaScores
let _escolaScores = {};

function atualizarVisualizacaoMapa() {
  if (!mapa) return;
  pinsLayer.clearLayers();

  const noDataPopup = (e) =>
    `<div class="popup-escola">${e.n}</div>` +
    `<div class="popup-bairro">${e.b}</div>` +
    `<div class="popup-sub">⚖ ${e.apt.toLocaleString('pt-BR')} eleitores aptos<br><em>Sem respostas ainda</em></div>`;

  if (modoMapa === 'heat') {
    const data = ESCOLAS
      .filter(e => _escolaScores[e.i] && _escolaScores[e.i].n > 0)
      .map(e => ({ lat: e.lat, lng: e.lng, v: _escolaScores[e.i].iapPonderado }));
    idwLayer.setData(data);

    ESCOLAS.forEach(e => {
      const s = _escolaScores[e.i];
      if (s && s.n > 0) {
        const m = L.circleMarker([e.lat, e.lng], {
          radius: 6, fillColor: corNota(s.iapPonderado), color: '#fff', weight: 1.5, opacity: 1, fillOpacity: 0.95,
        });
        m.bindPopup(popupEscola(e, s));
        pinsLayer.addLayer(m);
      } else {
        const m = L.circleMarker([e.lat, e.lng], {
          radius: 3, fillColor: '#7B95B8', color: 'transparent', opacity: 0.4, fillOpacity: 0.25,
        });
        m.bindPopup(noDataPopup(e));
        pinsLayer.addLayer(m);
      }
    });

  } else {
    idwLayer.setData([]); // limpa canvas IDW no modo pins
    ESCOLAS.forEach(e => {
      const s = _escolaScores[e.i];
      const temDado = s && s.n > 0;
      const iap  = temDado ? s.iapPonderado : null;
      const raio = temDado ? Math.min(18, 6 + Math.sqrt(e.apt / 500)) : 4;
      const m = L.circleMarker([e.lat, e.lng], {
        radius: raio, fillColor: corNota(iap), color: '#fff',
        weight: temDado ? 1.5 : 0.5, opacity: temDado ? 0.9 : 0.4, fillOpacity: temDado ? 0.85 : 0.25,
      });
      m.bindPopup(temDado ? popupEscola(e, s) : noDataPopup(e));
      pinsLayer.addLayer(m);
    });
  }
}

// e.n e e.b vêm do array ESCOLAS (dado estático), não precisam de escapeHtml.
function popupEscola(e, s) {
  const cor = corNota(s.iapPonderado);
  return `<div class="popup-escola">🏫 ${e.n}</div>
<div class="popup-bairro">📍 ${e.b}</div>
<div class="popup-nota" style="color:${cor}">${s.iapPonderado.toFixed(1)}<span style="font-size:13px;color:#7B95B8"> /10</span></div>
<div class="popup-sub">⚖ ${e.apt.toLocaleString('pt-BR')} eleitores aptos · ${s.n} resp.</div>`;
}

// ── PARSE CSV ─────────────────────────────────────────────────────────────

function parseCSV(txt) {
  // Normaliza \r\n (Windows) e \r (Mac antigo) para \n antes de processar.
  const linhas = txt.replace(/\r/g, '').trim().split('\n');
  const header = linhas[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return linhas.slice(1).map(linha => {
    const vals = [];
    let cur = '', inQ = false;
    for (let i = 0; i < linha.length; i++) {
      const c = linha[i];
      if (c === '"') { inQ = !inQ; } else if (c === ',' && !inQ) { vals.push(cur); cur = ''; } else { cur += c; }
    }
    vals.push(cur);
    const obj = {};
    header.forEach((h, i) => { obj[h] = (vals[i] ?? '').replace(/"/g, '').trim(); });
    return obj;
  }).filter(r => r.timestamp && r.timestamp.length > 0);
}

// ── NORMALIZAÇÃO DE SCHEMA ────────────────────────────────────────────────
// Ponto único de entrada para compatibilidade v1 (lat/lng) e v2 (escola_idx).
// Retorna a linha enriquecida com _idx, ou null se inválida.

function escolaMaisProxima(lat, lng) {
  // Equirectangular corrigido: compensa a convergência de meridianos em ~23°S.
  const cosLat = Math.cos(lat * Math.PI / 180);
  let minD = Infinity, nearest = null;
  ESCOLAS.forEach(e => {
    const dlat = e.lat - lat;
    const dlng = (e.lng - lng) * cosLat;
    const d = dlat * dlat + dlng * dlng;
    if (d < minD) { minD = d; nearest = e.i; }
  });
  return nearest;
}

function normalizeRow(r) {
  let idx = parseInt(r.escola_idx);

  if (isNaN(idx)) {
    // Schema v1: coordenada com vírgula decimal (pt-BR)
    const lat = parseFloat((r.lat || '').replace(',', '.'));
    const lng = parseFloat((r.lng || '').replace(',', '.'));
    if (isNaN(lat) || isNaN(lng)) return null;
    idx = escolaMaisProxima(lat, lng);
  }

  if (!ESCOLA_MAP[idx]) return null;
  return { ...r, _idx: idx };
}

// ── CÁLCULO ───────────────────────────────────────────────────────────────

function calcular(rows) {
  const total = rows.length;
  const escolaData = {};

  rows.forEach(r => {
    const norm = normalizeRow(r);
    if (!norm) return;
    const idx  = norm._idx;
    const nota = parseFloat(norm.nota_geral);
    if (!escolaData[idx]) escolaData[idx] = { notas: [], apt: ESCOLA_MAP[idx].apt, n: 0 };
    escolaData[idx].n++;
    if (!isNaN(nota)) escolaData[idx].notas.push(nota);
  });

  const escolaScores = {};
  Object.entries(escolaData).forEach(([idx, d]) => {
    const med = d.notas.length ? d.notas.reduce((a, b) => a + b, 0) / d.notas.length : null;
    escolaScores[idx] = { iapPonderado: med, n: d.n, apt: d.apt };
  });

  let somaNotaApt = 0, somaApt = 0;
  Object.entries(escolaScores).forEach(([idx, s]) => {
    if (s.iapPonderado == null) return;
    const e = ESCOLA_MAP[idx];
    somaNotaApt += s.iapPonderado * e.apt;
    somaApt     += e.apt;
  });
  const iapGeral = somaApt > 0 ? somaNotaApt / somaApt : 0;

  const temaScores = {};
  TEMAS.forEach(t => {
    const vals = [];
    rows.forEach(r => { t.cols.forEach(col => { const v = LIKERT[r[col]]; if (v != null) vals.push(v); }); });
    temaScores[t.id] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  });

  const qvMap = {}, probMap = {};
  rows.forEach(r => {
    if (r.qualidade_vida)     qvMap[r.qualidade_vida]       = (qvMap[r.qualidade_vida] || 0) + 1;
    if (r.problema_principal) probMap[r.problema_principal] = (probMap[r.problema_principal] || 0) + 1;
  });

  return { total, iapGeral, escolaScores, temaScores, qvMap, probMap, escolasCom: Object.keys(escolaScores).length };
}

// ── RENDER ────────────────────────────────────────────────────────────────

function render(m) {
  _escolaScores = m.escolaScores; // atualiza estado módulo-local

  // Métricas de cabeçalho
  document.getElementById('m-total').textContent  = m.total.toLocaleString('pt-BR');
  document.getElementById('m-iap').textContent    = m.iapGeral.toFixed(1);
  document.getElementById('m-escolas').textContent = m.escolasCom;
  document.getElementById('m-sub').textContent    = m.total + ' resposta' + (m.total !== 1 ? 's' : '') + ' coletadas';

  const probs = Object.entries(m.probMap).sort((a, b) => b[1] - a[1]);
  if (probs.length) {
    document.getElementById('m-prob').textContent     = probs[0][0].split('(')[0].trim().split(' ')[0];
    document.getElementById('m-prob-pct').textContent = ((probs[0][1] / m.total) * 100).toFixed(0) + '% citam como nº1';
  }

  // Gauge SVG
  const pct = m.iapGeral / 10;
  document.getElementById('gauge-arc').style.strokeDashoffset = 226 - pct * 226;
  const gVal = document.getElementById('gauge-valor');
  gVal.textContent  = m.iapGeral.toFixed(1);
  gVal.style.color  = corTexto(m.iapGeral);
  const desc = m.iapGeral >= 7 ? '🟢 Aprovação positiva' : m.iapGeral >= 5 ? '🟡 Regular' : '🔴 Crítico';
  const dEl  = document.getElementById('gauge-desc');
  dEl.textContent    = desc;
  dEl.style.background = m.iapGeral >= 7 ? 'rgba(0,229,160,.1)' : m.iapGeral >= 5 ? 'rgba(255,208,96,.1)' : 'rgba(255,77,109,.1)';
  dEl.style.color      = m.iapGeral >= 7 ? '#00E5A0' : m.iapGeral >= 5 ? '#FFD060' : '#FF4D6D';
  dEl.style.border     = `1px solid ${m.iapGeral >= 7 ? 'rgba(0,229,160,.3)' : m.iapGeral >= 5 ? 'rgba(255,208,96,.3)' : 'rgba(255,77,109,.3)'}`;

  // Temas — t.nome vem de dado estático, sem risco de XSS
  document.getElementById('temas-content').innerHTML = TEMAS.map(t => {
    const s   = m.temaScores[t.id];
    const pct = s != null ? (s / 10) * 100 : 0;
    const cor = corTexto(s);
    return `<div class="tema-row">
      <div class="tema-header"><div class="tema-nome">${t.nome}</div><div class="tema-nota" style="color:${cor}">${s != null ? s.toFixed(1) : '—'}</div></div>
      <div class="barra-bg"><div class="barra-fill-anim" style="width:${pct}%;background:linear-gradient(90deg,${cor}80,${cor})"></div></div>
    </div>`;
  }).join('');

  // Qualidade de vida — labels de qvOrdem são dados estáticos, sem XSS
  const qvOrdem = ['Muito boa', 'Boa', 'Regular', 'Ruim', 'Muito ruim'];
  const qvCores = ['#00E5A0', '#5DB8FF', '#FFD060', '#FF8A3D', '#FF4D6D'];
  const qvTot   = Object.values(m.qvMap).reduce((a, b) => a + b, 0) || 1;
  document.getElementById('dist-content').innerHTML = qvOrdem.map((l, i) => {
    const q = m.qvMap[l] || 0, p = ((q / qvTot) * 100).toFixed(1);
    return `<div class="dist-row">
      <div class="dist-label">${l}</div>
      <div class="dist-barra"><div class="dist-fill" style="width:${p}%;background:${qvCores[i]}"><span>${q > 0 ? q : ''}</span></div></div>
      <div class="dist-pct">${p}%</div>
    </div>`;
  }).join('');

  // Problemas — problema_principal vem do usuário: DEVE usar escapeHtml
  const pTot = Object.values(m.probMap).reduce((a, b) => a + b, 0) || 1;
  document.getElementById('prob-content').innerHTML = Object.entries(m.probMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 6)
    .map(([nome, qtd], i) => `<div class="prob-item">
      <div class="prob-rank">${i + 1}</div>
      <div class="prob-nome">${escapeHtml(nome)}</div>
      <div class="prob-pct">${((qtd / pTot) * 100).toFixed(0)}%</div>
    </div>`).join('');

  // Grid 91 escolas — e.n e e.b são dados estáticos
  const comResp = ESCOLAS
    .filter(e => m.escolaScores[e.i] && m.escolaScores[e.i].n > 0)
    .sort((a, b) => (m.escolaScores[b.i]?.iapPonderado || 0) - (m.escolaScores[a.i]?.iapPonderado || 0));
  const semResp = ESCOLAS.filter(e => !m.escolaScores[e.i] || m.escolaScores[e.i].n === 0);

  document.getElementById('escolas-grid-content').innerHTML = `<div class="escolas-grid">${
    [...comResp, ...semResp].map(e => {
      const s       = m.escolaScores[e.i];
      const temDado = s && s.n > 0;
      const iap     = temDado ? s.iapPonderado : null;
      const cor     = corTexto(iap);
      const corBorda = iap != null ? corNota(iap) + '40' : 'var(--borda)';
      const bg       = iap != null ? corNota(iap) + '12' : '';
      return `<div class="ecell" style="border-color:${corBorda};background:${bg}">
        <div class="ecell-nome">${e.n.replace(/^(EE|EMEB|ETEC|FATEC|SESI|SENAC|Faculdades?) /, '')}</div>
        <div class="ecell-bairro">${e.b}</div>
        <div class="ecell-nota" style="color:${cor}">${iap != null ? iap.toFixed(1) : '·'}</div>
        ${temDado ? `<div class="ecell-n">n=${s.n}</div>` : ''}
        <div class="ecell-apt">⚖ ${(e.apt / 1000).toFixed(1)}k eleit.</div>
      </div>`;
    }).join('')
  }</div>`;

  atualizarVisualizacaoMapa();
}

// ── POLLING ───────────────────────────────────────────────────────────────

let carregando  = false;
let _lastHash   = 0;

async function carregar() {
  // Pausa enquanto a aba está oculta — retoma via visibilitychange abaixo.
  if (document.hidden || carregando) return;
  carregando = true;

  const elStatus = document.getElementById('atualizado');
  try {
    const resp = await fetch(`${CSV_URL}&nocache=${Date.now()}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const txt  = await resp.text();

    // Só re-renderiza se os dados mudaram — evita reconstruir 91 nós DOM a cada 30s
    const hash = _hash(txt);
    if (hash !== _lastHash) {
      _lastHash = hash;
      const rows = parseCSV(txt);
      if (rows.length > 0) render(calcular(rows));
    }

    elStatus.textContent = 'Atualizado às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    elStatus.style.color = '';
  } catch (err) {
    // Erro visível para o usuário — não apenas no console do DevTools
    console.error('Civiq: falha ao carregar dados', err);
    elStatus.textContent = '⚠ Falha ao carregar — tentando em 30s';
    elStatus.style.color = 'var(--vermelho)';
  } finally {
    // Garante reset mesmo em exceção inesperada — sem polling travado para sempre
    carregando = false;
  }
}

// Inicializa mapa imediatamente (independente do sucesso do fetch)
initMapa();

// Primeira carga
carregar();

// Polling a cada 30s — pausa automaticamente quando a aba está oculta
setInterval(carregar, POLL_MS);

// Recarrega imediatamente ao voltar à aba após background
document.addEventListener('visibilitychange', () => { if (!document.hidden) carregar(); });
