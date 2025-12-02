import { httpService } from './http.service.js'

export const uploadService = {
  // Upload document file
  async uploadDocument(file) {
    const formData = new FormData()
    formData.append('document', file)
    
    try {
      // Use httpService but need to handle FormData differently
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
  async analyzeDocument(sessionId) {
    try {
      return await httpService.post(`upload/analyze/${sessionId}`)
    } catch (error) {
      console.error('Analysis error:', error)
      throw error
    }
  },

  // Get analysis results
  async getResults(sessionId) {
    try {
      return await httpService.get(`upload/results/${sessionId}`)
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
