// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import Home from "./pages/client/home";
// import HomeAdmin from "./pages/admin/home";
// import AdminLayout from "./layouts/AdminLayout";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}> 
//         <Route index element={<Home />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/client/home";
import HomePage from "./pages/admin/home";
import AdminLayout from "./layouts/AdminLayout";
import { useAuth } from "./hooks/useAuth"; // Import useAuth hook
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component
import UserPage from "./pages/admin/User/User";
import RolePage from "./pages/admin/Role/Role";

const AppRoutes = () => {
  const { isAuthenticated, user, loading } = useAuth(); // Lấy trạng thái từ AuthContext

  if (loading) {
    return <div>Loading application...</div>; // Hiển thị trạng thái loading khi AuthProvider đang kiểm tra token
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/" element={<Home />} />

      <Route
        path="/admin/*" 
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            user={user} 
            allowedRoles={['ADMIN', 'MANAGER']}
          >
            <AdminLayout>
              <Routes>
                <Route path="/admin" element={<HomePage />} />
                <Route path="users" element={<UserPage />} />
                <Route path="roles" element={<RolePage />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;