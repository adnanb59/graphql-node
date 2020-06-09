const id = (root, args, context, info) => root.id;
const link = async (root, args, context, info) => {
    let l = await context.prisma.link.findOne({
        where: {
            id: root.linkId
        }
    });
    return l;
};
const user = async (root, args, context, info) => {
    let u = await context.prisma.user.findOne({
        where: {
            id: root.userId
        }
    });
    return u;
};

module.exports = {
    id,
    link,
    user
}