import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { EventProvider } from './context/EventContext.tsx'
import { MainMenu } from './components/MainMenu.tsx'
import { EventListForUsers } from './components/EventListForUsers.tsx'
import { EventDetailsForAUser } from './components/EventDetailsForAUser.tsx'
import { ProducersMenu } from './components/ProducersMenu.tsx'
import { AddingAProducer } from './components/AddingAProducer.tsx'
import { ProducerDetails } from './components/ProducerDetails.tsx'
import { ProducerProvider } from './context/ProducerContext.tsx'
import { AddAnEvent } from './components/AddAnEvent.tsx'
import { EventDetailsForProducer } from './components/EventDetailsForProducer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <ProducerProvider>
        <MainMenu />
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="EventListForUsers" element={<EventListForUsers />} />
              <Route path="EventListForUsers/EventDetailsForAUser/:id" element={<EventDetailsForAUser />} />
              <Route path="ProducersMenu" element={<ProducersMenu />} />
              <Route path="ProducerDetails/:``]\]\
              ]\
              
              
              \
              
              
              
              
               m"
               .'
               ;'']
               
               '\
               
               
               
               
               
               
               
               
                -+-++
                
                
                
                
                
                
                
                
                
                
                ' element={<ProducerDetails />} />

              <Route path='ProducerDetails/EventDetailsForProducer/:id' element={<EventDetailsForProducer />} />

              <Route path="ProducerDetails/AddAnEvent/:EmailProducer" element={<AddAnEvent />} />
              <Route path="AddingProducer" element={<AddingAProducer />} />
            </Route>
          </Routes>
        </ProducerProvider>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>,
)
