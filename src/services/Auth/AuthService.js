const AuthService = {
    login (user) {
        return fetch('https://carango-bom-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(user),
            timeout: 5000
        })
            .then((r) => r.json())
            .catch((err) => err);
    }
}

export default AuthService;