// Ciwaanka backend-ka (IP-ga kombiyuutarkaaga)
// Haddii router-ku beddelo IP-ga, halkan ku beddel (ipconfig -> IPv4)
export const API_URL = "http://192.168.0.107:5000";

type ApiResult<T = any> = { ok: true; data: T } | { ok: false; error: string };

async function request<T = any>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
  token?: string | null,
): Promise<ApiResult<T>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message =
        (data && (data.message || data.error)) || "Khalad ayaa dhacay";
      return { ok: false, error: message };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, error: "Server-ka lama gaadhi karo" };
  }
}

export function postJson<T = any>(
  path: string,
  body: unknown,
  token?: string | null,
) {
  return request<T>("POST", path, body, token);
}

export function putJson<T = any>(
  path: string,
  body: unknown,
  token?: string | null,
) {
  return request<T>("PUT", path, body, token);
}

export function deleteJson<T = any>(path: string, token?: string | null) {
  return request<T>("DELETE", path, undefined, token);
}

export function getJson<T = any>(path: string, token?: string | null) {
  return request<T>("GET", path, undefined, token);
}
