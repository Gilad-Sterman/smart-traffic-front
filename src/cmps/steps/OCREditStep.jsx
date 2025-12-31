import { useDispatch, useSelector } from 'react-redux'
import { updateOCRField, nextStep, prevStep, setCanProceed } from '../../store/slices/pocFlowSlice'
import { useEffect, useState } from 'react'

export function OCREditStep() {
    const dispatch = useDispatch()
    const { stepData, canProceed } = useSelector(state => state.pocFlow)
    const ocrData = stepData.ocr
    const [imageZoomed, setImageZoomed] = useState(false)
    
    useEffect(() => {
        // Validate fields when component loads
        if (ocrData.extractedFields && Object.keys(ocrData.extractedFields).length > 0) {
            
            const requiredFields = ['reportNumber', 'date', 'violationType', 'fineAmount']
            const hasAllRequired = requiredFields.every(
                field => ocrData.extractedFields[field]?.trim()
            )
            
            if (hasAllRequired) {
                dispatch(setCanProceed(true))
            }
        }
    }, [ocrData, dispatch])
    
    const handleFieldChange = (fieldName, value) => {
        dispatch(updateOCRField({ fieldName, value }))
    }
    
    const handleContinue = () => {
        if (canProceed) {
            dispatch(nextStep())
        }
    }
    
    const handleBack = () => {
        dispatch(prevStep())
    }
    
    // Helper function to get confidence class and text
    const getConfidenceInfo = (fieldName) => {
        const confidence = ocrData.confidenceScores?.[fieldName] || 0
        const percentage = Math.round(confidence * 100)
        
        if (confidence >= 0.9) {
            return { class: 'very-high-confidence', text: `דיוק גבוה מאוד (${percentage}%)` }
        } else if (confidence >= 0.8) {
            return { class: 'high-confidence', text: `דיוק גבוה (${percentage}%)` }
        } else if (confidence >= 0.65) {
            return { class: 'medium-confidence', text: `בינוני (${percentage}%)` }
        } else if (confidence >= 0.5) {
            return { class: 'low-confidence', text: `נמוך (${percentage}%) - בדוק` }
        } else {
            return { class: 'very-low-confidence', text: `נמוך מאוד (${percentage}%) - בדוק בקפדנות` }
        }
    }
    
    return (
        <div className="ocr-edit-step">
            <div className="step-header">
                <h2>זיהוי שדות ועריכה</h2>
                <p>בדוק את הפרטים שזוהו ותקן במידת הצורך</p>
            </div>
            
            <div className="ocr-content">
                <div className="document-preview">
                    <h3>תצוגה מקדימה של הדוח</h3>
                    <div className="preview-container">
                        {stepData.upload.fileDataUrl ? (
                            <img 
                                src={stepData.upload.fileDataUrl} 
                                alt="תמונת דוח התנועה"
                                className="document-image"
                                onClick={() => setImageZoomed(true)}
                                style={{ cursor: 'pointer' }}
                                title="לחץ להגדלה"
                            />
                        ) : (
                            <div className="preview-placeholder">
                                <p>לא נמצאה תמונה</p>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="fields-editor">
                    <h3>שדות שזוהו</h3>
                    
                    <div className="field-group required">
                        <label>מספר דוח *</label>
                        <input 
                            type="text" 
                            placeholder="מספר דוח" 
                            className={`field-input ${getConfidenceInfo('reportNumber').class}`}
                            value={ocrData.extractedFields?.reportNumber || ''}
                            onChange={(e) => handleFieldChange('reportNumber', e.target.value)}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('reportNumber').text}</span>
                    </div>
                    
                    <div className="field-group required">
                        <label>תאריך עבירה *</label>
                        <input 
                            type="date" 
                            className={`field-input ${getConfidenceInfo('violationDate').class}`}
                            value={ocrData.extractedFields?.date || ''}
                            onChange={(e) => handleFieldChange('date', e.target.value)}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('violationDate').text}</span>
                    </div>
                    
                    <div className="field-group required">
                        <label>סוג עבירה *</label>
                        <input 
                            type="text" 
                            placeholder="סעיף חוק / תיאור עבירה" 
                            className={`field-input ${getConfidenceInfo('violationType').class}`}
                            value={ocrData.extractedFields?.violationType || ''}
                            onChange={(e) => handleFieldChange('violationType', e.target.value)}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('violationType').text}</span>
                    </div>
                    
                    <div className="field-group required">
                        <label>סכום קנס *</label>
                        <input 
                            type="number" 
                            placeholder="סכום בשקלים" 
                            className={`field-input ${getConfidenceInfo('fineAmount').class}`}
                            value={ocrData.extractedFields?.fineAmount || ''}
                            onChange={(e) => handleFieldChange('fineAmount', e.target.value)}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('fineAmount').text}</span>
                    </div>
                    
                    <div className="field-group optional">
                        <label>מיקום (אופציונלי)</label>
                        <input 
                            type="text" 
                            placeholder="מיקום העבירה" 
                            className={`field-input ${getConfidenceInfo('location').class}`}
                            value={ocrData.extractedFields?.location || ''}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('location').text}</span>
                    </div>
                    
                    <div className="field-group optional">
                        <label>שעה (אופציונלי)</label>
                        <input 
                            type="time" 
                            className={`field-input ${getConfidenceInfo('violationTime').class}`}
                            value={ocrData.extractedFields?.time || ''}
                            onChange={(e) => handleFieldChange('time', e.target.value)}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('violationTime').text}</span>
                    </div>
                    
                    <div className="field-group optional">
                        <label>נקודות (אופציונלי)</label>
                        <input 
                            type="number" 
                            placeholder="מספר נקודות" 
                            className={`field-input ${getConfidenceInfo('points').class}`}
                            value={ocrData.extractedFields?.points !== undefined ? ocrData.extractedFields.points : ''}
                            onChange={(e) => handleFieldChange('points', e.target.value)}
                            min="0"
                            max="12"
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('points').text}</span>
                    </div>
                    
                    <div className="field-group optional">
                        <label>מועד אחרון לערעור (אופציונלי)</label>
                        <input 
                            type="date" 
                            className={`field-input ${getConfidenceInfo('appealDeadline').class}`}
                            value={ocrData.extractedFields?.appealDeadline ? 
                                ocrData.extractedFields.appealDeadline.split('/').reverse().join('-') : ''}
                            onChange={(e) => {
                                // Convert from YYYY-MM-DD to DD/MM/YYYY for backend compatibility
                                const [year, month, day] = e.target.value.split('-')
                                const formattedDate = `${day}/${month}/${year}`
                                handleFieldChange('appealDeadline', formattedDate)
                            }}
                        />
                        <span className="confidence-indicator">{getConfidenceInfo('appealDeadline').text}</span>
                    </div>
                </div>
            </div>
            
            <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>
                    חזור
                </button>
                <button 
                    className="btn btn-primary"
                    onClick={handleContinue}
                    disabled={!canProceed}
                >
                    המשך לניתוח
                </button>
            </div>
            
            {/* Image Zoom Modal */}
            {imageZoomed && stepData.upload.fileDataUrl && (
                <div className="image-zoom-modal" onClick={() => setImageZoomed(false)}>
                    <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="close-zoom" 
                            onClick={() => setImageZoomed(false)}
                            title="סגור"
                        >
                            ✕
                        </button>
                        <img 
                            src={stepData.upload.fileDataUrl} 
                            alt="תמונת דוח התנועה - תצוגה מוגדלת"
                            className="zoomed-image"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
