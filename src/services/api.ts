/**
 * API Service Layer for Expense Tracker Backend
 *
 * Handles all HTTP requests to the backend server
 */

// API Configuration
// Use relative URLs in development - Vite proxy will handle routing to backend
const API_BASE_URL = ''

// Backend API Types
export interface BackendExpense {
  id?: number
  name: string
  amount: number
  currency: string
  category: string
  date: string
}

export interface CreateExpenseDto {
  name: string
  amount: number
  currency: string
  category: string
  date?: string
}

export interface UpdateExpenseDto {
  name?: string
  amount?: number
  currency?: string
  category?: string
  date?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ExpenseListResponse extends ApiResponse<BackendExpense[]> {
  count?: number
  category?: string
  dateRange?: {
    startDate: string
    endDate: string
  }
}

export interface ExpenseStats {
  totalAmount: number
  totalCount: number
  categories: Array<{
    category: string
    total: number
    count: number
  }>
}

// HTTP Client Helper
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`API Request failed: ${endpoint}`, error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL)

// API Service Functions
export const expenseApi = {
  // Health & System
  async checkHealth(): Promise<ApiResponse<unknown>> {
    return apiClient.get<ApiResponse<unknown>>('/health')
  },

  async ping(): Promise<ApiResponse<string>> {
    return apiClient.get<ApiResponse<string>>('/api/ping')
  },

  // Expense Management
  async createExpense(
    expense: CreateExpenseDto
  ): Promise<ApiResponse<BackendExpense>> {
    return apiClient.post<ApiResponse<BackendExpense>>('/api/expenses', expense)
  },

  async getAllExpenses(): Promise<ExpenseListResponse> {
    return apiClient.get<ExpenseListResponse>('/api/expenses')
  },

  async getExpenseById(id: number): Promise<ApiResponse<BackendExpense>> {
    return apiClient.get<ApiResponse<BackendExpense>>(`/api/expenses/${id}`)
  },

  async updateExpense(
    id: number,
    expense: UpdateExpenseDto
  ): Promise<ApiResponse<BackendExpense>> {
    return apiClient.put<ApiResponse<BackendExpense>>(
      `/api/expenses/${id}`,
      expense
    )
  },

  async partialUpdateExpense(
    id: number,
    expense: Partial<UpdateExpenseDto>
  ): Promise<ApiResponse<BackendExpense>> {
    return apiClient.patch<ApiResponse<BackendExpense>>(
      `/api/expenses/${id}`,
      expense
    )
  },

  async deleteExpense(id: number): Promise<ApiResponse<unknown>> {
    return apiClient.delete<ApiResponse<unknown>>(`/api/expenses/${id}`)
  },

  async searchExpenses(params: {
    category?: string
    startDate?: string
    endDate?: string
  }): Promise<ExpenseListResponse> {
    const searchParams = new URLSearchParams()
    if (params.category) searchParams.append('category', params.category)
    if (params.startDate) searchParams.append('startDate', params.startDate)
    if (params.endDate) searchParams.append('endDate', params.endDate)

    const query = searchParams.toString()
    return apiClient.get<ExpenseListResponse>(
      `/api/expenses/search${query ? `?${query}` : ''}`
    )
  },

  async getExpenseStats(): Promise<ApiResponse<ExpenseStats>> {
    return apiClient.get<ApiResponse<ExpenseStats>>('/api/expenses/stats')
  },
}

// Utility function to convert backend expense to frontend expense
export function convertBackendExpenseToFrontend(
  backendExpense: BackendExpense
) {
  return {
    id: backendExpense.id?.toString() || '',
    name: backendExpense.name,
    amount: backendExpense.amount,
    currency: backendExpense.currency,
    category: backendExpense.category,
    date: backendExpense.date,
    createdAt: new Date().toISOString(), // Backend doesn't provide these
    updatedAt: new Date().toISOString(), // Backend doesn't provide these
  }
}

// Utility function to convert frontend expense form data to backend format
export function convertFrontendFormToBackend(formData: {
  name: string
  amount: string
  currency: string
  category: string
  date: string
}): CreateExpenseDto {
  return {
    name: formData.name,
    amount: parseFloat(formData.amount),
    currency: formData.currency,
    category: formData.category,
    date: formData.date,
  }
}
