//-----------------------
export function getUserData() {
    const rawUserData = localStorage.getItem("user");
    let userData;
    if (rawUserData) {
        userData = JSON.parse(rawUserData);
    }
    if (typeof userData === "object" &&
        "username" in userData &&
        "avatarUrl" in userData) {
        return userData;
    }
    // de verificat daca userData e obiect
    // de verficat daca obiectul contine cheia avatar Url
    // de verificat daca obiectul contine cheia user.
    return JSON.parse(rawUserData);
}
export function saveUserDataInLocalStorage(userName, avatarUrl) {
    localStorage.setItem("user", JSON.stringify({ username: userName, avatarUrl: avatarUrl }));
}
export function getFavoritesAmount() {
    const favoritesAmount = localStorage.getItem("favoritesAmount");
    if (favoritesAmount == null)
        return 0;
    return JSON.parse(favoritesAmount);
}
export function renderBlock(elementId, html) {
    const element = document.getElementById(elementId);
    element.innerHTML = html;
}
export function renderToast(message, action) {
    let messageText = "";
    if (message != null) {
        messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${(action === null || action === void 0 ? void 0 : action.name) || "Закрыть"}</button>
      </div>
    `;
    }
    renderBlock("toast-block", messageText);
    const button = document.getElementById("toast-main-action");
    if (button != null) {
        button.onclick = function () {
            if (action != null && action.handler != null) {
                action.handler();
            }
            renderToast(null, undefined);
        };
    }
}
