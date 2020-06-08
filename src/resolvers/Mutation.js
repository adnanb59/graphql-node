const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const { getUserId } = require("../utils");

const signup = async (root, args, context, info) => {
    let hashPass = await bcrypt.hash(args.password, 10);
    let { password, ...user } = await context.prisma.user.create({
        data: {
            name: args.name,
            email: args.email,
            password: hashPass
        }
    });
    let token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    return {token, user};
};

const login = async (root, args, context, info) => {
    let result = await context.prisma.user.findOne({
        where: {
            email: args.email
        },
        include: {
            links: true
        }
    });
    if (!result) throw new Error("No such user found");

    let { password, ...user } = result;
    let valid = await bcrypt.compare(args.password, password);
    if (!valid) throw new Error("Invalid password");

    let token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
    return {
        token,
        user
    };
};

const post = async (root, args, context, info) => {
    let userId = getUserId(context);
    let link = await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: {id: userId} }
        }
    });
    context.pubsub.publish("CREATED", link);
    return link;
};

const updateLink = async (root, args, context, info) => {
    let link = await context.prisma.link.update({
        where: {
            id: args.id
        },
        data: {
            url: args.url,
            description: args.description
        }
    });
    return link;
};

const deleteLink = async (root, args, context, info) => {
    let link = await context.prisma.link.delete({
        where: {
            id: args.id
        }
    })
    return link;
};

module.exports = {
    post,
    updateLink,
    deleteLink,
    signup,
    login
}