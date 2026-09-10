import React, { useEffect, useState } from "react";
import "./ProductoList.css";
import { useNotification } from "../../context/NotificationContext";

function ProductoList({ agregarAlCarrito, esAdmin, busqueda }) {
  const [productos, setProductos] = useState([]);
  const { mostrarNotificacion } = useNotification();

  // ESTADOS DE EDICIÓN
  const [productoEditando, setProductoEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});
  
  // MODALES
  const [imagenModal, setImagenModal] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [productoDetalle, setProductoDetalle] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // --- BUSCADOR INTELIGENTE (Marca, Producto o Categoría) ---
  const listaSegura = Array.isArray(productos) ? productos : [];
  const productosVisibles = listaSegura.filter((p) => {
    if (!busqueda) return true;
    const termino = busqueda.toLowerCase();
    
    // Busca coincidencias en Nombre, Marca o Categoría
    const matchNombre = p.nombre.toLowerCase().includes(termino);
    const matchMarca = p.marca ? p.marca.toLowerCase().includes(termino) : false;
    const matchCat = p.categoria.toLowerCase().includes(termino);

    return matchNombre || matchMarca || matchCat;
  });

  // ... (Mantené las funciones handleAgregar, handleEliminar, handleEditarFila igual que antes) ...
  // Solo copio las partes que cambian para no hacerte scrolling eterno, 
  // pero asegurate de mantener tus funciones auxiliares (abrirModal, etc.)

  // --- FUNCIONES AUXILIARES (Resumidas) ---
  const abrirModal = (url) => { setImagenModal(url); setZoom(1); };
  const cerrarModal = () => setImagenModal(null);
  const handleAgregar = (p) => { agregarAlCarrito(p); mostrarNotificacion(`✅ ${p.nombre} agregado`); };
  
  const handleEliminar = (id) => {
      if(window.confirm("¿Eliminar?")) {
          fetch(`http://localhost:8080/api/productos/${id}`, {method:"DELETE"})
          .then(() => { setProductos(prev => prev.filter(p=>p.id!==id)); mostrarNotificacion("🗑️ Eliminado"); });
      }
  };

  // EDICIÓN
  const handleEditarFila = (p) => { setProductoEditando(p.id); setDatosEditados({ ...p }); };
  const abrirModalEdicionDetalles = (p) => { setDatosEditados({ ...p }); setProductoDetalle(p); };
  const handleCancelar = () => { setProductoEditando(null); setDatosEditados({}); };
  const handleCambioCampo = (e) => { setDatosEditados({ ...datosEditados, [e.target.name]: e.target.value }); };

  // GUARDAR
  const guardarCambios = (idProducto) => {
    const payload = { ...datosEditados, precio: parseFloat(datosEditados.precio), stock: parseInt(datosEditados.stock) };
    fetch(`http://localhost:8080/api/productos/${idProducto}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    }).then(res => res.json()).then(act => {
        setProductos(prev => prev.map(p => (p.id === idProducto ? act : p)));
        setProductoEditando(null); setProductoDetalle(null);
        mostrarNotificacion("✅ Cambios guardados");
    });
  };

  return (
    <div>
      {/* ... (MODAL DE IMAGEN - Igual que antes) ... */}
      {imagenModal && (
         <div className="modal-imagen-backdrop" onClick={cerrarModal}>
            <div className="modal-imagen-contenido">
                <span className="cerrar-modal" onClick={cerrarModal}>&times;</span>
                <img src={imagenModal} alt="Zoom" style={{ transform: `scale(${zoom})` }} />
            </div>
         </div>
      )}

      {/* --- MODAL DETALLES / EDICIÓN --- */}
      {productoDetalle && (
        <div className="modal-imagen-backdrop" onClick={() => setProductoDetalle(null)}>
            <div className="modal-detalle-card" onClick={(e) => e.stopPropagation()}>
                <button className="cerrar-modal-btn" onClick={() => setProductoDetalle(null)}>×</button>
                <div className="detalle-contenido">
                    <div className="detalle-img-container">
                        <img src={esAdmin ? (datosEditados.imagenUrl || productoDetalle.imagenUrl) : productoDetalle.imagenUrl} alt="Detalle" 
                             onError={(e) => e.target.src = 'https://via.placeholder.com/300'} />
                        {esAdmin && <input type="text" name="imagenUrl" className="input-detalle-dark" 
                                          value={datosEditados.imagenUrl || ''} onChange={handleCambioCampo} placeholder="URL Imagen" style={{marginTop:'10px'}}/>}
                    </div>
                    <div className="detalle-info">
                        {/* EDICIÓN DE MARCA EN EL MODAL */}
                        {esAdmin ? (
                            <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                                <input type="text" name="marca" className="input-detalle-dark" placeholder="Marca" value={datosEditados.marca || ''} onChange={handleCambioCampo} style={{width:'40%'}}/>
                                <input type="text" name="nombre" className="input-titulo-dark" placeholder="Modelo/Nombre" value={datosEditados.nombre || ''} onChange={handleCambioCampo} style={{width:'60%', fontSize:'1.2rem'}}/>
                            </div>
                        ) : (
                            // VISTA CLIENTE: MARCA Y NOMBRE
                            <>
                                <h4 style={{color:'#82b1ff', margin:'0', textTransform:'uppercase', letterSpacing:'1px'}}>{productoDetalle.marca || 'GENÉRICO'}</h4>
                                <h3 style={{marginTop:'5px'}}>{productoDetalle.nombre}</h3>
                            </>
                        )}

                        <p className="categoria-badge">{productoDetalle.categoria}</p>

                        {esAdmin ? <textarea name="descripcion" className="textarea-detalle-dark" value={datosEditados.descripcion || ''} onChange={handleCambioCampo} rows="4"/> 
                                 : <p className="descripcion-texto">{productoDetalle.descripcion}</p>}
                        
                        <div className="precio-grande">
                            {esAdmin ? <input type="number" name="precio" className="input-precio-dark" value={datosEditados.precio || 0} onChange={handleCambioCampo}/> 
                                     : `$${productoDetalle.precio}`}
                        </div>

                        {esAdmin ? <button className="btn-agregar-grande" style={{background:'#28a745'}} onClick={() => guardarCambios(productoDetalle.id)}>💾 GUARDAR</button>
                                 : <button className="btn-agregar-grande" disabled={productoDetalle.stock===0} onClick={() => { handleAgregar(productoDetalle); setProductoDetalle(null); }}>
                                      {productoDetalle.stock===0 ? "SIN STOCK" : "AGREGAR AL CARRITO 🛒"}
                                   </button>}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- TABLA DE PRODUCTOS --- */}
      {!esAdmin && <h2 style={{ color: "#fff" }}>{busqueda ? `Buscando: "${busqueda}"` : "Catálogo Completo"}</h2>}

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Marca</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cat</th>
            {/* Usamos ternario (? :) para evitar que 'false' genere un nodo de texto vacío */}
            {esAdmin ? <th>Stock</th> : null}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosVisibles.map((p) => (
            <tr key={p.id}>
              {/* 1. IMAGEN */}
              <td data-label="Imagen">
                {p.imagenUrl ? (
                  <img
                    src={p.imagenUrl}
                    alt="min"
                    style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px", cursor: "pointer" }}
                    onClick={() => abrirModal(p.imagenUrl)}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/40")}
                  />
                ) : (
                  "📷"
                )}
              </td>

              {/* 2. MARCA */}
              <td data-label="Marca">
                {esAdmin && productoEditando === p.id ? (
                  <input
                    type="text"
                    name="marca"
                    value={datosEditados.marca || ""}
                    onChange={handleCambioCampo}
                    style={{ width: "80px", color: "#00d2ff", fontWeight: "bold" }}
                    placeholder="Marca"
                  />
                ) : (
                  <span style={{ color: "#00d2ff", fontWeight: "600", textTransform: "uppercase", fontSize: "0.85rem" }}>
                    {p.marca || "-"}
                  </span>
                )}
              </td>

              {/* 3. PRODUCTO */}
              <td data-label="Producto">
                {esAdmin && productoEditando === p.id ? (
                  <input type="text" name="nombre" value={datosEditados.nombre || ""} onChange={handleCambioCampo} />
                ) : (
                  <strong>{p.nombre}</strong>
                )}
              </td>

              {/* 4. PRECIO */}
              <td data-label="Precio">
                {esAdmin && productoEditando === p.id ? (
                  <input type="number" name="precio" value={datosEditados.precio || 0} onChange={handleCambioCampo} style={{ width: "80px" }} />
                ) : (
                  `$${p.precio}`
                )}
              </td>

              {/* 5. CATEGORÍA */}
              <td data-label="Categoría">
                {esAdmin && productoEditando === p.id ? (
                  <input type="text" name="categoria" value={datosEditados.categoria || ""} onChange={handleCambioCampo} style={{ width: "80px" }} />
                ) : (
                  p.categoria
                )}
              </td>

              {/* 6. STOCK (Renderizado condicional limpio) */}
              {esAdmin ? (
                <td data-label="Stock">
                  {productoEditando === p.id ? (
                    <input type="number" name="stock" value={datosEditados.stock || 0} onChange={handleCambioCampo} style={{ width: "60px" }} />
                  ) : (
                    <span style={{ color: p.stock === 0 ? "#ff6b6b" : "#69db7c", fontWeight: "bold" }}>{p.stock}</span>
                  )}
                </td>
              ) : null}

              {/* 7. ACCIONES */}
              <td data-label="Acciones">
                {esAdmin ? (
                  productoEditando === p.id ? (
                    <>
                      <button onClick={() => guardarCambios(p.id)} style={{ backgroundColor: "#4dabf7", color: "white", marginRight: "5px" }}>💾</button>
                      <button onClick={handleCancelar} style={{ backgroundColor: "#e0e0e0", color: "#333" }}>✖</button>
                    </>
                  ) : (
                    <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                      <button onClick={() => abrirModalEdicionDetalles(p)} style={{ backgroundColor: "#5f6368", color: "white" }}>📝</button>
                      <button onClick={() => handleEditarFila(p)} style={{ backgroundColor: "#333", border: "1px solid #555", color: "white" }}>✏️</button>
                      <button className="btn-eliminar" onClick={() => handleEliminar(p.id)}>🗑️</button>
                    </div>
                  )
                ) : (
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <button onClick={() => { setProductoDetalle(p); setDatosEditados({}); }} style={{ backgroundColor: "#2b2b36", border: "1px solid #555", color: "#00d2ff" }}>👁️</button>
                    <button
                      onClick={() => handleAgregar(p)}
                      disabled={p.stock === 0}
                      style={{
                        backgroundColor: p.stock === 0 ? "#444" : "#007bff",
                        color: "white",
                        cursor: p.stock === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      {p.stock === 0 ? "Sin Stock" : "🛒 +"}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoList;