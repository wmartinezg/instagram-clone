import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const auth = {
    getToken: ({_id}, SECRET)=>{
        const token = jwt.sign({user: _id}, SECRET, { expiresIn: '5d'}) //expiresIn permite la validacion de
                        //por cuanto tiempo va a estar autenticado en el sitio
        const refreshToken = jwt.sign({user: _id}, SECRET, { expiresIn: '10m'}) 
        //refreshToken es un segundo token de validez mas corta

        return [token, refreshToken];
    },
    login: async (email, password, User, SECRET)=>{
        console.log('hola mundo');
        const user = await User.findOne({email}); //await para esperar a que el modelo de mongoose encuentre
                                                    //un usuario con ese email
        if(!user){
            return {
                success:false,
                errors:[{path:'email', message:'Email no existe'}]
            }
        }
        const validPassword = await bcrypt.compare(password, user.password) //await porque demora un tiempo y si
                                                                            //no se pone devuelve la promesa
        if(!validPassword){
            return {
                success:false,
                errors:[{path:'password', message:'Password inválido'}]
            }
        }

        const [token, refreshToken] = auth.getToken(user, SECRET)
        //console.log(token);
        //console.log(refreshToken);

        return {
            success: true,
            token,
            errors: []
        }
    }
}

export default auth