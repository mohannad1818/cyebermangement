const apiUrl = 'http://localhost:5000/api';

const authService = {
  loginAdmin: async (username, password) => {
    if (username === 'mohannad' && password === '12345') {
      return Promise.resolve('Login successful');
    } else {
      return Promise.reject('Invalid credentials');
    }
  },
  loginUser: async (username, password) => {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Invalid credentials');
    }
  },
  addUser: async (username, password) => {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  },
  getUsers: async () => {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  },
  logout: () => {
    // هنا يمكن إضافة منطق تسجيل الخروج إذا كنت تستخدم جلسات أو توكنات
    // في هذا المثال، سنقوم فقط بإعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  }
};

export default authService;
