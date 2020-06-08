const id = (root, args, context, info) => root.id;
const name = (root, args, context, info) => root.name;
const email = (root, args, context, info) => root.email;
const links = async (root, args, context, info) => {
    let list = await context.prisma.link.findMany({
        where: {
            poster: root.id
        }
    });
    return list;
};

module.exports = {
    id,
    name,
    email,
    links
}