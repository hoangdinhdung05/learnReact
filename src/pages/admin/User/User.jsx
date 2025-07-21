import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Popconfirm, Modal, Descriptions, Form, Input, Select, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import './userpage.css';
import userService from '../../../utils/user.service.api'

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
  const [editingUser, setEditingUser] = useState(null); // Lưu trữ user đang chỉnh sửa
  const [form] = Form.useForm(); // Instance form của Ant Design

  // State cho Modal xem chi tiết
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
      // Console error đã được xử lý trong userService
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect để tải dữ liệu ban đầu và khi phân trang thay đổi ---
  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]); // Dependencies

  // --- Xử lý thay đổi trang/kích thước trang của bảng ---
  const handleTableChange = (newPagination) => {
    // Corrected line: Update the current page in the pagination state
    setPagination((prevPagination) => ({
      ...prevPagination, // Keep existing properties like total
      current: newPagination.current, // Update the current page
      pageSize: newPagination.pageSize, // Update the page size
    }));
    // No need to call fetchUsers here, as the useEffect will trigger on pagination state change
  };


  // --- Xử lý thêm người dùng mới ---
  const handleAddUser = () => {
    setEditingUser(null); // Không có người dùng nào đang được chỉnh sửa
    form.resetFields(); // Reset form
    setIsAddEditModalVisible(true); // Mở modal
  };

  // --- Xử lý chỉnh sửa người dùng ---
  const handleEditUser = async (userId) => {
    try {
      setLoading(true);
      const userToEdit = await userService.getUserById(userId);
      setEditingUser(userToEdit); // Đặt user đang chỉnh sửa
      form.setFieldsValue({ // Điền dữ liệu vào form
        username: userToEdit.username,
        email: userToEdit.email,
        password: '', // Không điền mật khẩu cũ vào form để bảo mật
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        roles: userToEdit.roles, // Giả sử roles là mảng string
      });
      setIsAddEditModalVisible(true); // Mở modal
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
      // Tải lại danh sách người dùng sau khi xóa thành công
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Lỗi khi xóa người dùng.');
      console.error("Failed to delete user:", error);
    }
  };

  // --- Xử lý submit form thêm/sửa người dùng ---
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingUser) {
        // Chỉnh sửa người dùng
        const updatedUser = await userService.updateUser(editingUser.id, {
          ...values,
          // Có thể cần loại bỏ trường password nếu không muốn update nó mỗi lần
          // hoặc chỉ gửi nếu nó có giá trị
          password: values.password || undefined // Gửi password nếu có, nếu không thì undefined để backend bỏ qua
        });
        message.success(`Cập nhật người dùng "${updatedUser.username}" thành công!`);
      } else {
        // Thêm người dùng mới
        const newUser = await userService.createUser(values);
        message.success(`Thêm người dùng "${newUser.username}" thành công!`);
      }
      setIsAddEditModalVisible(false); // Đóng modal
      fetchUsers(pagination.current, pagination.pageSize); // Tải lại danh sách
    } catch (error) {
      message.error(`Thất bại: ${error.response?.data?.message || 'Có lỗi xảy ra'}`);
      console.error("Form submit error:", error);
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
      // Gọi API lấy chi tiết user theo id
      const fullUser = await userService.getUserById(user.id);
      setSelectedUser(fullUser); // Đảm bảo có đầy đủ userProfile, roles, ...
      setIsViewModalVisible(true);
    } catch (error) {
      message.error('Lỗi khi tải chi tiết người dùng.');
      console.error("Failed to fetch user details:", error);
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
      // Tạo URL từ blob và tạo một liên kết tải xuống
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx'); // Đổi tên file nếu cần
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      message.success('Xuất dữ liệu người dùng thành công!');
    } catch (error) {
      message.error('Lỗi khi xuất dữ liệu người dùng.');
      console.error("Failed to export users:", error);
    } finally {
      setLoading(false);
    }
  };


  // --- Định nghĩa cột cho bảng ---
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id', // Đã đổi từ 'userId' sang 'id' theo BE
      key: 'id',
      sorter: (a, b) => a.id - b.id, // Sắp xếp theo ID
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
          <Tag color="blue" key={role}>{role.toUpperCase()}</Tag> // Hiển thị dưới dạng Tag
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
            onClick={() => handleEditUser(record.id)} // userId đã đổi thành id
            title="Sửa thông tin"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDeleteUser(record.id)} // userId đã đổi thành id
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
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          Thêm người dùng mới
        </Button>
        <Button type="default" icon={<DownloadOutlined />} onClick={handleExportUsers}>
          Xuất file Excel
        </Button>
      </Space>

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
        footer={null} // Tắt footer mặc định để dùng button của Form
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{ roles: [] }} // Đặt giá trị mặc định cho roles để tránh lỗi nếu không có
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
          {!editingUser && ( // Chỉ hiển thị trường password khi thêm mới
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          {editingUser && ( // Gợi ý người dùng có thể thay đổi mật khẩu
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
              <Option value="admin">ADMIN</Option>
              <Option value="user">USER</Option>
              <Option value="guest">GUEST</Option>
              {/* Thêm các vai trò khác nếu có */}
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
            {/* Hiển thị thông tin userProfile nếu có */}
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