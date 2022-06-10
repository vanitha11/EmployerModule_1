export default async (url, method, body, headers, fileBody) => {
    const requestHeaders = {
        'Content-Type': fileBody ? '' : 'application/json',
        'Accept': fileBody ? '*/*' : 'application/json',
        ...headers
    };
    const request = fileBody ? {
        method,
        body
    } : {
        method,
        headers: requestHeaders,
        body: JSON.stringify(body)
    };
    const response = await fetch(url, request);
    if (response.ok) {
        const data = await response.json();
        if (data.statusCode && data.statusCode !== 200) {
            throw new Error(data.message);
        }
        return data.data;
    } else {
        const contentType = response.headers.get("content-type");
        let message = '';
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            message = data.message ? data.message : data;
        } else {
            message = await response.text();
        }
        throw new Error(message);
    }
}
