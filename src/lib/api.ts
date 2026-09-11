export async function apiFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
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
      let errorMsg = 'Failed to publish';
      try {
        const errorData = await res.json();
        errorMsg = errorData.error || errorMsg;
      } catch {}
      return { success: false, error: errorMsg };
    }
    
    const result = await res.json();
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
