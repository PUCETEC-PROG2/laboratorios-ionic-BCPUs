import React from 'react'
import './LoadingSpinner.css'
import { IonSpinner } from '@ionic/react'



const LoadingSpinner: React.FC = () => {
    return(
        <div className="loading-overlay">
            <IonSpinner name="circular" color="primary" className="loading-spinner"></IonSpinner>
        </div>
    )
}

export default LoadingSpinner;