// ===============================
// 🔥 ID DEL USUARIO
// ===============================
const id = localStorage.getItem("usuarioID");

// ===============================
// 🔥 CREADOR → prueba infinita
// ===============================
if (localStorage.getItem("modoCreador") === "true") {
    const diasRest = document.getElementById("diasRestantes");
    if (diasRest) diasRest.innerText = "∞";
    return;
}

// ===============================
// 🔥 DATOS DE LA PRUEBA
// ===============================
const activa = localStorage.getItem(id + "_pruebaActiva");
const finRaw = localStorage.getItem(id + "_pruebaFin");

// ===============================
// 🔥 PROTECCIÓN: prueba corrupta o inexistente
// ===============================
if (!activa || !finRaw || isNaN(Number(finRaw))) {
    location.href = "premium.html";
    return;
}

const fin = Number(finRaw);
const ahora = Date.now();

// ===============================
// 🔥 CÁLCULO PERFECTO DE DÍAS RESTANTES
// ===============================
// Evita el bug de "0 días"
const dias = Math.floor((fin - ahora) / (1000 * 60 * 60 * 24)) + 1;

// ===============================
// 🔥 PRUEBA CADUCADA
// ===============================
if (dias <= 0) {
    localStorage.removeItem(id + "_pruebaActiva");
    location.href = "premium.html";
    return;
}

// ===============================
// 🔥 MOSTRAR DÍAS RESTANTES
// ===============================
const diasRest = document.getElementById("diasRestantes");
if (diasRest) diasRest.innerText = dias;
