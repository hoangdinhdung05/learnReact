// import avatarImg from "../../assets/images/logo-1.png";

// const Header = () => {
//   return (
//     <div className="admin__header">
//       <div className="admin__header-left">
//         <input type="text" placeholder="Search..." />
//       </div>
//       <div className="admin__header-right">
//         <i className="fas fa-bell icon"></i>
//         <i className="fas fa-user-circle icon"></i>
//         <img src={avatarImg} alt="Avatar" className="admin__avatar" />
//       </div>
//     </div>
//   );
// };

// export default Header;

// src/layouts/AdminLayout/Header.jsx
import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Điều hướng về trang login sau khi đăng xuất
  };

  const handleGoToAdminHome = () => {
    navigate('/admin'); // Điều hướng về trang chủ admin
  };

  // Menu items cho Dropdown
  const adminMenuItems = [
    {
      key: 'admin-home',
      label: (
        <a onClick={handleGoToAdminHome}>
          <SettingOutlined /> Trang chủ Admin
        </a>
      ),
    },
    {
      key: 'profile',
      label: (
        <a href="/admin/profile"> {/* Điều hướng đến trang hồ sơ admin */}
          <UserOutlined /> Hồ sơ của tôi
        </a>
      ),
    },
    {
      type: 'divider', // Dùng type: 'divider' cho thanh phân cách
    },
    {
      key: 'logout',
      label: (
        <a onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <div className="admin__header">
      <div className="admin__header-left">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="admin__header-right">
        <i className="fas fa-bell icon"></i>

        {isLoggedIn ? (
          // Sửa lỗi: Bọc Avatar và Span trong một Span duy nhất
          <Dropdown
            menu={{ items: adminMenuItems }} // Sử dụng cấu trúc menu mới
            placement="bottomRight"
            arrow
          >
            <a onClick={(e) => e.preventDefault()} className="admin-dropdown-link">
              <span> {/* <-- Đã thêm thẻ SPAN bao ngoài */}
                <Avatar size="large" icon={<UserOutlined />} />
                <span style={{ marginLeft: '8px', fontWeight: 'bold', color: '#333' }}>
                  {user?.username || 'Admin'} {/* Hiển thị tên người dùng */}
                </span>
              </span>
            </a>
          </Dropdown>
        ) : (
          // Nếu chưa đăng nhập, có thể hiển thị một nút "Đăng nhập" hoặc không
          // vì trang admin đã được ProtectedRoute bảo vệ.
          <button onClick={() => navigate('/login')}>Đăng nhập Admin</button>
        )}
      </div>
    </div>
  );
};

export default Header;