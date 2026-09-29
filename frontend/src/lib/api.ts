function getApiBase(): string {
  let url = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1").trim();
  url = url.replace(/\/+$/, "");
  if (!url.endsWith("/api/v1")) {
    url = `${url}/api/v1`;
  }
  return url;
}

const API_BASE = getApiBase();

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("ayurguru_token") : null;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Query & Assistant
  queryAssistant: (data: { query: string; jurisdiction: string; language: string; category_filter?: string; input_mode?: string }) =>
    fetchApi<any>("/assistant/query", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  escalateQuery: (data: { expert_type: string; reason: string; contact_email: string; query_context?: string }) =>
    fetchApi<any>("/assistant/escalate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  setGeminiKey: (apiKey: string) =>
    fetchApi<any>("/assistant/set-gemini-key", {
      method: "POST",
      body: JSON.stringify({ api_key: apiKey }),
    }),

  // Product Classification
  classifyProduct: (data: any) =>
    fetchApi<any>("/classify/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getClassificationHistory: () => fetchApi<any[]>("/classify/history"),

  // Innovation Gap Analyzer
  analyzeInnovation: (data: { formulation_name: string; ingredients: string[]; intended_use: string; current_form?: string }) =>
    fetchApi<any>("/innovation/analyze", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getRecentInnovations: () => fetchApi<any[]>("/innovation/recent"),

  // Knowledge Graph
  getKnowledgeGraph: (plant?: string) =>
    fetchApi<any>(`/graph/${plant ? `?plant=${encodeURIComponent(plant)}` : ""}`),

  // Regulatory Alerts
  getAlerts: (jurisdiction?: string, category?: string) => {
    const params = new URLSearchParams();
    if (jurisdiction) params.append("jurisdiction", jurisdiction);
    if (category) params.append("category", category);
    return fetchApi<any[]>(`/alerts/?${params.toString()}`);
  },

  // Admin Sources
  getDocuments: (jurisdiction?: string) =>
    fetchApi<any[]>(`/admin/documents${jurisdiction ? `?jurisdiction=${jurisdiction}` : ""}`),

  uploadDocument: async (formData: FormData) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("ayurguru_token") : null;
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Upload failed");
    }
    return res.json();
  },

  // Auth
  demoLogin: () =>
    fetchApi<any>("/auth/demo-login", {
      method: "POST",
    }),

  login: (credentials: { email: string; password: string }) =>
    fetchApi<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (data: { email: string; password: string; full_name: string; role?: string }) =>
    fetchApi<any>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMe: () => fetchApi<any>("/auth/me"),
};
