import supertest from "supertest";
import app from '../app'
import { MongoMemoryServer } from 'mongodb-memory-server'
import UserModel from '../model/userModel'
import mongoose from 'mongoose'

beforeEach(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    })

afterEach(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    })

type user = {
    username: string,
    password: string
}
const createUser = async (user: user) => {
    return await UserModel.create(user)
}
const user = {
    username: 'user1@gmail.com',
    password: "password1"
}


describe("User registeration", () => {
    it("returns 400 status code when signup data is invalid", (done) => {
        supertest(app)
            .post('/api/users/signup')
            .send({
                username: "invalid",
                password: "short"
            })
            .then((response) => {
                expect(response.status).toBe(400)
                done()
            })
    })

    it("returns 400 status code when email already exists", async () => {
        const existingUser = {
            username : "existingUser@gmail.com",
            password: "password1"
        }
        await createUser(existingUser)
        const res = await supertest(app)
            .post('/api/users/signup')
            .send({
                username: "existingUser@gmail.com",
                password: "password1"
            })
        expect(res.statusCode).toBe(400)
    })                                      
    it("returns 201 status code when signup is valid", (done) => {
        supertest(app)
            .post('/api/users/signup')
            .send(user)
            .then((response) => {
                expect(response.status).toBe(201)
                done()
            })
        })
        it('saves user to the database', (done) => {
            supertest(app)
                .post('/api/users/signup')
                .send(user)
                .then(() => {
                    UserModel.find().then((users => {
                        expect(users.length).toBe(1)
                        done()
                    }))
                })
        })
    it("hashes password before saving", (done) => {
        supertest(app)              
            .post('/api/users/signup')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            .send(user)
            .then(() => {
                UserModel.find().then((users => {
                    expect(users[0].password).not.toBe("password1")
                    done()
                }))
            })
    })
})

describe("User Login", ()=>{
    it("returns 400 status code when login data is invalid", (done) => {
        supertest(app)
            .post('/api/users/login')
            .send({
                username: "",
                passwod: "password1"
             })
            .then((response) => {
                expect(response.status).toBe(400)
                done()
            })
          })
        it("returns 401 status code when password is incorrect", (done) => {
            const newUser = {
                username: "user@gmail.com",
                password: "password1"
            }
            UserModel.create(newUser)
                supertest(app)
                    .post('/api/users/login')
                    .send({
                        username: "user@gmail.com",
                        password: "incorrect1"
                    })
                    .then((response) => {
                        expect(response.status).toBe(401)
                        done()
                    })

                })    
})  
    



