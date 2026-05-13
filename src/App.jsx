
import MainPage from "./mainPage";
import AddCusPage from "./addCuspage";
import Detail from "./assets/component/detail";
import Lead from "./lead";
import {LoginPage,SignupPage} from "./assets/component/loginAndSigin";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./authContext.jsx";
import ProtectedRoute from "./ProtectendRouth.jsx";
import { DetailIdProvider } from "./assets/context/detail.jsx";
import About from "./aboutPage.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <DetailIdProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddCusPage /></ProtectedRoute>} />
              <Route path="/detail" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/lead" element={<ProtectedRoute><Lead /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      </DetailIdProvider>
      </AuthProvider>
    </>
  );
}

export default App;
