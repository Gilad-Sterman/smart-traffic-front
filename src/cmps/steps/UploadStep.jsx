import { useDispatch, useSelector } from 'react-redux'
import { setUploadFile, clearUploadFile, nextStep, setOCRResults } from '../../store/slices/pocFlowSlice'
import { uploadService } from '../../services/uploadService'
import { useState } from 'react'

export function UploadStep() {
    const dispatch = useDispatch()
    const { stepData, canProceed } = useSelector(state => state.pocFlow)
    const uploadData = stepData.upload
    const [isUploading, setIsUploading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null) // Store file locally, not in Redux
    
    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        if (file) {
            handleFile(file)
        }
    }
    
    const handleFileDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file) {
            handleFile(file)
        }
    }
    
    const handleFile = (file) => {
        // Validate file
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
        const maxSize = 10 * 1024 * 1024 // 10MB
        
        if (!validTypes.includes(file.type)) {
            alert('סוג קובץ לא נתמך. אנא בחר JPG, PNG או PDF')
            return
        }
        
        if (file.size > maxSize) {
            alert('הקובץ גדול מדי. גודל מקסימלי: 10MB')
            return
        }
        
        // Store file locally and file info in Redux
        setSelectedFile(file) // Store file in local state
        
        const reader = new FileReader()
        reader.onload = (e) => {
            dispatch(setUploadFile({
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                fileDataUrl: e.target.result,
                sessionId: null // No session yet
            }))
        }
        reader.readAsDataURL(file)
    }
    
    const handleDragOver = (event) => {
        event.preventDefault()
    }
    
    const handleClearFile = () => {
        dispatch(clearUploadFile())
        setSelectedFile(null) // Clear local file state too
    }
    
    const handleContinue = async () => {
        if (!canProceed || !selectedFile || isUploading) {
            return
        }
        
        try {
            setIsUploading(true)
            // Upload to backend and process OCR
            const uploadResponse = await uploadService.uploadDocument(selectedFile)
            
            // Update with session ID
            const updatedUploadData = {
                ...uploadData,
                sessionId: uploadResponse.sessionId
            }
            
            dispatch(setUploadFile(updatedUploadData))
            setSelectedFile(null) // Clear local file after upload
            
            // Store OCR results if available
            if (uploadResponse.ocrResults) {
                // Convert date format from DD/MM/YYYY to YYYY-MM-DD for HTML date input
                const ocrResults = { ...uploadResponse.ocrResults }
                if (ocrResults.extractedFields?.violationDate) {
                    const dateStr = ocrResults.extractedFields.violationDate
                    // Convert DD/MM/YYYY to YYYY-MM-DD
                    const [day, month, year] = dateStr.split('/')
                    if (day && month && year) {
                        ocrResults.extractedFields.date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
                    }
                }
                
                // Map violationTime to time for frontend
                if (ocrResults.extractedFields?.violationTime) {
                    ocrResults.extractedFields.time = ocrResults.extractedFields.violationTime
                }
                
                dispatch(setOCRResults(ocrResults))
            }
            
            // Proceed to next step
            dispatch(nextStep())
            
        } catch (error) {
            console.error('❌ Upload failed:', error)
            alert('העלאת הקובץ נכשלה. אנא נסה שוב.')
        } finally {
            setIsUploading(false)
        }
    }
    
    return (
        <div className="upload-step">
            <div className="step-header">
                <h2>העלאת דוח תנועה</h2>
                <p>העלה תמונה או PDF של דוח התנועה לניתוח אוטומטי</p>
            </div>
            
            <div className="upload-content">
                <div className="upload-area">
                    {!uploadData.fileName ? (
                        <div 
                            className="drag-drop-zone"
                            onDrop={handleFileDrop}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <div className="upload-icon">📄</div>
                            <h3>גרור קובץ לכאן או לחץ לבחירה</h3>
                            <p>JPG, PNG או PDF עד 10MB</p>
                            <button className="btn btn-primary">בחר קובץ</button>
                            
                            <input
                                id="file-input"
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                        </div>
                    ) : (
                        <div className="file-selected">
                            <div className="file-info">
                                <div className="file-icon">
                                    {uploadData.fileType.includes('pdf') ? '📄' : '🖼️'}
                                </div>
                                <div className="file-details">
                                    <h4>{uploadData.fileName}</h4>
                                    <p>גודל: {(uploadData.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                                    <p>סוג: {uploadData.fileType}</p>
                                </div>
                                <button 
                                    className="btn btn-secondary btn-small"
                                    onClick={handleClearFile}
                                >
                                    הסר קובץ
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="upload-info">
                    <h4>מה אנחנו מחפשים בדוח?</h4>
                    <ul>
                        <li>מספר דוח</li>
                        <li>תאריך העבירה</li>
                        <li>סוג העבירה</li>
                        <li>סכום הקנס</li>
                    </ul>
                </div>
            </div>
            
            {canProceed && (
                <div className="step-actions">
                    <button 
                        className="btn btn-primary large"
                        onClick={handleContinue}
                        disabled={isUploading}
                    >
                        {isUploading ? 'מעלה קובץ...' : 'המשך לעריכת שדות'}
                    </button>
                </div>
            )}
        </div>
    )
}
