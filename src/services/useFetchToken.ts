import CookieService from './CookieService'
import { APIResponses } from '../utils/Enums'

interface ApiTokenResponse { 
    response_code: APIResponses
    response_message: string
    token: string
}

export const useFetchToken = async (): Promise<string> => { 

    let apiToken: string = CookieService.get('api_token');

    if (apiToken) { 
        return apiToken;
    } 

    let res: Response = await fetch('https://opentdb.com/api_token.php?command=request');
    let data: ApiTokenResponse = await res.json();
    
    if (data.response_code === APIResponses.SUCCESS) { 
        apiToken = data.token;
        CookieService.set('api_token', apiToken, 5);
        return apiToken;
    }
    
    return ''
}