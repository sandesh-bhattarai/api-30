const { GeneralStatus } = require("../../config/constants");
const { randomString } = require("../../utilities/helpers");
const userService = require("../user/user.service");
const authService = require("./auth.service");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

class AuthController{
    activateUser = async (req, res, next) => {
        try {
            const token = req.params.token;
            const user = await authService.validateActivationToken(token)
            // 1970-01-01
            const tokenCreatedAt = user.activeFor.getTime()     // timestamp => integer
            const today = Date.now()

            if(tokenCreatedAt < today) {
                throw {status: 400, detail:{token: "expired"}, message: "Token expired"}
            }

            // to activate 
            user.activationToken = null;
            user.activeFor = null; 
            user.status = GeneralStatus.ACTIVE;


            await user.save()

            // Notify, email 
            await authService.sendPostActiveNotification({to: user.email, name: user.name})

            res.json({
                result: null, 
                message: "Your account has been activated successfully. Please login to further process.",
                meta: null
            })

        } catch(exception) {
            next(exception)
        }
    }

    resendActivationToken = async(req, res, next) => {
        try {
            const token = req.params.token || null
            const user = await authService.validateActivationToken(token)
            
            user.activationToken = randomString(100)
            user.activeFor = new Date(Date.now() + (3*60*60*1000))

            await user.save()     // update

            await userService.sendActivationEmail({
                to: user.email, 
                name: user.name, 
                token: user.activationToken,
                sub: "Re-Activate your account!"
            })

            res.json({
                result: null, 
                message: "A new activation link has been forwareded to your email. Please proceed further."
            })

        } catch(exception) {
            console.log("AuthController | resentActivationToken | Error", exception)
            next(exception)
        }
    }

    login = async(req, res, next) => {
        try {
            const {email, password} = req.body;
            const userExists = await userService.getSingleUserByFilter({
                email: email
            })
            console.log(userExists)
            if(!userExists){
                throw {status: 400, message: "Invalid credentials provided"}
            }
            if(userExists && userExists.status === GeneralStatus.ACTIVE){
                if(bcrypt.compareSync(password, userExists.password)) {
                    // user 
                    const token = jwt.sign({
                        sub: userExists._id,
                        type: "bearer"
                    }, process.env.JWT_SECRET, {
                        expiresIn: "3h"
                    })
                    const refreshToken = jwt.sign({
                        sub: userExists._id,
                        type: "refresh"
                    }, process.env.JWT_SECRET, {
                        expiresIn: "1day"
                    })
                    // pat Table populate 
                    await authService.populatePAT(userExists._id, {token, refreshToken})

                    res.json({
                        result: {
                            userDetail: {
                                _id: userExists._id,
                                name: userExists.name,
                                email: userExists.email,
                                role: userExists.role,
                                image: userExists.image
                            },
                            token: {
                                access: token, 
                                refresh: refreshToken
                            }
                        },
                        message: "You have been successfully loggedin.",
                        meta: null
                    })
                } else {
                    throw {status: 400, message: "Credentials does not match"}
                }
            } else {
                throw {status: 400, message: "User not actiated"}
            }
        } catch(exception) {
            next(exception)
        }
    }

    getLoggedInUser = async (req, res, next) => {
        try {
            res.json({
                result: req.authUser, 
                meta: null, 
                message: "Your profile"
            })
        } catch(exception) {
            next(exception)
        }
    }

    logout = async(req, res, next) => {
        try {
            const authUser = req.authUser;
            const currentPat = req.currentSession;

            const query = req.query.logout || null;
            if(query === 'all') {
                // logout from all sessions
                await authService.deletePAT({
                    userId: authUser._id
                })
            } else {
                // logout this session
                await authService.deletePAT({
                    _id: currentPat._id
                })
            }

            res.json({
                result: null, 
                message: "Loggout successefully",
                meta: null
            })
        } catch(exception) {
            next(exception)
        }
    }
}

module.exports = new AuthController();