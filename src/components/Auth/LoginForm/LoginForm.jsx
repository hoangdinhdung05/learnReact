// src/components/Auth/LoginForm/LoginForm.jsx
import React from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth'; 

const { Link } = Typography;

// Thêm prop onSwitchToRegister
const LoginForm = ({ onCloseModal, onSwitchToRegister }) => { 
    const { login } = useAuth();

    const onFinish = async (values) => {
        try {
            await login(values.username, values.password);
            message.success('Đăng nhập thành công!');
            onCloseModal();
        } catch (error) {
            console.error('Login failed:', error);
            message.error(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <Link className="login-form-forgot" href="" style={{ float: 'right' }}>
                    Quên mật khẩu?
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                    Đăng nhập
                </Button>
                {/* Thêm onClick vào Link "đăng ký ngay!" */}
                Hoặc <Link onClick={onSwitchToRegister}>đăng ký ngay!</Link>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;