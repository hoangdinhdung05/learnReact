import React from "react";
import logoRecland from "../../assets/images/logo-recland.png";

const Sidebar = () => {
  return (
    <div className="admin__side-bar">
      <div className="admin__side-bar_header">
        <img src={logoRecland} alt="Recland" />
      </div>
      <div className="admin__side-bar_menu">
        <ul>
          <li className="admin__active">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </li>
          {/* Các mục menu khác sẽ được thêm vào đây */}
          <li>
            {/* <i class="fas fa-cog"></i>
            <span>Settings</span> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;