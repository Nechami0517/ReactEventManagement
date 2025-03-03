import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { EventProvider } from './context/EventContext.tsx'
import { MainMenu } from './components/MainMenu.tsx'
import { EventDetailsForAUser } from './components/EventDetailsForAUser.tsx'
import { EventListForAUsers } from './components/EventListForUsers.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <MainMenu />
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="EventListForAUsers" element={<EventListForAUsers />}>
              <Route path=":eventId" element={<EventDetailsForAUser />} />
            </Route>
          </Route>
        </Routes>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>,
)
