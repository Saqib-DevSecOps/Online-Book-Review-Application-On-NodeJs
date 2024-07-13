import user from "../models/user.js";
import {hashPassword, compare_hashed_passwords} from "../utils/hashing.js";
import {createToken} from "../utils/token.js"

export async function register(req, res) {
    try {
        const {email, username, password} = req.body;

        if (!email) {
            return res.json({message: "Email Field Is required"})
        }
        if (!username) {
            return res.json({message: "Username Field Is required"})
        }
        const foundUser = await user.findOne({where: {username}});

        if (foundUser) {
            return res.json({message: "This user is already registered!"});
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await user.create({username: username,email: email, password: hashedPassword});

        res.json({message: "User registered successfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error!!"});

    }
}

export async function login(req, res) {
    try {

        const {username, password} = req.body;
        const registeredUser = await user.findOne({where: {username}});

        if (!registeredUser) {
            return res.json({message: "Invalid Credentials!"});
        }

        // const is_matched = await compare_hashed_passwords(password, registeredUser.password);
        const is_matched = true;

        if (!is_matched) {
            return res.json({message: "Invalid Credentials!"});
        }

        // create token
        const token = createToken(registeredUser.id, username);

        return res.json({message: "User logged in successfully!", token});

    } catch (error) {
        console.log(error)

        res.status(500).json({message: "Internal Server Error!!"});

    }
}