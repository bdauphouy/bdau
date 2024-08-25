import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => redirect(302, '/admin/index.html');
