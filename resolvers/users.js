export default {
    Query: {
        //holaMundo: (parent, args, context, info) => "Mi primer query de GraphQL!!!"
        allUsers: (parent, args, {models}) => models.User.find(),
        getUser: (parent, args, {models}) => models.User.findOne()
    },
    Mutation: {
        createUser: (parent, args, {models}) => models.User.create(args)
    }
}