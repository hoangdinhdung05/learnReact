import api from '../utils/api';

const ADMIN_USER_API_BASE_URL = 'http://localhost:8080/api/roles/admin';

const roleService = {
    getRoles: async (page = 1, size = 10) => {
        try {
            const response = await api.get(`${ADMIN_USER_API_BASE_URL}/getAll`, {
                params: {
                    page: page - 1,
                    size: size
                },
            });
            if (response.data && response.data.data) {
                const { items, total, page: currentPage, size: pageSize } = response.data.data;
                return {
                    content: items,
                    totalElements: total,
                    page: currentPage + 1,
                    size: pageSize
                };
            }
            throw new Error('Không thể lấy danh sách quyền hạn.');
        } catch (error) {
            console.log('Lỗi khi lấy danh sách quyền hạn:', error);
            throw error;
        }
    },

    createRole: async (roleData) => {
        try {
            const response = await api.post(`${ADMIN_USER_API_BASE_URL}/create`, roleData);
            if (response.data && response.data.data) {
                return response.data.data;
            }
            throw new Error('Không thể tạo quyền hạn.');
        } catch (error) {
            console.log('Lỗi khi tạo quyền hạn:', error);
            throw error;
        }
    },

    updateRole: async (roleId, roleData) => {
        try {
            const response = await api.put(`${ADMIN_USER_API_BASE_URL}/${roleId}`, roleData);
            if (response.data && response.data.data) {
                return response.data.data;
            }
            throw new Error('Không thể cập nhật quyền hạn.');
        } catch (error) {
            console.log('Lỗi khi cập nhật quyền hạn:', error);
            throw error;
        }
    },

    deleteRole: async (roleId) => {
        try {
            await api.delete(`${ADMIN_USER_API_BASE_URL}/${roleId}`);
            return true;
        } catch (error) {
            console.log('Lỗi khi xoá quyền hạn:', error);
            throw error;
        }
    }
};

export default roleService;