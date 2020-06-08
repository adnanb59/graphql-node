const jwt = require("jsonwebtoken");

const getUserId = (context) => {
    let auth = context.request.get("Authorization");
    if (auth) {
        let token = auth.replace("Bearer ", "");
        let {userId} = jwt.verify(token, process.env.APP_SECRET);
        return userId;
    }

    throw new Error("Not authenticated");
}

module.exports = {
    getUserId
}