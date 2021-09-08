import axios from 'axios';

const baseURL = 'https://test-server-garamkim.run.goorm.io';

export const Client = async function(endpoint, {body, ...customConfig }={}) {
	const headers = {'Content-Type': 'application/json'};
	const config = {
		method: body ? "POST" : "GET",
		headers: {
			headers,
			...customConfig.headers
		},
		url: endpoint,
		baseURL
		
	}
	
	if(body) {
		console.log(body);
		config.data = body;
	}
	let data;
	try {
		let response = await axios(config);
		const data = response.data;
		console.log(response);
		data.forEach(o => o.id = o._id);
		return data;
		
		throw new Error(response.statusText);
	} catch(err) {
		console.log(err.message);
		return Promise.reject(err.message ? err.message: data);
	}
}

Client.get = function(endpoint, customConfig = {}) {
	return Client(endpoint, {method:"GET", ...customConfig})
}

Client.post = function(endpoint, body, customConfig = {}) {
	return Client(endpoint, {body, ...customConfig});
}