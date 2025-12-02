import { useDispatch, useSelector } from 'react-redux'
import { resetFlow, prevStep, setCanProceed } from '../../store/slices/pocFlowSlice'
import { useEffect } from 'react'

export function PDFExportStep() {
    const dispatch = useDispatch()
    const { stepData } = useSelector(state => state.pocFlow)
    const analysisResults = stepData.analysis.results
    
    // Set canProceed to true when PDFExportStep loads (final step is always ready)
    useEffect(() => {
        dispatch(setCanProceed(true))
    }, [dispatch])
    
    const handleDownloadPDF = () => {
        // TODO: Implement PDF generation and download
        alert('הורדת PDF - יתווסף בהמשך')
    }
    
    const handleSendEmail = () => {
        // TODO: Implement email functionality
        alert('שליחה במייל - יתווסף בהמשך')
    }
    
    const handleNewAnalysis = () => {
        dispatch(resetFlow())
    }
    
    const handleBack = () => {
        dispatch(prevStep())
    }
    
    return (
        <div className="pdf-export-step">
            <div className="step-header">
                <h2>דוח מסכם</h2>
                <p>הדוח המסכם מוכן להורדה</p>
            </div>
            
            <div className="pdf-preview">
                <div className="preview-header">
                    <h3>תצוגה מקדימה</h3>
                    <span className="pdf-status">מוכן להורדה</span>
                </div>
                
                <div className="pdf-content-preview">
                    <div className="pdf-page">
                        <div className="pdf-header">
                            <h4>SmartTraffic - דוח ניתוח תנועה</h4>
                            <p>תאריך: {new Date().toLocaleDateString('he-IL')}</p>
                        </div>
                        
                        <div className="pdf-section">
                            <h5>פרטי הדוח</h5>
                            <ul>
                                <li>מספר דוח: {stepData.ocr.extractedFields?.reportNumber || 'לא זוהה'}</li>
                                <li>תאריך עבירה: {stepData.ocr.extractedFields?.date || 'לא זוהה'}</li>
                                <li>סוג עבירה: {stepData.ocr.extractedFields?.violationType || 'לא זוהה'}</li>
                                <li>סכום קנס: {stepData.ocr.extractedFields?.fineAmount || 'לא זוהה'} ₪</li>
                            </ul>
                        </div>
                        
                        <div className="pdf-section">
                            <h5>תוצאות הניתוח</h5>
                            <ul>
                                <li>סעיף חוק: {analysisResults?.legalSection || 'לא זוהה'}</li>
                                <li>מספר נקודות: {analysisResults?.points || 'לא זוהה'}</li>
                                <li>המלצה: {analysisResults?.recommendation === 'appeal' ? 'כדאי לערער' : 'לא כדאי לערער'}</li>
                                <li>סיכויי הצלחה: {analysisResults?.appealProbability === 'high' ? 'גבוהים' : 
                                                   analysisResults?.appealProbability === 'medium' ? 'בינוניים' : 'נמוכים'}</li>
                            </ul>
                        </div>
                        
                        <div className="pdf-section">
                            <h5>הסבר</h5>
                            <p>{analysisResults?.reasoning || 'הדוח נותח בהצלחה.'}</p>
                        </div>
                        
                        <div className="pdf-footer">
                            <p className="disclaimer">
                                * הדוח מהווה חוות דעת ראשונית בלבד ואינו מהווה ייעוץ משפטי
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="download-section">
                <div className="download-info">
                    <h3>הורדת הדוח</h3>
                    <p>הדוח כולל את כל הפרטים שנותחו והמלצות לפעולה</p>
                </div>
                
                <div className="download-actions">
                    <button className="btn btn-primary large" onClick={handleDownloadPDF}>
                        <span className="btn-icon">⬇️</span>
                        הורד דוח PDF
                    </button>
                </div>
            </div>
            
            <div className="next-steps">
                <h3>השלבים הבאים</h3>
                <div className="steps-list">
                    <div className="step-item">
                        <span className="step-number">1</span>
                        <span className="step-text">שמור את הדוח במקום בטוח</span>
                    </div>
                    <div className="step-item">
                        <span className="step-number">2</span>
                        <span className="step-text">התייעץ עם עורך דין במידת הצורך</span>
                    </div>
                    <div className="step-item">
                        <span className="step-number">3</span>
                        <span className="step-text">הגש ערעור בהתאם להמלצות</span>
                    </div>
                </div>
            </div>
            
            <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>
                    חזור
                </button>
                <button className="btn btn-primary" onClick={handleNewAnalysis}>
                    נתח דוח נוסף
                </button>
            </div>
        </div>
    )
}
