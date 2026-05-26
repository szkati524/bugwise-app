
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {Home} from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { MyProfile } from "./pages/MyProfile";
import { ChangePassword } from "./pages/ChangePassword";
import { ChangeEmail } from "./pages/ChangeEmail";
import { AllInsects } from "./pages/AllInsects";
import { Categories } from "./pages/Categories";
import { InsectDetails } from "./pages/InsectDetails";
import { Ranking } from "./pages/Ranking";
import { AddInsect } from "./pages/AddInsect";
import { EditInsect } from "./pages/EditInsect";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/change-password" element={<ChangePassword /> } />
        <Route path="/change-email" element={<ChangeEmail />} />
        <Route path ="/all-insects" element={<AllInsects />} />
        <Route path ="categories" element={<Categories /> } />
        <Route path ="insects/:id" element={<InsectDetails />} />
        <Route path ="/ranking" element={<Ranking />} />
        <Route path="add-insect" element={<AddInsect /> } />
        <Route path="/insects/edit/:id" element={<EditInsect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;