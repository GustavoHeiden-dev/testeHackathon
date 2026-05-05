// Verificação de login
const welcomeText = document.getElementById('welcomeText');
const loggedUser = localStorage.getItem('loggedUserName');

if (!loggedUser) {
  window.location.href = 'Login.html';
} else {
  welcomeText.innerText = `Bem-vindo, ${loggedUser}!`;
}

document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('loggedUserName');
  window.location.href = 'Login.html';
});

// 🧠 IA FAKE INTELIGENTE
function gerarDescricaoFake(roupaId) {

  const banco = {
    camisa: {
      tipo: "camiseta",
      tecido: ["algodão leve", "malha macia", "tecido respirável"],
      toque: ["suave ao toque", "extremamente confortável", "macio e leve"],
      caimento: ["solto no corpo", "com caimento relaxado", "levemente ajustado"],
      estilo: ["casual", "moderno", "ideal para o dia a dia"]
    },
    calca: {
      tipo: "calça jeans",
      tecido: ["denim resistente", "tecido encorpado", "jeans de média gramatura"],
      toque: ["firme e estruturado", "confortável ao uso", "com leve rigidez inicial"],
      caimento: ["reto", "ajustado nas pernas", "modelagem tradicional"],
      estilo: ["versátil", "urbano", "perfeito para diversas ocasiões"]
    }
  };

  const item = banco[roupaId];

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return `Esta ${item.tipo} é feita de ${random(item.tecido)}, com um toque ${random(item.toque)}. 
Ela possui um caimento ${random(item.caimento)}, proporcionando conforto durante o uso. 
Seu estilo é ${random(item.estilo)}, sendo uma ótima escolha para compor diferentes looks.`;
}

// 🔊 VOZ MELHORADA
function falarDescricao(descricao) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(descricao);
    utterance.lang = 'pt-BR';

    const voices = speechSynthesis.getVoices();

    const vozSuave =
      voices.find(v => v.lang === 'pt-BR' && v.name.toLowerCase().includes('female')) ||
      voices.find(v => v.lang === 'pt-BR') ||
      voices[0];

    if (vozSuave) {
      utterance.voice = vozSuave;
    }

    utterance.rate = 0.85;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  } else {
    alert('Seu navegador não suporta áudio.');
  }
}

// 🚀 PROCESSO PRINCIPAL (SEM API)
async function processarDescricao(roupaId, imgId, buttonId, textId, loadingId) {
  const button = document.getElementById(buttonId);
  const textElement = document.getElementById(textId);
  const loadingElement = document.getElementById(loadingId);

  button.disabled = true;
  loadingElement.style.display = 'block';
  textElement.innerText = '';

  // Simula tempo de "IA pensando"
  setTimeout(() => {
    const descricao = gerarDescricaoFake(roupaId);

    textElement.innerText = descricao;
    falarDescricao(descricao);

    button.disabled = false;
    loadingElement.style.display = 'none';
  }, 1200); // delay fake
}

// Eventos
document.getElementById('ouvirDescricaoCamisa').addEventListener('click', () => {
  processarDescricao('camisa', 'camisaImg', 'ouvirDescricaoCamisa', 'descricaoCamisa', 'loadingCamisa');
});

document.getElementById('ouvirDescricaoCalca').addEventListener('click', () => {
  processarDescricao('calca', 'calcaImg', 'ouvirDescricaoCalca', 'descricaoCalca', 'loadingCalca');
});