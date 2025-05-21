const userModel = require('../Model/UserModel')

exports.createUser = async (req, res) => {


    try {
        const users = req.body.users;

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: 'Please enter bulk data' });
        }

        const insertUsers = await userModel.insertMany(users, { ordered: false });
        res.status(201).json({ message: "Users inserted", data: insertUsers });
        console.log(insertUsers)
    }
    catch (err) {
        if (err.name === "BulkWriteError") {
            return res.status(409).json({ message: "Some users could not be inserted", error: error.message })
        }
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const data = await userModel.find();
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data' });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { email, ...updateFields } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is requires to update the user" })
        }

        const updateUser = await userModel.findOneAndUpdate(
            { email },
            { $set: updateFields },
            { new: true }
        )

        if (!updateUser) {
            res.status(404).json({ message: "User not found by provided email" })
        }

        res.status(200).json({ message: "User update successfully", user: updateUser })
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email required to delete user" })
        }

        const deleteUser = await userModel.findOneAndDelete({ email })
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found " })
        }

        res.status(200).json({ message: "User deleted successfully", user: deleteUser })
    }
    catch (err) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}