import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Có thể thêm interceptor để gắn token vào mỗi request nếu đã đăng nhập
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken'); // Lấy token từ localStorage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Có thể thêm interceptor để xử lý lỗi 401 (Unauthorized) và refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Nếu lỗi 401 và chưa thử refresh token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                // Gọi API refresh token
                const res = await axios.post('http://localhost:8080/api/auth/refresh-token', { refreshToken }); // Thay URL refresh token
                const { accessToken, refreshToken: newRefreshToken } = res.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Gắn token mới vào header của request gốc và thử lại
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Nếu refresh token thất bại, đăng xuất người dùng
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // window.location.href = '/login'; // Redirect về trang login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;