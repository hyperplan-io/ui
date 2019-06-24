export const apiRootUrl = (process.env.REACT_APP_API_ROOT || '').replace(/\/$/, '');

export function signIn(username, password) {
  return fetch(`${apiRootUrl}/authentication`, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    }
  });
}

export function getProjects(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/projects`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function getProjectById(id, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/projects/${id}`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function getFeatures(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/features`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function getFeaturesById(id, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/features/${id}`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function getLabels(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/labels`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function getLabelsById(id, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/labels/${id}`, {
    headers: headers,
    method: 'GET',
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function createAlgorithm(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/algorithms`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function createFeatures(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/features`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function createLabels(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/labels`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}

export function createProject(payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/projects`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 201) {
      return res.json();
    }
  });
}

export function patchProject(projectId, payload, accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch(`${apiRootUrl}/projects/${projectId}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(payload),
  }).then(res => {
    if (res.status === 401) {
      invalidateToken();
    } else if (res.status === 200) {
      return res.json();
    }
  });
}
