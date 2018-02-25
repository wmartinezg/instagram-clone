import bcrypt from 'bcrypt';

export default {
    Query: {
        //holaMundo: (parent, args, context, info) => "Mi primer query de GraphQL!!!"
        allUsers: (parent, args, {models}) => models.User.find(),
        getUser: (parent, args, {models}) => models.User.findOne(args)
    },
    Mutation: {
        createUser: async (parent, {password, ...args}, {models}) => {
            //async paara poner await en el const hashPassword, para que no devuelva una promesa
            //mientras encripta el password (se le puso 10 que es valor ideal para que no demore mucho
            //pero tampoco sea tan inseguro el password)
            //return models.User.create(args)
            try{
                const hashPassword = await bcrypt.hash(password, 10)
                const user = await models.User.create({...args, password: hashPassword})
                return user && user._id;
            }catch(error){
                return false;
            }
        }
    }
}