export const toTitleCase = (str: string): string => {
    if (!str) return str;
    return str
        .split(/[-\s]/)  // Split by both hyphens and spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
        .join('');  // Join words without any spaces or hyphens
};
