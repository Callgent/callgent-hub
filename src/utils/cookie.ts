export function getCookie(name: string) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookiePair = cookieArray[i].split('=');
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

export function setCookie(name: string, value: string) {
    const domain = import.meta.env.VITE_APP_DOMAIN;
    const date = new Date();
    date.setTime(date.getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/;domain=' + domain + ';';
}

export function deleteCookie(name: string) {
    const domain = import.meta.env.VITE_APP_DOMAIN;
    document.cookie = name + '=; Path=/; Domain=' + domain + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
