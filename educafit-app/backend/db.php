<?php
// Configuración de conexión
$host = 'localhost';
$db = 'levantamiento_pesas';
$user = 'root';
$pass = ''; // Si tienes contraseña en XAMPP, escríbela aquí

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Opcional: descomenta si quieres confirmar la conexión
    // echo "Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));
}