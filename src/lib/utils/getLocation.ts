export const getLocation = async () => {
	const response = await fetch(`https://api.github.com/users/bdauphouy`);

	const data = await response.json();
	const location = data.location;

	if (!location) {
		throw new Error('Location not found');
	}

	return location;
};
