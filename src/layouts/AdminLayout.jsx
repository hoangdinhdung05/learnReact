import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import { Outlet } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/admin/admin.css";
import HomeAdmin from "../pages/admin/home";

const AdminLayout = ({ children }) => {
    return (
        <div className="admin__container">
            <Sidebar />
            <div className="admin__main">
                <Header />

                <div className="admin__main_content">
                    {children}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;