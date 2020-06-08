const feed = async (root, args, context, info) => {
    let links = await context.prisma.link.findMany();
    return links;
};

const link = async (root, args, context, info) => {
    let link = await context.prisma.link.findOne({
        where: {
            id: Number(args.id)
        }
    });
    return link;
};

module.exports = {
    feed,
    link
}