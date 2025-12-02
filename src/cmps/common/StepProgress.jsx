import { useSelector } from 'react-redux'

export function StepProgress() {
    const { currentStep, totalSteps } = useSelector(state => state.pocFlow)
    
    const steps = [
        { id: 1, title: 'העלאת דוח', icon: '📄' },
        { id: 2, title: 'עריכת שדות', icon: '✏️' },
        { id: 3, title: 'ניתוח AI', icon: '🤖' },
        { id: 4, title: 'תוצאות', icon: '📊' },
        { id: 5, title: 'הורדת PDF', icon: '⬇️' }
    ]
    
    return (
        <div className="step-progress">
            <div className="step-progress-header">
                <h3>תהליך ניתוח הדוח</h3>
                <span className="step-counter">שלב {currentStep} מתוך {totalSteps}</span>
            </div>
            
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div key={step.id} className="step-wrapper">
                        <div className={`step-item ${getStepStatus(step.id, currentStep)}`}>
                            <div className="step-icon">
                                {step.id < currentStep ? '✓' : step.icon}
                            </div>
                            <div className="step-info">
                                <span className="step-title">{step.title}</span>
                                <span className="step-status">
                                    {getStepStatusText(step.id, currentStep)}
                                </span>
                            </div>
                        </div>
                        
                        {index < steps.length - 1 && (
                            <div className={`step-connector ${step.id < currentStep ? 'completed' : ''}`}>
                                <div className="connector-line"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}

function getStepStatus(stepId, currentStep) {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'active'
    return 'pending'
}

function getStepStatusText(stepId, currentStep) {
    if (stepId < currentStep) return 'הושלם'
    return ''
}
