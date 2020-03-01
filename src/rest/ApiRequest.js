export const apiRequest = (options) => {

  const headers = new Headers({
    // 'Content-Type': 'application/json'
  });

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  });
};
