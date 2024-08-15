import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SurveyCreatorWidget } from './Creator'
import SurveyComponent  from './SurveyComponent'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* {/* <SurveyCreatorWidget /> */}
    <SurveyComponent/>
  </React.StrictMode>,
)
