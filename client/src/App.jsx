import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Borrower Pages
import { HomePage } from './pages/borrower/HomePage';
import { ExplorePage } from './pages/borrower/ExplorePage';
import { EquipmentDetailPage } from './pages/borrower/EquipmentDetailPage';
import { RequestsPage } from './pages/borrower/RequestsPage';
import { RequestEquipmentPage } from './pages/borrower/RequestEquipmentPage';

// Lender Pages
import { LenderDashboardPage } from './pages/lender/LenderDashboardPage';
import { LenderListingsPage } from './pages/lender/LenderListingsPage';
import { AddEquipmentPage } from './pages/lender/AddEquipmentPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes (no navbar/footer wrapper) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Main layout routes with Navbar & Footer - Protected */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Borrower Experience Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
          <Route path="/item/:id" element={<EquipmentDetailPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/:id" element={<RequestsPage />} />
          <Route path="/request-equipment" element={<RequestEquipmentPage />} />

          {/* Lender Experience Routes */}
          <Route path="/lender" element={<LenderDashboardPage />} />
          <Route path="/lender/listings" element={<LenderListingsPage />} />
          <Route path="/lender/add-item" element={<AddEquipmentPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
