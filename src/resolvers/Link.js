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
const votes = async (root, args, context, info) => {
    let v = await context.prisma.votes.findMany({
        where: {
            linkId: root.id
        }
    });
    return v;
};

module.exports = {
    id,
    description,
    url,
    postedBy,
    votes
}