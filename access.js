// ===============================
// 🔥 SISTEMA DE ACCESO UNIFICADO (VERSIÓN PERFECTA)
// ===============================

// Generar ID si no existe
function obtenerID() {
    let id = localStorage.getItem("usuarioID");
    if (!id) {
        id = "USER-" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("usuarioID", id);
    }
    return id;
}

// ===============================
// 🔥 FUNCIONES BASE
// ===============================

function esCreador() {
    return localStorage.getItem("modoCreador") === "true";
}

function esPremiumMensual(id) {
    const activo = localStorage.getItem(id + "_premiumActivo");
    const fin = Number(localStorage.getItem(id + "_premiumFin"));

    if (activo === "true") {
        if (Date.now() > fin || isNaN(fin)) {
            localStorage.removeItem(id + "_premiumActivo");
            localStorage.removeItem(id + "_premiumFin");
            return false;
        }
        return true;
    }
    return false;
}

function esPruebaActiva(id) {
    const activa = localStorage.getItem(id + "_pruebaActiva");
    const fin = Number(localStorage.getItem(id + "_pruebaFin"));

    if (activa === "true") {
        if (Date.now() > fin || isNaN(fin)) {
            localStorage.removeItem(id + "_pruebaActiva");
            localStorage.removeItem(id + "_pruebaFin");
            return false;
        }
        return true;
    }
    return false;
}

// ===============================
// 🔥 ACCESO A MÓDULOS NORMALES
// ===============================
function accesoModuloNormal() {
    const id = obtenerID();

    // ❗ Limpieza automática de pruebas corruptas
    const pruebaActiva = localStorage.getItem(id + "_pruebaActiva");
    const pruebaFin = localStorage.getItem(id + "_pruebaFin");

    if (pruebaActiva === "true" && (!pruebaFin || isNaN(Number(pruebaFin)))) {
        localStorage.removeItem(id + "_pruebaActiva");
        localStorage.removeItem(id + "_pruebaFin");
    }

    // Acceso permitido si:
    if (
        esCreador() ||
        esPremiumMensual(id) ||
        esPruebaActiva(id)
    ) {
        return; // acceso permitido
    }

    // Si no tiene nada → premium.html
    location.href = "premium.html";
}

// ===============================
// 🔥 ACCESO A MÓDULOS EXCLUSIVOS
// ===============================
function accesoModuloPremiumSolo() {
    const id = obtenerID();

    if (esCreador() || esPremiumMensual(id)) {
        return; // acceso permitido
    }

    if (esPruebaActiva(id)) {
        alert("Este módulo es exclusivo para usuarios PREMIUM.");
        location.href = "premium.html";
        return;
    }

    location.href = "premium.html";
}
