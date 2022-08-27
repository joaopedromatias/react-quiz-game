class CookieService {
    
    static set(key: string , value: string, hours: number): void {
        let expireDate = new Date()
        expireDate.setTime(expireDate.getTime() + (hours*60*60*1000));
        document.cookie = `${key}=${value};expires=${expireDate}; path=/`
    }

    static get(key: string): string {
        if (window.document.cookie.includes(' ;')) { 
            let search = key + '=';
            let initialPos = window.document.cookie.indexOf(search);
            if (initialPos > -1) {
                let length = search.length;
                let finalPos = window.document.cookie.indexOf(';', initialPos);
                let cookieValue = window.document.cookie.substring(initialPos + length, finalPos);
                return cookieValue
            }
            return ''
        } 
        let search = key + '=';
        let initialPos = window.document.cookie.indexOf(search);
        if (initialPos > -1) {
            let length = search.length;
            let cookieValue = window.document.cookie.substring(initialPos + length);
            return cookieValue
        }
        return ''
    }

    static delete(key: string): void { 
        let pastDate = new Date(0);
        document.cookie = `${key}=; expires=${pastDate}; path=/`
    }
}

export default CookieService