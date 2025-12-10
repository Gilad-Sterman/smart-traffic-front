import { httpService } from './http.service.js'

// Get the base URL for API calls
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:5000/api/'

export const uploadService = {
  // Upload document file
  async uploadDocument(file) {
    const formData = new FormData()
    formData.append('document', file)
    
    try {
      // Use environment-aware URL
      const response = await fetch(`${BASE_URL}upload/document`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  },

  // Start analysis process
  async analyzeDocument(reportId, correctedFields = null) {
    try {
      const requestBody = correctedFields ? { correctedFields } : {}
      return await httpService.post(`upload/analyze/${reportId}`, requestBody)
    } catch (error) {
      console.error('Analysis error:', error)
      throw error
    }
  },

  // Get analysis results
  async getResults(reportId) {
    try {
      return await httpService.get(`upload/results/${reportId}`)
    } catch (error) {
      console.error('Get results error:', error)
      throw error
    }
  },

  // Test backend connection
  async testConnection() {
    try {
      return await httpService.get('upload/test')
    } catch (error) {
      console.error('Connection test error:', error)
      throw error
    }
  }
}
