const CONFIG = {
    // URL Deployment Web App Apps Script Anda
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwiKhR6FLZwOfK0WVBOfkInp8Wv15T5BBGHnIp2C1FAkjd-wv0fbE9Gn_fskNgZQR306Q/exec", 
    TOKEN_KEY: "auth_token_17an"
};

const api = {
    /**
     * Helper request ke Google Apps Script
     */
    request: async (action, method = 'GET', data = null) => {
        const url = `${CONFIG.SCRIPT_URL}?action=${action}`;
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };

        if (data) options.body = JSON.stringify(data);

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (!result.success) throw new Error(result.message || "Terjadi kesalahan pada server");
            return result.data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },

    getLomba: () => api.request('get_lomba', 'GET'),
    getPeserta: () => api.request('get_peserta', 'GET'),
    getJuri: () => api.request('get_juri', 'GET'),
    getPenilaian: () => api.request('get_penilaian', 'GET'),
    getJuara: () => api.request('get_juara', 'GET'),
    
    postPeserta: (data) => api.request('post_peserta', 'POST', data),
    
    login: async (username, password) => {
        const result = await api.request('login', 'POST', { username, password });
        if (result.token) localStorage.setItem(CONFIG.TOKEN_KEY, result.token);
        return result;
    },

    logout: () => {
        localStorage.removeItem(CONFIG.TOKEN_KEY);
        window.location.hash = '#dashboard';
        window.location.reload();
    }
};

const utils = {
    showLoader: (text = "Memproses...") => {
        const loader = document.getElementById('global-loader');
        if (loader) {
            document.getElementById('loader-text').innerText = text;
            loader.classList.remove('hidden');
        }
    },
    hideLoader: () => {
        const loader = document.getElementById('global-loader');
        if (loader) loader.classList.add('hidden');
    },
    showAlert: (title, text, icon = 'success') => {
        if(typeof Swal !== 'undefined') Swal.fire({ title, text, icon, confirmButtonText: 'OK', confirmButtonColor: '#e63946' });
        else alert(`${title}: ${text}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Aplikasi Sistem Lomba Siap");
});