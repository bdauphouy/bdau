import { VERCEL_API_TOKEN, VERCEL_PROJET_ID } from '$env/static/private';

export const getLastUpdate = async () => {
	const response = await fetch(
		`https://api.vercel.com/v6/deployments?limit=1&projectId=${VERCEL_PROJET_ID}&target=production`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${VERCEL_API_TOKEN}`
			}
		}
	);

	const data = await response.json();

	return new Date(data.deployments[0].ready);
};
