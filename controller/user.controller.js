const { signUpService,
    findUserByEmail,
    getUserService,
    updateUserService,
    deleteUserService,
    getMeService
} = require("../service/user.service");
const { generateToken } = require("../utils/token");

// create user controller 
module.exports.signup = async (req, res) => {
    try {
        const user = await signUpService(req.body);
        const token = generateToken(user);
        res.status(200).json({
            message: "successfully create account",
            token
        })
    }
    catch (error) {
        res.status(501).json({
            message: "fail to create id",
            error: error.message
        })
    }
}
// login user controller 
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials",
            });
        }
        // user find using email 
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found. Please create an account",
            });
        }
        //  check user password valid or invalid 
        const isPasswordValid = user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                error: "Password is not correct",
            });
        };
        // generate token for authenticate a user 
        const token = generateToken(user);
        res.status(200).json({
            message: "successfully create account",
            token
        })
    }
    catch (error) {

        res.status(501).json({
            message: "unauthentic person",
            error: error.message
        })
    }
}
// only admin can see user 
module.exports.getUser = async (req, res) => {
    try {
     const role = req?.user?.role;
        const user = await getUserService(role);
        res.status(200).json({
            message: "successfully get user",
            user
        })
    }
    catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error.message
        })  
    }
}
module.exports.getMe = async (req, res) => {
    try {
     const email = req?.user?.email;
        const user = await getMeService(email);
        const {password:pwd,...others} = user.toObject();
        res.status(200).json({
            message: "successfully get user",
           others
        })
    }
    catch (error) {
        res.status(400).json({
            message: "something wen wrong",
            error: error.message
        })  
    }
}


// admin update user 
module.exports.updateUser = async (req, res) => {
    try {
        const userData = req.body;
        const { id } = req.params;
        const role = req?.user?.role;
        const user = await updateUserService(id,userData, role );
         if(!user){
            return res.status(400).json({
                message: "something wrong to update",
            })
         }
        res.status(200).json({
            message: "successfully update user",
            user
        })
    }
    catch (error) {
        res.status(400).json({
            message: "something wrong to update",
            error: error.message
        })
    }
}
// delete controller 
module.exports.deleteUser = async (req, res) => {
    try {
      
        const { id } = req.params;
        const user = await deleteUserService(id);
        res.status(200).json({
            message: "successfully delete user",
            user
        })
    }
    catch (error) {
        res.status(400).json({
            message: "  not to delete account  ",
            error: error.message
        })
    }
}