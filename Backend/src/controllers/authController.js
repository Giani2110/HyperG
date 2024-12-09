import { UserService } from "../services/userService.js";
import { comparePassword } from "../utils/hash.js";
import { hashPassword } from "../utils/hash.js";
import { createToken, verifyToken } from "../utils/jwt.js";

export class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        const user = await UserService.getByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = createToken({ id: user.id, email: user.email, username: user.username, type: user.type});
        return res.status(200).json( token );
    }

    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }
            const user = await UserService.getByEmail(email);
            if (user) {
                return res.status(409).json({ message: "Email ya registrado" });
            }
            const hashedPassword = await hashPassword(password);
    
            await UserService.create({ username, email, password: hashedPassword });
    
            return res.status(201).json({ message: "Usuario creado" });
        } catch (error) {
            console.error("Error en el registro:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}