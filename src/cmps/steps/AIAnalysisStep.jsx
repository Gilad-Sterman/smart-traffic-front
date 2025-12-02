import { useDispatch, useSelector } from 'react-redux'
import { setAnalysisResults, nextStep, setAnalysisProcessing, resetFlow } from '../../store/slices/pocFlowSlice'
import { uploadService } from '../../services/uploadService'
import { useEffect, useRef, useState } from 'react'

export function AIAnalysisStep() {
    const dispatch = useDispatch()
    const { stepData, canProceed } = useSelector(state => state.pocFlow)
    const analysisData = stepData.analysis
    const analysisStarted = useRef(false)
    const [status, setStatus] = useState('processing') // 'processing', 'success', 'error'
    
    useEffect(() => {
        // Only start analysis if we have valid session data and OCR results
        const hasValidSession = stepData.upload.sessionId && stepData.upload.fileName
        const hasOCRData = stepData.ocr.extractedFields && Object.keys(stepData.ocr.extractedFields).length > 0
        
        if (!analysisData.isProcessing && !analysisData.results && hasValidSession && hasOCRData && !analysisStarted.current) {
            analysisStarted.current = true
            performAnalysis()
        } else if (analysisData.results) {
            // If results already exist, show success status
            setStatus('success')
        } else if (!hasValidSession || !hasOCRData) {
            // If no valid data, show error
            setStatus('error')
        }
    }, [stepData.upload.sessionId, stepData.upload.fileName, stepData.ocr.extractedFields, analysisData.isProcessing, analysisData.results])
    
    const performAnalysis = async () => {
        const sessionId = stepData.upload.sessionId
        
        if (!sessionId) {
            console.error('❌ No session ID found')
            setStatus('error')
            return
        }
        
        try {
            setStatus('processing')
            dispatch(setAnalysisProcessing(true))
            
            // Call backend analysis immediately
            const analysisResponse = await uploadService.analyzeDocument(sessionId)
            
            // Extract results from backend response
            const results = analysisResponse.analysisResults
            dispatch(setAnalysisResults({
                legalSection: results.legalAnalysis.section,
                points: results.legalAnalysis.points,
                appealProbability: results.appealAssessment.probability,
                recommendation: results.appealAssessment.recommendation,
                reasoning: results.appealAssessment.reasoning,
                technicalIssues: results.technicalIssues,
                detailedAnalysis: results.detailedAnalysis
            }))
            
            dispatch(setAnalysisProcessing(false))
            setStatus('success')
            
            // Auto-proceed after a short delay
            setTimeout(() => {
                dispatch(nextStep())
            }, 1500)
            
        } catch (error) {
            console.error('❌ Analysis failed:', error)
            setStatus('error')
            dispatch(setAnalysisProcessing(false))
            
            // Fallback to mock data on error
            dispatch(setAnalysisResults({
                legalSection: 'סעיף 68א',
                points: 6,
                appealProbability: 'high',
                recommendation: 'appeal',
                reasoning: 'נמצאו כשלים טכניים בדוח שעלולים להשפיע על תקפותו.',
                technicalIssues: [
                    { type: 'calibration', severity: 'high', description: 'חסר תעודת כיול' }
                ],
                detailedAnalysis: 'ניתוח מפורט של הדוח מצא בעיות טכניות.'
            }))
        }
    }
    
    const handleContinue = () => {
        dispatch(nextStep())
    }
    
    const handleRestart = () => {
        dispatch(resetFlow())
    }
    
    return (
        <div className="ai-analysis-step">
            <div className="step-header">
                <h2>ניתוח משפטי</h2>
                <p>המערכת מנתחת את הדוח ובודקת אפשרויות ערעור</p>
            </div>
            
            <div className="analysis-status">
                {status === 'processing' && (
                    <div className="status-card processing">
                        <div className="status-icon">
                            <div className="spinner"></div>
                        </div>
                        <h3>מנתח דוח...</h3>
                        <p>בודק כשלים טכניים ומחשב סיכויי הצלחה</p>
                    </div>
                )}
                
                {status === 'success' && (
                    <div className="status-card success">
                        <div className="status-icon">✅</div>
                        <h3>ניתוח הושלם בהצלחה!</h3>
                        <p>מעבר לתוצאות...</p>
                    </div>
                )}
                
                {status === 'error' && (
                    <div className="status-card error">
                        <div className="status-icon">❌</div>
                        <h3>לא ניתן לבצע ניתוח</h3>
                        <p>חסרים נתונים נדרשים. אנא התחל מהעלאת קובץ.</p>
                        <button className="btn btn-secondary" onClick={handleRestart}>
                            התחל מחדש
                        </button>
                    </div>
                )}
            </div>
            
            <div className="analysis-info">
                <div className="info-card">
                    <h3>מה המערכת בודקת?</h3>
                    <ul>
                        <li>זיהוי סעיף החוק הרלוונטי</li>
                        <li>חישוב מספר נקודות</li>
                        <li>בדיקת כשלים טכניים בדוח</li>
                        <li>הערכת סיכויי הצלחה בערעור</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
