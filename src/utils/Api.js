export function getProjects(accessToken, invalidateToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return fetch('/projects', {
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
  return fetch(`/projects/${id}`, {
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
  return fetch(`/features`, {
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
  return fetch(`/features/${id}`, {
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
  return fetch(`/labels`, {
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
  return fetch(`/labels/${id}`, {
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
  console.log(payload);
  return fetch('/algorithms', {
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
  return fetch('/features', {
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
  return fetch('/labels', {
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
  console.log(payload);
  return fetch(`/projects`, {
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
  return fetch(`/projects/${projectId}`, {
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
