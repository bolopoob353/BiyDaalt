export interface RateLimiter{


/** 
    @param key хэрэглэгч ID
    @returns true = зөвшөөрнө, false = хэтэрсэн
*/
 
allow (key: string): boolean;
}