import { model, InferSchemaType, Schema } from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: { type:String, required: true, unique:true}, 
    password: { type: String, required: true, select: false },
  },
   {  timestamps: true })

userSchema.pre("save", async function(next){
    if(!this.isModified('password')){ 
         return next()     
    }                              
    const salt = await bcrypt.genSalt(10)                                                                                
    if(this.password != undefined){
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }                                         
})
type User = InferSchemaType<typeof userSchema>
export default model<User>("TestUser", userSchema)
