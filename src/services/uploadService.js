import { httpService } from './http.service.js'

export const uploadService = {
  // Upload document file
  async uploadDocument(file) {
    const formData = new FormData()
    formData.append('document', file)
    
    try {
      // Use real routes with proper user handling
      const response = await fetch('http://localhost:5000/api/upload/document', {
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
  async analyzeDocument(reportId) {
    try {
      return await httpService.post(`upload/analyze/${reportId}`)
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
