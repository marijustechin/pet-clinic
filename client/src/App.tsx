import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { UserPage } from './pages/UserPage';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { EditAppointmentPage } from './pages/EditAppointmentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="naudotojo-profilis" element={<UserPage />} />
          <Route path="administratorius" element={<AdminPage />} />
          <Route
            path="vizito-redagavimas/:id"
            element={<EditAppointmentPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
