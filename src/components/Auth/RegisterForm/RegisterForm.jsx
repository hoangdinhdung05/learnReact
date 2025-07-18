// src/components/Auth/RegisterForm/RegisterForm.jsx
import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';

const { Link } = Typography;

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const { register } = useAuth(); // Lấy hàm register từ AuthContext
    const [form] = Form.useForm(); // Sử dụng form instance để reset form

    const onFinish = async (values) => {
        try {
            // Loại bỏ trường confirmPassword trước khi gửi lên API nếu API không cần
            const { ...userData } = values; 
            await register(userData);
            message.success('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
            form.resetFields(); // Reset form sau khi đăng ký thành công
            onRegisterSuccess(); // Gọi callback để đóng modal hoặc chuyển về form login
        } catch (error) {
            console.error('Registration failed:', error);
            message.error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <Form
            form={form} // Gán form instance
            name="register_form"
            className="register-form"
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
                label="Họ"
                name="firstName"
                rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
            >
                <Input placeholder="Họ" />
            </Form.Item>
            <Form.Item
                label="Tên"
                name="lastName"
                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
            >
                <Input placeholder="Tên" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Vui lòng nhập Email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                hasFeedback
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button" block>
                    Đăng ký
                </Button>
                Đã có tài khoản? <Link onClick={onSwitchToLogin}>Đăng nhập ngay!</Link>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;