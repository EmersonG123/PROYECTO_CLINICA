
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerification from './pages/EmailVerification';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ReceptionLayout from './components/reception/ReceptionLayout';
import DoctorLayout from './components/doctor/DoctorLayout';
import LaboratoryLayout from './components/laboratory/LaboratoryLayout';
import CashierLayout from './components/cashier/CashierLayout';
import AdminLayout from './components/admin/AdminLayout';
import NurseLayout from './components/nurse/NurseLayout';

import DashboardHome from './pages/patient/DashboardHome';
import PatientProfile from './pages/patient/PatientProfile';
import MedicalHistory from './pages/patient/MedicalHistory';
import AppointmentsPage from './pages/patient/AppointmentsPage';
import ExamsPage from './pages/patient/ExamsPage';
import BookingFlow from './pages/patient/BookingFlow';

// Receptionist Pages
import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import ManagePatients from './pages/reception/ManagePatients';
import PatientRegister from './pages/reception/PatientRegister';
import ManageAppointments from './pages/reception/ManageAppointments';
import BookAppointment from './pages/reception/BookAppointment';
import SpecialistDirectory from './pages/reception/SpecialistDirectory';
import SettingsPage from './pages/reception/SettingsPage';

// Doctor Pages
import WorkCenter from './pages/doctor/WorkCenter';
import DoctorAgenda from './pages/doctor/DoctorAgenda';
import DoctorPatients from './pages/doctor/DoctorPatients';
import ClinicalHistoryArchive from './pages/doctor/ClinicalHistoryArchive';
import DoctorSettings from './pages/doctor/DoctorSettings';

// Laboratory Pages
import LabDashboard from './pages/laboratory/LabDashboard';
import SampleReception from './pages/laboratory/SampleReception';
import ResultManagement from './pages/laboratory/ResultManagement';
import ResultArchive from './pages/laboratory/ResultArchive';
import LabSettings from './pages/laboratory/LabSettings';

// Cashier Pages
import CashOpening from './pages/cashier/CashOpening';
import CashierDashboard from './pages/cashier/CashierDashboard';
import ServicePOS from './pages/cashier/ServicePOS';
import PendingPayments from './pages/cashier/PendingPayments';
import PaymentReconciliation from './pages/cashier/PaymentReconciliation';
import ElectronicBilling from './pages/cashier/ElectronicBilling';
import HistoryControl from './pages/cashier/HistoryControl';
import CashierSettings from './pages/cashier/CashierSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemConfig from './pages/admin/SystemConfig';
import AuditTrail from './pages/admin/AuditTrail';
import ReportsPage from './pages/admin/ReportsPage';
import SecurityCompliance from './pages/admin/SecurityCompliance';

// Nurse Pages
import NurseDashboard from './pages/nurse/NurseDashboard';
import NurseWaitingList from './pages/nurse/NurseWaitingList';
import NurseEvaluation from './pages/nurse/NurseEvaluation';
import NursePatientHistory from './pages/nurse/NursePatientHistory';
import NurseReports from './pages/nurse/NurseReports';
import NurseSettings from './pages/nurse/NurseSettings';

// Helper para oscurecer colores (para estados hover)
const adjustColor = (color: string, amount: number) => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para aplicar el tema globalmente
  const applyDynamicTheme = (primary: string, secondary: string) => {
    const styleId = 'dynamic-theme-styles';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    // Sobrescribimos las clases de Tailwind usadas comúnmente en la app
    const css = `
      .bg-blue-800 { background-color: ${primary} !important; }
      .bg-blue-900 { background-color: ${adjustColor(primary, -20)} !important; }
      .hover\\:bg-blue-900:hover { background-color: ${adjustColor(primary, -20)} !important; }
      .text-blue-800 { color: ${primary} !important; }
      .border-blue-800 { border-color: ${primary} !important; }
      .ring-blue-800 { --tw-ring-color: ${primary} !important; }
      
      .bg-green-600 { background-color: ${secondary} !important; }
      .text-green-600 { color: ${secondary} !important; }
      .border-green-600 { border-color: ${secondary} !important; }
      .bg-green-500 { background-color: ${secondary} !important; }
      .text-green-500 { color: ${secondary} !important; }
    `;
    styleTag.innerHTML = css;
  };

  // Cargar configuración guardada al iniciar la app
  useEffect(() => {
    const savedConfig = localStorage.getItem('clinic_system_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.theme) {
          applyDynamicTheme(parsed.theme.primary, parsed.theme.secondary);
        }
      } catch (e) {
        console.error("Error cargando configuración de tema", e);
      }
    }
  }, []);

  // Redirección forzada removida para permitir flujo de autenticación y persistencia de rutas
  // useEffect(() => { ... }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<EmailVerification />} />

      {/* Patient Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="perfil" element={<PatientProfile />} />
        <Route path="historia" element={<MedicalHistory />} />
        <Route path="citas" element={<AppointmentsPage />} />
        <Route path="examenes" element={<ExamsPage />} />
        <Route path="agendar" element={<BookingFlow />} />
      </Route>

      {/* Receptionist Routes */}
      <Route path="/reception" element={<ReceptionLayout />}>
        <Route index element={<ReceptionDashboard />} />
        <Route path="pacientes" element={<ManagePatients />} />
        <Route path="pacientes/nuevo" element={<PatientRegister />} />
        <Route path="citas" element={<ManageAppointments />} />
        <Route path="citas/nueva" element={<BookAppointment />} />
        <Route path="especialistas" element={<SpecialistDirectory />} />
        <Route path="configuracion" element={<SettingsPage />} />
      </Route>

      {/* Doctor Routes */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<WorkCenter />} />
        <Route path="agenda" element={<DoctorAgenda />} />
        <Route path="pacientes" element={<DoctorPatients />} />
        <Route path="historias" element={<ClinicalHistoryArchive />} />
        <Route path="configuracion" element={<DoctorSettings />} />
      </Route>

      {/* Laboratory Routes */}
      <Route path="/laboratory" element={<LaboratoryLayout />}>
        <Route index element={<LabDashboard />} />
        <Route path="recepcion" element={<SampleReception />} />
        <Route path="resultados" element={<ResultManagement />} />
        <Route path="archivo" element={<ResultArchive />} />
        <Route path="configuracion" element={<LabSettings />} />
      </Route>

      {/* Cashier Routes */}
      <Route path="/cashier/apertura" element={<CashOpening />} />
      <Route path="/cashier" element={<CashierLayout />}>
        <Route index element={<CashierDashboard />} />
        <Route path="cobros" element={<ServicePOS />} />
        <Route path="pendientes" element={<PendingPayments />} />
        <Route path="conciliacion" element={<PaymentReconciliation />} />
        <Route path="facturacion" element={<ElectronicBilling />} />
        <Route path="historial" element={<HistoryControl />} />
        <Route path="configuracion" element={<CashierSettings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="usuarios" element={<UserManagement />} />
        <Route path="configuracion" element={<SystemConfig />} />
        <Route path="auditoria" element={<AuditTrail />} />
        <Route path="reportes" element={<ReportsPage />} />
        <Route path="seguridad" element={<SecurityCompliance />} />
      </Route>

      {/* Nurse Routes */}
      <Route path="/nurse" element={<NurseLayout />}>
        <Route index element={<NurseDashboard />} />
        <Route path="espera" element={<NurseWaitingList />} />
        <Route path="evaluacion" element={<NurseEvaluation />} />
        <Route path="historial" element={<NursePatientHistory />} />
        <Route path="reportes" element={<NurseReports />} />
        <Route path="configuracion" element={<NurseSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
