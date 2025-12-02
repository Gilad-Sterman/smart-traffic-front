import { useSelector } from 'react-redux'
import { StepProgress } from '../cmps/common/StepProgress'
import { UploadStep } from '../cmps/steps/UploadStep'
import { OCREditStep } from '../cmps/steps/OCREditStep'
import { AIAnalysisStep } from '../cmps/steps/AIAnalysisStep'
import { ResultsStep } from '../cmps/steps/ResultsStep'
import { PDFExportStep } from '../cmps/steps/PDFExportStep'

export function Home() {
    const { currentStep } = useSelector(state => state.pocFlow)
    
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <UploadStep />
            case 2:
                return <OCREditStep />
            case 3:
                return <AIAnalysisStep />
            case 4:
                return <ResultsStep />
            case 5:
                return <PDFExportStep />
            default:
                return <UploadStep />
        }
    }
    
    return (
        <section className="home-page">
            <div className="container">
                <div className="page-header">
                    <h1>SmartTraffic - ניתוח דוחות תנועה</h1>
                    <p>מערכת ניתוח אוטומטי של דוחות תנועה באמצעות בינה מלאכותית</p>
                </div>
                
                <StepProgress />
                
                <div className="step-container">
                    {renderCurrentStep()}
                </div>
            </div>
        </section>
    )
}