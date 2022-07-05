export const login = async (username, password) => {
    let returnValue = null;
    if (username == "admin" && password == "password") {
        returnValue = {
            id: 1,
            username: "admin@",
            email: "admin@",
        };
    }
    return returnValue;
};
