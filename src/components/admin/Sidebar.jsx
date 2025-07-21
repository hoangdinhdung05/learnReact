// src/components/admin/Sidebar.jsx
import React from "react";
import logoRecland from "../../assets/images/logo-recland.png";
import { NavLink } from "react-router-dom"; // <--- Thay thế Link bằng NavLink
import { HomeOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="admin__side-bar">
      <div className="admin__side-bar_header">
        <img src={logoRecland} alt="Recland" />
      </div>
      <div className="admin__side-bar_menu">
        <ul>
          <li className="admin__sidebar-menu-item">
            <NavLink to="/admin" end> {/* Sử dụng 'end' để chỉ khớp chính xác /admin */}
              <HomeOutlined /> Trang chủ
            </NavLink>
          </li>
          <li className="admin__sidebar-menu-item">
            <NavLink to="/admin/users">
              <UserOutlined /> Quản lý Người dùng
            </NavLink>
          </li>
          <li className="admin__sidebar-menu-item">
            <NavLink to="/admin/roles">
              <TeamOutlined /> Quản lý Quyền hành
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;