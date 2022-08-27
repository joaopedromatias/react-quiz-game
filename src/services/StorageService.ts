export class Storage { 
    
    static getItem(key: string): string { 
        return window.localStorage.getItem(key) || '';
    }

    static setItem (key: string, value: string): void { 
        window.localStorage.setItem(key, value)
    }

    static removeItem(key: string): void { 
        window.localStorage.removeItem(key);
    }

}