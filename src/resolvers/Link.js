const id = (root, args, context, info) => root.id;
const description = (root, args, context, info) => root.description;
const url = (root, args, context, info) => root.url;
const postedBy = async (root, args, context, info) => {
    let poster = await context.prisma.user.findOne({
        where: {
            id: root.poster
        }
    });
    return poster;
};

module.exports = {
    id,
    description,
    url,
    postedBy
}