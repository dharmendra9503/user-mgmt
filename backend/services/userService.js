const User = require('../models/user.model');

const createUser = async (params) => {
    const data = await User.create(params);
    return data;
}

const findUserById = async (id) => {
    const data = await User.findOne({ _id: id });
    return data;
}

const findUserByEmail = async (email) => {
    const data = await User.findOne({ email });
    return data;
};

const findUserByMobile = async (mobile) => {
    const data = await User.findOne({ mobile });
    return data;
};

const findAllUser = async (attributes, pageOptions) => {
    const count = await User.countDocuments();
    const filter = {};
    if (attributes && attributes.length > 0) {
        attributes.forEach(attr => {
            filter[attr] = { $exists: true };
        });
    }
    const data = await User.find(filter).skip(pageOptions.offset).limit(pageOptions.limit);
    return { data, count };
}

const deleteUser = async (id) => {
    const filter = { _id: id };
    const data = await User.deleteOne(filter);
    return data;
}

const updateUser = async (id, params) => {
    const filter = { _id: id, isActive: true };
    const data = await User.findByIdAndUpdate(filter, params, { new: true });
    return data;
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    findUserByMobile,
    findAllUser,
    deleteUser,
    updateUser
}