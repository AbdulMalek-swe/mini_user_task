const User = require("../model/user.model")
// sign up user service 
module.exports.signUpService = async (data) => {
    return User.create(data);
}
// find user 
module.exports.findUserByEmail = async (email) => {
    return User.findOne({ email: email });
}
// get all user service 
module.exports.getUserService = async (role) => {
    let result;
    if (role.includes("manager")) {
        result = await User.find({ role: { $ne: 'admin' } });
    }
    else {
        result = await User.find({});
    }
    return result;
}
// get single login user service 
module.exports.getMeService = async (email) => {
    console.log(email);
    const result = await User.findOne({ email: email });
    return result;
}
// update user service 
module.exports.updateUserService = async (userId, userUpdateData, role) => {
    const findUser = await User.findById(userId);
    let result;
    if (role.includes("manager") && !findUser?.role.includes("admin")) {
        result = await User.updateOne({_id:userId},{username:userUpdateData?.username,email:userUpdateData?.email},{runValidators:true})
    }
    else if (role.includes("admin")) {
        result = await findUser.set(userUpdateData).save();
    }
    return result;
}
// delete user service 
module.exports.deleteUserService = async (userId) => {
    return await User.deleteOne({ _id: userId });
}