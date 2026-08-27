package com.entregaFinal.gestion.controller;

import com.entregaFinal.gestion.model.Usuario;
import com.entregaFinal.gestion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para Login
    @PostMapping("/login")
    public Usuario login(@RequestBody Map<String, String> credenciales) {
        String username = credenciales.get("username").toLowerCase().trim();
        String password = credenciales.get("password");

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));

        if (usuario.getPassword().equals(password)) {
            return usuario; // Login exitoso, devolvemos el usuario con su rol
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
        }
    }

    // Endpoint para registrarse (Para que puedas crear usuarios)
    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        String usernameNormalizado = usuario.getUsername().toLowerCase().trim();
        
        if (usuarioRepository.findByUsername(usernameNormalizado).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario ya existe");
        }
        
        usuario.setUsername(usernameNormalizado);
        
        // Por defecto rol USER si no se especifica
        if (usuario.getRol() == null) {
            usuario.setRol("USER");
        }
        return usuarioRepository.save(usuario);
    }
}