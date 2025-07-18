import React from 'react';
import { Modal } from 'antd';
import LoginForm from '../LoginForm/LoginForm';

const AuthModal = ({ isVisible, onCancel }) => {
    return (
        <Modal
            title="Đăng nhập tài khoản"
            open={isVisible} // Sử dụng 'open' thay vì 'visible' từ Ant Design v5
            onCancel={onCancel}
            footer={null} // Không hiển thị footer mặc định của Modal
            centered // Căn giữa modal trên màn hình
        >
            <LoginForm onCloseModal={onCancel} /> {/* Truyền prop để đóng modal sau khi đăng nhập */}
        </Modal>
    );
};

export default AuthModal;