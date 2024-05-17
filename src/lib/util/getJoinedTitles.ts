
export const getJoinedTitles =  (items: any[]): string => {
    return items.map((item) => item.title).join(", ");
  };