import { useDispatch, useSelector } from 'react-redux'
import { nextStep, prevStep, resetFlow, setCanProceed } from '../../store/slices/pocFlowSlice'
import { useEffect } from 'react'

export function ResultsStep() {
    const dispatch = useDispatch()
    const { stepData, canProceed } = useSelector(state => state.pocFlow)
    const analysisResults = stepData.analysis.results

    // Set canProceed to true when ResultsStep loads (since results are available)
    useEffect(() => {
        if (analysisResults) {
            dispatch(setCanProceed(true))
        }
    }, [analysisResults, dispatch])

    const handleContinue = () => {
        dispatch(nextStep())
    }

    const handleBack = () => {
        dispatch(prevStep())
    }

    const handleNewAnalysis = () => {
        dispatch(resetFlow())
    }

    const getConclusionClass = (recommendation) => {
        switch (recommendation) {
            case 'appeal': return 'success'
            case 'maybe': return 'warning'
            case 'dont_appeal': return 'danger'
            default: return 'warning'
        }
    }

    const getConclusionText = (recommendation) => {
        switch (recommendation) {
            case 'appeal': return 'כדאי לערער על הדוח'
            case 'maybe': return 'שקול לערער על הדוח'
            case 'dont_appeal': return 'לא מומלץ לערער'
            default: return 'נדרש בדיקה נוספת'
        }
    }

    const getConclusionIcon = (recommendation) => {
        switch (recommendation) {
            case 'appeal': return '✅'
            case 'maybe': return '⚠️'
            case 'dont_appeal': return '❌'
            default: return '❓'
        }
    }

    if (!analysisResults) {
        return <div>טוען תוצאות...</div>
    }

    return (
        <div className="results-step">
            <div className="step-header">
                <h2>תוצאות הניתוח</h2>
            </div>

            <div className="main-conclusion">
                <div className={`conclusion-card ${getConclusionClass(analysisResults.recommendation)}`}>
                    <div className="conclusion-icon">{getConclusionIcon(analysisResults.recommendation)}</div>
                    <h2>{getConclusionText(analysisResults.recommendation)}</h2>
                    <p className="conclusion-subtitle">
                        סיכויי הצלחה {analysisResults.appealProbability === 'high' ? 'גבוהים' :
                            analysisResults.appealProbability === 'medium' ? 'בינוניים' : 'נמוכים'}
                    </p>
                </div>
            </div>

            <div className="results-grid">
                <div className="result-card">
                    <h3>מספר נקודות</h3>
                    <div className="result-value">{analysisResults.points}</div>
                    <p>נקודות שיתווספו לרישיון</p>
                </div>

                <div className="result-card">
                    <h3>סיכויי הצלחה</h3>
                    <div className={`result-value ${analysisResults.appealProbability === 'high' ? 'success' :
                        analysisResults.appealProbability === 'medium' ? 'warning' : 'danger'}`}>
                        {analysisResults.appealProbability === 'high' ? 'גבוהים' :
                            analysisResults.appealProbability === 'medium' ? 'בינוניים' : 'נמוכים'}
                    </div>
                    <p>בהתבסס על ניתוח הדוח</p>
                </div>

                <div className="result-card">
                    <h3>סעיף חוק</h3>
                    <div className="result-value">{analysisResults.legalSection}</div>
                    <p>עבירת מהירות</p>
                </div>

                <div className="result-card">
                    <h3>כשלים שנמצאו</h3>
                    <div className="result-value warning">
                        {analysisResults.technicalIssues?.length || 0}
                    </div>
                    <p>בעיות טכניות בדוח</p>
                </div>
            </div>

            <div className="explanation-section">
                <h3>הסבר מפורט</h3>
                <div className="explanation-card">
                    <p>{analysisResults.reasoning || 'הדוח נותח בהצלחה ונמצאו נקודות חשובות לבדיקה.'}</p>
                </div>
            </div>

            <div className="actions-section">
                <h3>מה עושים עכשיו?</h3>
                <div className="actions-grid">
                    <button className="action-btn primary" onClick={handleContinue}>
                        <span className="action-icon">📄</span>
                        <span className="action-text">הורד דוח מסכם</span>
                    </button>

                    <button className="action-btn secondary" onClick={handleNewAnalysis}>
                        <span className="action-icon">🔍</span>
                        <span className="action-text">בדיקה נוספת</span>
                    </button>
                </div>
            </div>

            <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>
                    חזור
                </button>
            </div>
        </div>
    )
}
