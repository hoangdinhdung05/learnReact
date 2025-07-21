import api from './api';

const ADMIN_USER_API_BASE_URL = 'http://localhost:8080/api/users/admin';

const userService = {
    /**
     * Lấy danh sách người dùng có phân trang cho admin.
     * @param {number} page - Số trang (bắt đầu từ 1 cho FE, sẽ chuyển thành 0-indexed cho BE).
     * @param {number} size - Kích thước trang.
     * @returns {Promise<object>} Đối tượng chứa danh sách người dùng và thông tin phân trang.
    */
    getUser: async (page = 0, size = 10) => {
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
                    totalElements: total, // fallback nếu total sai
                    page: currentPage + 1, // để trả về lại cho FE dạng 1-indexed
                    size: pageSize
                };
            }

            throw new Error('Không thể lấy danh sách người dùng.');
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            throw error;
        }
    },

    /**
     * Tạo người dùng mới.
     * @param {object} userData - Dữ liệu người dùng cần tạo.
     * @returns {Promise<object>} Dữ liệu người dùng đã được tạo.
    */
    createUser: async (userData) => {
        try {

            const response = await api.post(`${ADMIN_USER_API_BASE_URL}/create`, userData);
            if (response.data && response.data.data) {
                return response.data.data;
            }
            throw new Error('Không thể tạo người dùng.');

        } catch (error) {
            console.error('Lỗi khi tạo người dùng mới phía admin:', error);
            throw error;
        }
    },

    /**
     * Cập nhật người dùng theo ID.
     * @param {number} userId - ID của người dùng cần cập nhật.
     * @param {object} userData - Dữ liệu người dùng cần cập nhật.
     * @returns {Promise<object>} Dữ liệu người dùng đã được cập nhật.
    */
    updateUser: async (userId, userData) => {
        try {
            const payload = {
                ...userData,
                roles: Array.isArray(userData.roles)
                    ? userData.roles
                        .filter(role => role)
                        .map(role => typeof role === 'string' ? role : role.name)
                    : userData.roles
            };

            const response = await api.patch(`${ADMIN_USER_API_BASE_URL}/${userId}`, payload);
            console.log('API updateUser response:', response); // Thêm dòng này để debug

            // Sửa lại phần này cho phù hợp với cấu trúc thực tế
            if (response.data) {
                // Nếu response.data.data tồn tại thì trả về, nếu không thì trả về response.data hoặc response.data.user
                if (response.data.data) return response.data.data;
                if (response.data.user) return response.data.user;
                return response.data;
            }
            throw new Error("Invalid API response structure for updateUser.");
        } catch (error) {
            console.error(`Lỗi khi cập nhật người dùng ID ${userId}:`, error);
            throw error;
        }
    },

    /**
     * Xóa người dùng theo ID.
     * @param {number} userId - ID của người dùng cần xóa.
     * @returns {Promise<void>}
    */
    deleteUser: async (userId) => {
        try {
        // API DELETE của bạn trả về status 204 NO_CONTENT, không có 'data' payload
        await api.delete(`${ADMIN_USER_API_BASE_URL}/${userId}`);
        return true; // Trả về true để báo hiệu thành công
        } catch (error) {
        console.error(`Lỗi khi xóa người dùng ID ${userId}:`, error);
        throw error;
        }
    },

    /**
     * Lấy chi tiết người dùng theo ID.
     * @param {number} userId - ID của người dùng cần lấy.
     * @returns {Promise<object>} Dữ liệu chi tiết người dùng.
     */
    getUserById: async (userId) => {
        try {
        const response = await api.get(`${ADMIN_USER_API_BASE_URL}/${userId}`);
        // API của bạn trả về { status, message, data: userObject }
        if (response.data && response.data.data) {
            return response.data.data;
        }
        throw new Error("Invalid API response structure for getUserById.");
        } catch (error) {
        console.error(`Lỗi khi lấy chi tiết người dùng ID ${userId}:`, error);
        throw error;
        }
    },

    /**
     * Xuất dữ liệu người dùng (giả định API trả về một file).
     * @returns {Promise<Blob>} Dữ liệu blob của file.
     */
    exportUsers: async () => {
        try {

            const response = await api.get('http://localhost:8080/api/excel/export/users', {
                responseType: 'blob',
            })
            return response.data;

        } catch (error) {
            console.error("Failed to export users:", error);
            throw error;
        }
    },
};

export default userService;