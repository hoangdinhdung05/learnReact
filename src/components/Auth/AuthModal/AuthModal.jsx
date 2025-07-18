// src/components/Auth/AuthModal/AuthModal.jsx
import React, { useState } from 'react'; // Import useState
import { Modal } from 'antd';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm'; // Import RegisterForm

const AuthModal = ({ isVisible, onCancel }) => {
    const [currentForm, setCurrentForm] = useState('login'); // State để quản lý form nào đang hiển thị

    // Reset form về login mỗi khi modal được mở
    // hoặc khi isVisible thay đổi (ngụ ý modal được mở/đóng)
    React.useEffect(() => {
        if (isVisible) {
            setCurrentForm('login');
        }
    }, [isVisible]);

    const handleSwitchToRegister = () => {
        setCurrentForm('register');
    };

    const handleSwitchToLogin = () => {
        setCurrentForm('login');
    };

    const handleRegisterSuccess = () => {
        // message.success('Đăng ký thành công! Vui lòng đăng nhập.');
        setCurrentForm('login'); // Chuyển về form login sau khi đăng ký thành công
    };

    return (
        <Modal
            title={currentForm === 'login' ? "Đăng nhập tài khoản" : "Đăng ký tài khoản mới"}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            {currentForm === 'login' ? (
                <LoginForm 
                    onCloseModal={onCancel} 
                    onSwitchToRegister={handleSwitchToRegister} // Prop để chuyển sang form đăng ký
                />
            ) : (
                <RegisterForm 
                    onRegisterSuccess={handleRegisterSuccess} // Prop để xử lý sau khi đăng ký thành công
                    onSwitchToLogin={handleSwitchToLogin} // Prop để chuyển về form đăng nhập
                />
            )}
        </Modal>
    );
};

export default AuthModal;