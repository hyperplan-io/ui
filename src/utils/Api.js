const host = process.env.REACT_APP_SERVER_HOST;

export function signIn(username, password) {
  return fetch(`${host}/authentication`, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function getProjects(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/projects`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function getProjectById(id, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/projects/${id}`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function getFeatures(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/features`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function getFeaturesById(id, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/features/${id}`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function getLabels(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/labels`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function getLabelsById(id, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/labels/${id}`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function createAlgorithm(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/algorithms`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function createFeatures(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/features`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function createLabels(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/labels`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function createProject(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log(payload);
  return fetch(`${host}/projects`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 201) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}

export function patchProject(projectId, payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${host}/projects/${projectId}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        `An error occurred with a network call: http ${res.status} with body ${res.body}`,
      );
    }
  });
}
