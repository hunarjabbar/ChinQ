export async function apiFetch(url: string, options: RequestInit = {}) {
  const authStorage = localStorage.getItem('auth-storage');
  let token = '';
  if (authStorage) {
    try {
      token = JSON.parse(authStorage).state.token;
    } catch (e) {}
  }

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      // Optional: Handle unauthorized
    }
  }

  return res;
}

export async function publishLiveUpdate(data: any) {
  try {
    const res = await apiFetch(`/api/admin/live/${data.eventId}/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || 'Failed to publish' };
    }
    
    const result = await res.json();
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
