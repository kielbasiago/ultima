import urljoin from "url-join";

export const getAssetUrl = (str: string) => urljoin(`/images/${str}.png`);
