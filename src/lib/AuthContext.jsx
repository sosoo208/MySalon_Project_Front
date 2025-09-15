import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 앱 로드 시 localStorage에서 토큰과 사용자 정보 확인
        const storedToken = localStorage.getItem('token');
        if (storedToken ) {
            setToken(storedToken);
    
        }
        setLoading(false);
    }, []);

    const login = async (id, password) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role); // 역할 정보 저장
                return { success: true };
            } else {    
                const errorData = await response.json();
                return { success: false, message: errorData.message || '로그인에 실패했습니다.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: '서버와 통신할 수 없습니다.' };
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // 역할 정보 삭제
    };

    const authFetch = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            logout();
            window.location.href = '/login';
        }

        return response;
    };

    const value = {token, loading, login, logout, authFetch };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};