import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Popconfirm, Modal, Descriptions, Form, Input, Select, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import './userpage.css';
import userService from '../../../services/user.service.api'
import roleService from '../../../services/role.service.api'

const { Option } = Select;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // States cho Modal thêm/sửa
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [form] = Form.useForm(); 

  // State cho Modal xem chi tiết
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State cho danh sách role
  const [roleOptions, setRoleOptions] = useState([]);

  // --- Hàm tải danh sách người dùng ---
  const fetchUsers = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const data = await userService.getUser(page, pageSize);
      setUsers(data.content);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: data.totalElements,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      message.error('Lỗi khi tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect để tải dữ liệu ban đầu và khi phân trang thay đổi ---
  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // --- Hàm lấy danh sách role từ API ---
  const fetchRoleOptions = async () => {
    try {
      const res = await roleService.getRoles(1, 100); // lấy tối đa 100 role
      setRoleOptions(res.content || []);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      message.error('Lỗi khi tải danh sách vai trò!');
    }
  };

  // --- Xử lý thêm người dùng mới ---
  const handleAddUser = async () => {
    setEditingUser(null);
    form.resetFields();
    await fetchRoleOptions();
    setIsAddEditModalVisible(true);
  };

  // --- Xử lý chỉnh sửa người dùng ---
  const handleEditUser = async (userId) => {
    try {
      setLoading(true);
      const userToEdit = await userService.getUserById(userId);
      await fetchRoleOptions();
      setEditingUser(userToEdit);
      form.setFieldsValue({
        username: userToEdit.username,
        email: userToEdit.email,
        password: '',
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        roles: userToEdit.roles.map(role => role.name), // lấy tên role
      });
      setIsAddEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user to edit:", error);
      message.error('Lỗi khi tải thông tin người dùng để chỉnh sửa.');
    } finally {
      setLoading(false);
    }
  };

  // --- Xử lý xóa người dùng ---
  const handleDeleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      message.success(`Đã xóa người dùng ID: ${userId} thành công!`);
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error("Failed to delete user:", error);
      message.error('Lỗi khi xóa người dùng.');
    }
  };

  // --- Xử lý submit form thêm/sửa người dùng ---
  const handleFormSubmit = async (values) => {
  setLoading(true);
  try {
    // Loại bỏ role trùng lặp
    const uniqueRoles = Array.from(new Set(values.roles));
    // Gửi lên BE đúng dạng mảng tên role
    const submitData = { ...values, roles: uniqueRoles };

    if (editingUser) {
      const updatedUser = await userService.updateUser(editingUser.id, {
        ...submitData,
        password: submitData.password || undefined
      });
      message.success(`Cập nhật người dùng "${updatedUser.username}" thành công!`);
    } else {
      const newUser = await userService.createUser(submitData);
      message.success(`Thêm người dùng "${newUser.username}" thành công!`);
    }
    setIsAddEditModalVisible(false);
    fetchUsers(pagination.current, pagination.pageSize);
  } catch (error) {
    message.error(`Thất bại: ${error.response?.data?.message || 'Có lỗi xảy ra'}`);
  } finally {
    setLoading(false);
  }
};

  // --- Xử lý hủy modal thêm/sửa ---
  const handleCancelAddEditModal = () => {
    setIsAddEditModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  // --- Xử lý xem chi tiết người dùng ---
  const handleViewDetails = async (user) => {
    setLoading(true);
    try {
      const fullUser = await userService.getUserById(user.id);
      setSelectedUser(fullUser);
      setIsViewModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      message.error('Lỗi khi tải chi tiết người dùng.');
    } finally {
      setLoading(false);
    }
  };

  // --- Xử lý hủy modal xem chi tiết ---
  const handleCancelViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedUser(null);
  };

  // --- Xử lý xuất dữ liệu người dùng ---
  const handleExportUsers = async () => {
    setLoading(true);
    try {
      const blob = await userService.exportUsers();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      message.success('Xuất dữ liệu người dùng thành công!');
    } catch (error) {
      console.error("Failed to export users:", error);
      message.error('Lỗi khi xuất dữ liệu người dùng.');
    } finally {
      setLoading(false);
    }
  };

  // --- Định nghĩa cột cho bảng ---
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Họ và tên',
      key: 'fullName',
      render: (text, record) => `${record.firstName || ''} ${record.lastName || ''}`.trim() || 'N/A',
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
      render: (roles) => (
        roles && roles.length > 0 ? roles.map(role => (
          <Tag color="blue" key={role.name || role}>{(role.name || role).toUpperCase()}</Tag>
        )) : <Tag color="default">NONE</Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="small">
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            title="Xem chi tiết"
          >
            Xem
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.id)}
            title="Sửa thông tin"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDeleteUser(record.id)}
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

  const handleTableChange = (newPagination) => {
  setPagination((prev) => ({
    ...prev,
    current: newPagination.current,
    pageSize: newPagination.pageSize,
  }));
};

  return (
    <div className="user-management-container">
      <h1>Quản lý người dùng</h1>
      <div className="user-action-bar">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          Thêm người dùng mới
        </Button>
        <Button type="default" icon={<DownloadOutlined />} onClick={handleExportUsers}>
          Xuất file Excel
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id" 
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />

      {/* Modal for Add/Edit User */}
      <Modal
        title={editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        open={isAddEditModalVisible}
        onCancel={handleCancelAddEditModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{ roles: [] }}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input />
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          {editingUser && (
            <Form.Item
              name="password"
              label="Mật khẩu (Để trống nếu không muốn thay đổi)"
            >
              <Input.Password placeholder="Nhập mật khẩu mới nếu muốn thay đổi" />
            </Form.Item>
          )}

          <Form.Item name="firstName" label="Tên">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Họ">
            <Input />
          </Form.Item>
          <Form.Item
            name="roles"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một vai trò!' }]}
          >
            <Select mode="multiple" placeholder="Chọn vai trò">
              {roleOptions.map(role => (
                <Option key={role.id} value={role.name}>
                  {role.name.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingUser ? "Cập nhật" : "Thêm mới"}
            </Button>
            <Button onClick={handleCancelAddEditModal} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for User Details (Xem chi tiết) */}
      <Modal
        title="Chi tiết người dùng"
        open={isViewModalVisible}
        onCancel={handleCancelViewModal}
        footer={[
          <Button key="back" onClick={handleCancelViewModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedUser ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{selectedUser.id}</Descriptions.Item>
            <Descriptions.Item label="Tên đăng nhập">{selectedUser.username}</Descriptions.Item>
            <Descriptions.Item label="Họ và tên">{`${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim() || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              {selectedUser.roles && selectedUser.roles.length > 0
                ? selectedUser.roles.map(role =>
                    <Tag color="blue" key={role.id || role.name}>{(role.name || role).toUpperCase()}</Tag>
                  )
                : <Tag color="default">NONE</Tag>
              }
            </Descriptions.Item>
            {selectedUser.userProfile && (
              <>
                <Descriptions.Item label="Avatar">
                  <img src={selectedUser.userProfile.avatarUrl} alt="avatar" style={{ width: 48, borderRadius: '50%' }} />
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">{selectedUser.userProfile.address || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{selectedUser.userProfile.phone || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{selectedUser.userProfile.birthDate || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Giới tính">{selectedUser.userProfile.gender || 'N/A'}</Descriptions.Item>
              </>
            )}
          </Descriptions>
        ) : (
          <p>Không có thông tin người dùng được chọn.</p>
        )}
      </Modal>
    </div>
  );
};

export default UserPage;