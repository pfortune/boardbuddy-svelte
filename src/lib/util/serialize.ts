export const serialize = (data: any): any => {
    return JSON.parse(JSON.stringify(data)); 
};