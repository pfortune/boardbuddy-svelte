export const toTitleCase = (str: string): string => {
    if (!str) return str;
    return str
        .split(/[-\s]/) 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');  
};
