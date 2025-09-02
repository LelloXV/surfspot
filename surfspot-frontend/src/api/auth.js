import * as jwtDecode from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true; // nessun token = considerato scaduto
  try {
    const decoded = jwtDecode(token); // decode token
    const { exp } = decoded;           // leggi il campo expiration
    return Date.now() >= exp * 1000;   // exp è in secondi
  } catch (err) {
    return true; // token invalido
  }
}

export async function login(username, password) {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await res.json();

    if (res.ok && data.accessToken) {
      return { success: true, token: data.accessToken };
    } else {
      return { success: false, message: data.message || "Credenziali errate" };
    }
  } catch (err) {
    console.error("🔴 Errore di rete:", err);
    return { success: false, message: "Errore di rete" };
  }
}