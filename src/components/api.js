const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
    headers: {
      authorization: 'dafd8395-e270-4f3d-a82a-91f90e632799',
      'Content-Type': 'application/json'
    }
};

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};
  
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};