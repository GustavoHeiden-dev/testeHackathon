import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgTdCjjd9JPFYRPxU_lsBCQ0FgKpv0wMo",
  authDomain: "testehackathon-983aa.firebaseapp.com",
  projectId: "testehackathon-983aa",
  storageBucket: "testehackathon-983aa.firebasestorage.app",
  messagingSenderId: "237901894493",
  appId: "1:237901894493:web:3deda0ee2158369e814eb4",
  measurementId: "G-41WYNNF65W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveUser(user) {
  const usersCollection = collection(db, 'users');
  const docRef = await addDoc(usersCollection, user);
  return docRef.id;
}

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    const msg = document.getElementById('msg');
    msg.innerText = 'As senhas não coincidem!';
    msg.style.color = '#d8000c';
    return;
  }

  const user = { name, email, password, createdAt: new Date().toISOString() };

  try {
    await saveUser(user);
    const msg = document.getElementById('msg');
    msg.innerText = 'Usuário cadastrado com sucesso! Redirecionando para login...';
    msg.style.color = '#2f6627';
    registrationForm.reset();
    setTimeout(() => {
      window.location.href = 'Login.html';
    }, 1200);
  } catch (error) {
    console.error('Erro ao salvar usuário no Firestore:', error);
    const msg = document.getElementById('msg');
    msg.innerText = 'Erro ao cadastrar usuário. Tente novamente.';
    msg.style.color = '#d8000c';
  }
});