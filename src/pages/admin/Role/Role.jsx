import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Popconfirm, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import roleService from '../../../services/role.service.api';
import './rolepage.css';

const RolePage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [form] = Form.useForm();

    const fetchRoles = async (page = pagination.current, pageSize = pagination.pageSize) => {
        setLoading(true);
        try {
            const data = await roleService.getRoles(page, pageSize);
                setRoles(data.content);
                setPagination({
                ...pagination,
                current: page,
                pageSize: pageSize,
                total: data.totalElements,
            });
        } catch (error) {
            console.error("Failed to fetch roles:", error);
            message.error('Lỗi khi tải danh sách vai trò.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);

    const handleTableChange = (newPagination) => {
        setPagination((prev) => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        }));
    };

    const handleAddRole = () => {
        setEditingRole(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditRole = (role) => {
        setEditingRole(role);
        form.setFieldsValue(role);
        setIsModalVisible(true);
    };

    const handleDeleteRole = async (roleId) => {
        try {
            await roleService.deleteRole(roleId);
            message.success('Xóa vai trò thành công!');
            fetchRoles(pagination.current, pagination.pageSize);
        } catch (error) {
            console.error("Failed to delete role:", error);
            message.error('Lỗi khi xóa vai trò.');
        }
    };

    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            if (editingRole) {
                await roleService.updateRole(editingRole.id, values);
                message.success('Cập nhật vai trò thành công!');
            } else {
                await roleService.createRole(values);
                message.success('Thêm vai trò thành công!');
            }
            setIsModalVisible(false);
            fetchRoles(pagination.current, pagination.pageSize);
        } catch (error) {
            console.error("Failed to handle form submit:", error);
            message.error('Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
            <Space>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditRole(record)}
                    >
                    Sửa
                </Button>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa vai trò này?"
                    onConfirm={() => handleDeleteRole(record.id)}
                    okText="Có"
                    cancelText="Không"
                    >
                    <Button type="danger" icon={<DeleteOutlined />}>
                        Xóa
                    </Button>
                </Popconfirm>
            </Space>
            ),
        },
    ];

    return (
        <div className="role-management-container">
            <h1>Quản lý vai trò</h1>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRole}>
                    Thêm vai trò mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={roles}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />
            <Modal
                    title={editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="name"
                        label="Tên vai trò"
                        rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                        {editingRole ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                        <Button onClick={() => setIsModalVisible(false)} style={{ marginLeft: 8 }}>
                        Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RolePage;