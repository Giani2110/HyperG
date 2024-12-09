import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Button, Typography, Card, CardContent, CardActions, IconButton } from "@mui/material";
import { PersonAdd, Delete, Edit, ShoppingCart } from "@mui/icons-material";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "client" : "admin";
    const userToUpdate = users.find((user) => user.id === userId);
  
    if (!userToUpdate) return;
  
    const updatedUser = { ...userToUpdate, type: newRole };
  
    Swal.fire({
      title: `Cambiar a ${newRole}`,
      text: `¿Estás seguro de cambiar el rol de este usuario a ${newRole}?`,
      icon: "warning",
      background: "#1f2937", 
      color: "#ffffff", 
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        container: "bg-gray-900", 
        popup: "bg-gray-900", 
        title: "text-white",
        content: "text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? updatedUser : user
          )
        );
  
        fetch(`http://localhost:5000/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => response.json())
          .then(() => Swal.fire({
            title: "Rol cambiado",
            icon: "success",
            background: "#1f2937",
            color: "#ffffff",
            customClass: {
              container: "bg-gray-900",
              popup: "bg-gray-900", 
              title: "text-white", 
              content: "text-white", 
            },
          }))
          .catch((error) => {
            console.error("Error al actualizar el rol:", error);
            Swal.fire({
              title: "Error",
              text: "No se pudo cambiar el rol",
              icon: "error",
              background: "#1f2937",
              color: "#ffffff",
              customClass: {
                container: "bg-gray-900",
                popup: "bg-gray-900",
                title: "text-white",
                content: "text-white",
              },
            });
          });
      }
    });
  };

  const handleViewLibrary = (library) => {
    if (library.length > 0) {
      const libraryInfo = library
        .map((item) => `${item.title} (Precio: ${item.price})`)
        .join(", ");
      
      Swal.fire({
        title: "Compras del Usuario",
        text: `Biblioteca: ${libraryInfo}`,
        icon: "info",
        background: "#1f2937",
        color: "#ffffff",
      });
    } else {
      Swal.fire({
        title: "Compras del Usuario",
        text: "El usuario no tiene compras.",
        icon: "info",
        background: "#1f2937",
        color: "#ffffff",
      });
    }
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "¿Estás seguro de que quieres eliminar este usuario?",
      icon: "warning",
      background: "#1f2937",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
      customClass: {
        container: "bg-gray-900",
        popup: "bg-gray-900",
        title: "text-white", 
        content: "text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  
        fetch(`http://localhost:5000/users/${userId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => Swal.fire({
            title: "Usuario eliminado",
            icon: "success",
            background: "#1f2937",
            color: "#ffffff", 
            customClass: {
              container: "bg-gray-900",
              popup: "bg-gray-900", 
              title: "text-white",
              content: "text-white",
            },
          }))
          .catch((error) => {
            console.error("Error al eliminar el usuario:", error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el usuario",
              icon: "error",
              background: "#1f2937",
              color: "#ffffff",
              customClass: {
                container: "bg-gray-900",
                popup: "bg-gray-900",
                title: "text-white",
                content: "text-white",
              },
            });
          });
      }
    });
  };

  if (loading) return <div className="text-white">Cargando usuarios...</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-8" style={{ marginTop: "80px" }}>
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h4
          className="text-white text-center mb-12 mt-12 text-2xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Gestión de Usuarios
        </motion.h4>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users
            .filter((item) => item.id !== user.id)
            .map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card 
                  style={{ backgroundColor: '#2d2d2d', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
                  elevation={3} 
                >
                  <CardContent>
                    <Typography variant="h6" className="font-semibold">{user.username}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                    <Typography variant="body2" className="text-gray-400">Rol: {user.type}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleRoleChange(user.id, user.type)}
                      style={{ backgroundColor: '#1e40af', color: 'white' }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleViewLibrary(user.library)}
                      style={{ backgroundColor: '#16a34a', color: 'white' }}
                    >
                      <ShoppingCart />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      style={{ backgroundColor: '#dc2626', color: 'white' }}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;