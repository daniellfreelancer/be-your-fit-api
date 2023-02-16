const UsersApp = require('../models/usersAppModel');
const Joi = require('joi')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const adminController = {

    signUp: async (req, res) => {
        let {
            name,
            email,
            password,
            from,
            role,
            imgUrl,
        } = req.body;

        let weight = 0;
        let size = 0;


        try {

            let userFit = await UsersApp.findOne({ email })


            if (!userFit) {
                let logged = false;
                password = bcryptjs.hashSync(password, 10)

                if (from === 'form') {
                    userFit = await new UsersApp(
                        {
                            name,
                            email,
                            password: [password],
                            role,
                            from: [from],
                            logged,
                            imgUrl,
                            weight,
                            size
                        }).save()
                    res.status(201).json({
                        message: "user signed up",
                        success: true
                    })
                } else {
                    userFit = await new UsersApp(
                        {
                            name,
                            email,
                            password: [password],
                            role,
                            from: [from],
                            logged,
                            imgUrl,
                            weight,
                            size
                        }).save()
                    res.status(201).json({
                        message: "user signed up " + from,
                        success: true
                    })
                }
            } else {
                if (userFit.from.includes(from)) {
                    res.status(200).json({
                        message: "user already exist " + from,
                        success: false
                    })
                } else {
                    userFit.from.push(from)
                    userFit.password.push(bcryptjs.hashSync(password, 10))
                    await userFit.save()
                    res.status(201).json({
                        message: "user signed up from " + from,
                        success: true
                    })
                }
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }

    },
    signIn: async (req, res) => {
        let { email, password, from } = req.body;

        try {

            const user = await UsersApp.findOne({ email })

            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.KEY_JWT,
                { 
                    expiresIn: 60 * 60 * 24 
                }
                )

            if (!user) {
                res.status(404).json({
                    message: 'User does not exist, please Sign Up!',
                    success: false
                })
            } else if (user) {

                const userPass = user.password.filter(userpassword => bcryptjs.compareSync(password, userpassword))

                if (from === "form") {
                    if (userPass.length > 0) {
                        const loginUser = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            from: user.from,
                            imgUrl: user.imgUrl,
                            role: user.role,
                            weight: user.weight,
                            size: user.size
                        }
                        user.logged = true
                        await user.save()

                        res.status(200).json({
                            message: 'Login Success',
                            success: true,
                            response: {
                                user: loginUser,
                                token: token
                            }
                        })
                    } else {
                        
                        res.status(400).json({
                            message: 'Login Failed, please check your email and password',
                            success: false
                        })
                    }
                }
                else {
                    if (userPass.length > 0) {

                        user.logged = true
                        
                        const loginUser = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            from: user.from,
                            imgUrl: user.imgUrl,
                            role: user.role,
                            weight: user.weight,
                            size: user.size
                        }

                        await user.save()
                        res.status(200).json({
                            message: 'Login Success from Google',
                            success: true,
                            response: {
                                user: loginUser,
                                token: token
                                }
                        })
                    } else {
                        res.status(404).json({
                            message: 'Login Failed, please check your password',
                            success: false
                        })
                    }
                }
            }
            else {
                res.status(401).json({
                    message: 'Login Failed, please verify your email',
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    signOut: async (req, res) => {
        let { email } = req.body;
        try {

            const adminUser = await UsersApp.findOne({ email })

            if (adminUser) {

                adminUser.logged = false;
                await adminUser.save();

                res.status(200).json({
                    message: 'Hasta luego, Cierre de sesión con exito',
                    success: true,
                    response: adminUser.logged
                })

            } else {
                res.status(400).json({
                    message: 'No podés cerrar sesión, ya que no estas loguead@',
                    success: false
                })
            }

        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Error al intentar finalizar tu sesión",
                success: false
            })
        }
    }




}

module.exports = adminController;