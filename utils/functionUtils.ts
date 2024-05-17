import { NextApiRequest } from 'next';
/*
This function is used to extract the id from the url.
*/
export function extractIdFromUrl(req: NextApiRequest): string | null {
    if (!req.url) return null;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    return id || null;
}
