class CookieService {
  static set(key: string, value: string, hours: number): void {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${key}=${value};expires=${expireDate}; path=/`;
  }

  static get(key: string): string {
    if (window.document.cookie.includes(' ;')) {
      const search = key + '=';
      const initialPos = window.document.cookie.indexOf(search);
      if (initialPos > -1) {
        const length = search.length;
        const finalPos = window.document.cookie.indexOf(';', initialPos);
        const cookieValue = window.document.cookie.substring(initialPos + length, finalPos);
        return cookieValue;
      }
      return '';
    }
    const search = key + '=';
    const initialPos = window.document.cookie.indexOf(search);
    if (initialPos > -1) {
      const length = search.length;
      const cookieValue = window.document.cookie.substring(initialPos + length);
      return cookieValue;
    }
    return '';
  }

  static delete(key: string): void {
    const pastDate = new Date(0);
    document.cookie = `${key}=; expires=${pastDate}; path=/`;
  }
}

export default CookieService;
