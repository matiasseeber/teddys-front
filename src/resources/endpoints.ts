const base_url = "http://localhost:8000";

const endpoints = {
    dashboard: {
        method: "get",
        url: base_url + "/teddys/dashboard"
    },
    login: {
        method: "post",
        url: base_url + "/auth/login"
    },
    resources: {
        method: "get",
        url: base_url + "/teddys/resources"
    },
    createTeddy: {
        method: "post",
        url: base_url + "/teddys"
    },
    userTeddys: {
        method: "get",
        url: base_url + "/teddys"
    },
    deleteTeddy: {
        method: "delete",
        url: base_url + "/teddys/"
    }
}

export default endpoints;