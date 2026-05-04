import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

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

async function findUserByEmailAndPassword(email, password) {
  const usersCollection = collection(db, 'users');
  const emailQuery = query(usersCollection, where('email', '==', email));
  const querySnapshot = await getDocs(emailQuery);

  if (querySnapshot.empty) {
    return null;
  }

  let foundUser = null;
  querySnapshot.forEach(doc => {
    const userData = doc.data();
    if (userData.password === password) {
      foundUser = { id: doc.id, ...userData };
    }
  });

  return foundUser;
}

function showMessage(text, isError = false) {
  const msg = document.getElementById('loginMsg');
  msg.innerText = text;
  msg.style.color = isError ? '#d8000c' : '#2f6627';
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const user = await findUserByEmailAndPassword(email, password);
    if (!user) {
      showMessage('Email ou senha inválidos.', true);
      return;
    }

    localStorage.setItem('loggedUserName', user.name || user.email);
    showMessage('Login realizado com sucesso! Redirecionando...');
    setTimeout(() => {
      window.location.href = 'Menu.html';
    }, 1000);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    showMessage('Erro ao fazer login. Tente novamente.', true);
  }
});