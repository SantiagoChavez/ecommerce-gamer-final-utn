package com.entregaFinal.gestion.config;

import com.entregaFinal.gestion.model.Usuario;
import com.entregaFinal.gestion.model.Producto;
import com.entregaFinal.gestion.repository.UsuarioRepository;
import com.entregaFinal.gestion.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@SuppressWarnings("null")
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public DataInitializer(UsuarioRepository usuarioRepository, ProductoRepository productoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔄 Verificando usuarios iniciales...");

        // 1. Crear ADMIN si no existe
        if (usuarioRepository.findByUsername("admin").isEmpty()) {
            Usuario admin = new Usuario("admin", "1234", "ADMIN");
            usuarioRepository.save(admin);
            System.out.println("✅ USUARIO ADMIN CREADO: admin / 1234");
        } else {
            System.out.println("👌 El usuario admin ya existe.");
        }

        // 2. Crear CLIENTE de prueba si no existe
        if (usuarioRepository.findByUsername("cliente").isEmpty()) {
            Usuario user = new Usuario("cliente", "1234", "USER");
            usuarioRepository.save(user);
            System.out.println("✅ USUARIO CLIENTE CREADO: cliente / 1234");
        }

        // 3. Crear PRODUCTOS iniciales si la base de datos está vacía
        if (productoRepository.count() == 0) {
            System.out.println("🔄 Base de datos de productos vacía. Semillando datos iniciales...");
            
            Producto p1 = new Producto(
                "Teclado Mecánico Razer BlackWidow V4", 
                "Razer", 
                "Teclado mecánico premium con switches verdes táctiles, retroiluminación Chroma RGB y teclas multimedia dedicadas.", 
                189.99, 
                "Teclados", 
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop", 
                15
            );
            
            Producto p2 = new Producto(
                "Mouse Gamer Logitech G502 X Plus", 
                "Logitech", 
                "Mouse inalámbrico de alto rendimiento con sensor Hero 25K, switches óptico-mecánicos Lightforce y luces RGB programables.", 
                139.99, 
                "Mouses", 
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop", 
                20
            );
            
            Producto p3 = new Producto(
                "Monitor Curvo ASUS ROG Strix 27\"", 
                "ASUS", 
                "Monitor curvo de 27 pulgadas, resolución WQHD (2560x1440), frecuencia de actualización de 170Hz y compatibilidad con G-Sync.", 
                349.99, 
                "Monitores", 
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop", 
                8
            );
            
            Producto p4 = new Producto(
                "Placa de Video NVIDIA RTX 4070 Ti", 
                "ASUS", 
                "Placa gráfica de alto rendimiento con 12GB de memoria GDDR6X, soporte para Ray Tracing de tercera generación y DLSS 3.", 
                849.99, 
                "Placas de Video", 
                "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop", 
                5
            );
            
            Producto p5 = new Producto(
                "Auriculares Inalámbricos HyperX Cloud III", 
                "HyperX", 
                "Auriculares gaming inalámbricos con audio espacial DTS Headphone:X, transductores de 53 mm y batería de hasta 120 horas.", 
                129.99, 
                "Auriculares", 
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop", 
                12
            );
            
            Producto p6 = new Producto(
                "Mousepad Extendido Corsair MM300 Pro", 
                "Corsair", 
                "Alfombrilla para juegos extendida a prueba de derrames con superficie optimizada para mouses ópticos y bordes reforzados.", 
                29.99, 
                "Accesorios", 
                "https://images.unsplash.com/photo-1632292224971-0d45778bd364?q=80&w=600&auto=format&fit=crop", 
                30
            );

            productoRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6));
            System.out.println("✅ Base de datos de productos semillada con éxito (6 productos iniciales).");
        } else {
            System.out.println("👌 Los productos ya existen en la base de datos.");
        }
    }
}
