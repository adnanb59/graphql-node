const newLink = {
    resolve: (payload, args, context, info) => {
        return payload;
    },
    subscribe: (payload, args, context, info) => context.pubsub.asyncIterator("CREATED")
};

module.exports = {
    newLink
};