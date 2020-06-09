const newLink = {
    resolve: (payload, args, context, info) => {
        return payload;
    },
    subscribe: (payload, args, context, info) => context.pubsub.asyncIterator("CREATED")
};

const newVote = {
    resolve: (payload, args, context, info) => {
        return payload;
    },
    subscribe: (payload, args, context, info) => context.pubsub.asyncIterator("VOTED")
}

module.exports = {
    newLink,
    newVote
};