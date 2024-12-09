import { UserService } from "../services/userService.js";
import { comparePassword } from "../utils/hash.js";
import { hashPassword } from "../utils/hash.js";
import { createToken, verifyToken } from "../utils/jwt.js";

export class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }
            const user = await UserService.getByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }
            const token = createToken(user);
            return res.status(200).json({ token });
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }
    
            console.log("Creando usuario:", { username, email });
            const hashedPassword = await hashPassword(password);
            const user = await UserService.create({ username, email, password: hashedPassword });
            const token = createToken(user);
    
            console.log("Usuario creado:", user);
    
            return res.status(201).json({ status: "success", message: "Registro exitoso", token });
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor", error: error.message });
        }
    }
}