import React, { useState } from 'react';
import logo from '../../../assets/images/logo-recland.png';
import { LaptopOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import AuthModal from '../../Auth/AuthModal/AuthModal';
import { useAuth } from '../../../hooks/useAuth';
import { Dropdown, Menu, Avatar } from 'antd'; 

const Header = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const { isLoggedIn, user, logout } = useAuth(); 

    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleLogout = () => {
        logout(); // Gọi hàm logout từ context
        // message.info('Bạn đã đăng xuất.');
    };

    // Menu cho Dropdown khi đã đăng nhập
    const userMenu = (
        <Menu>
            <Menu.Item key="profile">
                <UserOutlined /> Hồ sơ của tôi
            </Menu.Item>
            <Menu.Item key="settings">
                <LaptopOutlined /> Quản lý Jobs
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" onClick={handleLogout}>
                <LogoutOutlined /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <img src={logo} alt="RecLand" />
                </div>
                <div className="header__menu">
                    <div className="header__menu-item header__menu-item--centered">
                        <div className="header__menu-items">
                            <LaptopOutlined className="header__icon--large" />
                            <a href="#" className="header__menu-link">Tất cả các Jobs</a>
                        </div>
                        <div className="header__menu-items">
                            <UserOutlined className="header__icon--large" />
                            <a href="#" className="header__menu-link">Tìm kiếm Freelancer</a>
                        </div>
                    </div>
                    <div className="header__menu-item">
                        {isLoggedIn ? ( // Kiểm tra trạng thái đăng nhập
                            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                                <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
                                    <Avatar size="large" icon={<UserOutlined />} /> {/* Avatar mặc định */}
                                    <span style={{ marginLeft: '8px', fontWeight: 'bold', color: 'var(--primary)' }}>
                                        {user?.username || 'Người dùng'} {/* Hiển thị tên người dùng */}
                                    </span>
                                </a>
                            </Dropdown>
                        ) : (
                            <button
                                className="header__button header__button--register"
                                onClick={showModal}
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <AuthModal isVisible={isModalVisible} onCancel={handleCancel} />
        </header>
    );
};

export default Header;