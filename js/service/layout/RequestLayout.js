class RequestLayout {

    constructor() { }

    static GET(url, cb, token, usuarioId) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("usuarioId", usuarioId);
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let response = [];
                if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                }
                cb(response);
            }
        }
    }

    static GETID(url, cb, usuarioLogin, usuarioSenha, token) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("usuarioLogin", usuarioLogin);
        formData.append("usuarioSenha", usuarioSenha);
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let response = [];
                if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                }
                cb(response);
            }
        }
    }

    static POST(url, dados, token, usuarioId) {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("usuarioId", usuarioId);
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(JSON.stringify(dados));
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let response = [];
                if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                }
            }
        }
    }

    static TOKEN(url, login, senha, cb) {
        let clientId = "pro-practice";
        let clientSecret = "pro-practice";

        // var authorizationBasic = $.base64.btoa(clientId + ':' + clientSecret);
        let authorizationBasic = window.btoa(clientId + ':' + clientSecret);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(`username=${login}&password=${senha}&grant_type=password`);
        //request.send("username=augusto@gmail.com&password=123&grant_type=password");

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let response = [];
                if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                }
                cb(xhr)
                //console.log(response.access_token);
            }
        }

    }
}