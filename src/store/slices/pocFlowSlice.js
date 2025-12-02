import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStep: 1,
  totalSteps: 5,
  stepData: {
    upload: {
      fileName: '',
      fileSize: 0,
      fileType: '',
      fileDataUrl: null, // Store as data URL instead of File object
      sessionId: null // Backend session ID
    },
    ocr: {
      extractedFields: {},
      confidenceScores: {},
      isEdited: false
    },
    analysis: {
      isProcessing: false,
      progress: 0,
      results: null
    },
    results: {
      conclusion: null,
      recommendation: null,
      explanation: ''
    },
    pdf: {
      isGenerated: false,
      downloadUrl: null
    }
  },
  canProceed: false,
  error: null
}

export const pocFlowSlice = createSlice({
  name: 'pocFlow',
  initialState,
  reducers: {
    // Step Navigation
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps && state.canProceed) {
        state.currentStep += 1
        state.canProceed = false // Reset for next step validation
      }
    },
    
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1
        state.canProceed = true // Can always go back
      }
    },
    
    goToStep: (state, action) => {
      const targetStep = action.payload
      if (targetStep >= 1 && targetStep <= state.totalSteps) {
        state.currentStep = targetStep
      }
    },
    
    resetFlow: (state) => {
      return { ...initialState }
    },
    
    // Step Validation
    setCanProceed: (state, action) => {
      state.canProceed = action.payload
    },
    
    // Upload Step
    setUploadFile: (state, action) => {
      const { fileName, fileSize, fileType, fileDataUrl, sessionId } = action.payload
      state.stepData.upload = { fileName, fileSize, fileType, fileDataUrl, sessionId }
      state.canProceed = !!fileName
    },
    
    clearUploadFile: (state) => {
      state.stepData.upload = initialState.stepData.upload
      state.canProceed = false
    },
    
    // OCR Step
    setOCRResults: (state, action) => {
      const { extractedFields, confidenceScores } = action.payload
      state.stepData.ocr.extractedFields = extractedFields
      state.stepData.ocr.confidenceScores = confidenceScores
      
      // Check if all required fields are filled
      const requiredFields = ['reportNumber', 'date', 'violationType', 'fineAmount']
      const hasAllRequired = requiredFields.every(
        field => extractedFields[field]?.trim()
      )
      state.canProceed = hasAllRequired
    },
    
    updateOCRField: (state, action) => {
      const { fieldName, value } = action.payload
      state.stepData.ocr.extractedFields[fieldName] = value
      state.stepData.ocr.isEdited = true
      
      // Check if all required fields are filled
      const requiredFields = ['reportNumber', 'date', 'violationType', 'fineAmount']
      const hasAllRequired = requiredFields.every(
        field => state.stepData.ocr.extractedFields[field]?.trim()
      )
      state.canProceed = hasAllRequired
    },
    
    // Analysis Step
    setAnalysisProgress: (state, action) => {
      state.stepData.analysis.progress = action.payload
    },
    
    setAnalysisProcessing: (state, action) => {
      state.stepData.analysis.isProcessing = action.payload
    },
    
    setAnalysisResults: (state, action) => {
      state.stepData.analysis.results = action.payload
      state.stepData.analysis.isProcessing = false
      state.canProceed = true
    },
    
    // Results Step
    setResultsData: (state, action) => {
      const { conclusion, recommendation, explanation } = action.payload
      state.stepData.results = { conclusion, recommendation, explanation }
      state.canProceed = true
    },
    
    // PDF Step
    setPDFGenerated: (state, action) => {
      const { downloadUrl } = action.payload
      state.stepData.pdf = {
        isGenerated: true,
        downloadUrl
      }
      state.canProceed = true
    },
    
    // Error Handling
    setError: (state, action) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    }
  },
})

export const {
  nextStep,
  prevStep,
  goToStep,
  resetFlow,
  setCanProceed,
  setUploadFile,
  clearUploadFile,
  setOCRResults,
  updateOCRField,
  setAnalysisProgress,
  setAnalysisProcessing,
  setAnalysisResults,
  setResultsData,
  setPDFGenerated,
  setError,
  clearError
} = pocFlowSlice.actions

export default pocFlowSlice.reducer
