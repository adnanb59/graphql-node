const feed = async (root, args, context, info) => {
    let conditions = args.filter ? {
        OR: [
            {
                description: {
                    contains: args.filter
                }
            }, {
                title: {
                    contains: args.filter
                }
            }
        ]
    } : {};
    let links = await context.prisma.link.findMany({
        where: conditions,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    });
    let count = await context.prisma.link.count({where: conditions});

    return {links, count};
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