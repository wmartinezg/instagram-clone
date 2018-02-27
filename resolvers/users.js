import bcrypt from 'bcrypt';
import auth from '../auth.js';

const formatErrors = (error,otherErrors)=>{
    const errors = error.errors;
    let objErrors = []

    console.log(errors)
    if(errors){
        Object.entries(errors).map(error=>{
            const {path, message} = error[1];
            objErrors.push({path,message})
        })
        objErrors = objErrors.concat(otherErrors)
        return objErrors;
    }else if(otherErrors.length) {
        return otherErrors;
    }

    const uknownError = {}
    switch(error.code){
        case 11000:
            uknownError.path = "username"
            uknownError.message = "El nombre de usuario ya existe"
        break;
        default:
            uknownError.path = "Desconocido"
            uknownError.message = error.message
    }
    return [uknownError]
}

export default {
    Query: {
        //holaMundo: (parent, args, context, info) => "Mi primer query de GraphQL!!!"
        allUsers: (parent, args, {models}) => models.User.find(),
        getUser: (parent, args, {models}) => models.User.findOne(args)
    },
    Mutation: {
        login: async (parent, {email, password}, {models:{User}, SECRET})=> auth.login(email, password, User, SECRET),
        createUser: async (parent, {password, ...args}, {models}) => {
            //async paara poner await en el const hashPassword, para que no devuelva una promesa
            //mientras encripta el password (se le puso 10 que es valor ideal para que no demore mucho
            //pero tampoco sea tan inseguro el password)
            //return models.User.create(args)
            const otherErrors = []
            try{
                if(password.length<8){
                    otherErrors.push({path: 'password', message: 'El password debe ser mayor a 8 caracteres'})
                }
                const hashPassword = await bcrypt.hash(password, 10)
                const user = await models.User.create({...args, password: hashPassword})

                if(otherErrors.length){ //pregunta si la longitud del password es mayor que cero
                    throw otherErrors;  //throw para lanzar el error
                }
                return {
                    success: user && user._id,
                    errors: []
                };
            }catch(error){
                return {
                    success: false,
                    errors: formatErrors(error,otherErrors)
                };
            }
        }
    }
}