import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Popconfirm, Modal, Descriptions } from 'antd'; // Import Modal and Descriptions
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'; // Import EyeOutlined
import './userpage.css';
// import api from '../../utils/api'; // Tạm thời comment

const UserPage = () => {
  const [users, setUsers] = useState([
    { userId: 1, username: 'john.doe', email: 'john.doe@example.com', roles: ['user'], fullName: 'John Doe', createdAt: '2023-01-15' },
    { userId: 2, username: 'jane.admin', email: 'jane.admin@example.com', roles: ['admin', 'user'], fullName: 'Jane Admin', createdAt: '2022-05-20' },
    { userId: 3, username: 'peter.guest', email: 'peter.guest@example.com', roles: ['guest'], fullName: 'Peter Guest', createdAt: '2024-03-10' },
  ]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 3,
  });

  // State for Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // const fetchUsers = async (page = 1, pageSize = 10) => { ... };

  useEffect(() => {
    // fetchUsers(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleAddUser = () => {
    message.info('Chức năng thêm người dùng');
    // In a real app, you might open a form modal or navigate:
    // navigate('/admin/users/add');
  };

  const handleEditUser = (userId) => {
    message.info(`Chỉnh sửa người dùng ID: ${userId}`);
    // In a real app, you might open a form modal with user data or navigate:
    // navigate(`/admin/users/edit/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.userId !== userId));
    message.success(`Đã xóa người dùng ID: ${userId}`);
    setPagination({...pagination, total: pagination.total - 1});
    // In a real app, you'd call an API here and then refetch users:
    // await api.delete(`/admin/users/${userId}`);
    // fetchUsers(pagination.current, pagination.pageSize);
  };

  // --- New functions for View Details Modal ---
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };
  // --- End New functions ---

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => roles.map(role => role).join(', '),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="small"> {/* Changed size to 'small' for better button spacing */}
          <Button
            type="default" // Default type for "View" button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)} // Call new function
            title="Xem chi tiết"
          >
            Xem
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.userId)}
            title="Sửa thông tin"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDeleteUser(record.userId)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              title="Xóa người dùng"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-management-container">
      <h1>Quản lý người dùng</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser} style={{ marginBottom: 16 }}>
        Thêm người dùng mới
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="userId"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />

      {/* Modal for User Details */}
      <Modal
        title="Chi tiết người dùng"
        open={isModalVisible} // Use 'open' prop for Ant Design v5+
        onCancel={handleCancelModal}
        footer={[ // Custom footer with a close button
          <Button key="back" onClick={handleCancelModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedUser ? (
          <Descriptions bordered column={1}> {/* Use Descriptions for a nice key-value display */}
            <Descriptions.Item label="ID">{selectedUser.userId}</Descriptions.Item>
            <Descriptions.Item label="Tên đăng nhập">{selectedUser.username}</Descriptions.Item>
            <Descriptions.Item label="Họ và tên">{selectedUser.fullName || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              {selectedUser.roles ? selectedUser.roles.map(role => role).join(', ') : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{selectedUser.createdAt || 'N/A'}</Descriptions.Item>
            {/* Thêm các trường thông tin khác nếu có */}
          </Descriptions>
        ) : (
          <p>Không có thông tin người dùng được chọn.</p>
        )}
      </Modal>
    </div>
  );
};

export default UserPage;