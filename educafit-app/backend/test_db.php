<?php
// ----------------------
// 1. CONEXIÓN A LA BD
// ----------------------
$host = 'localhost';
$db = 'levantamiento_pesas';
$user = 'root';
$pass = ''; // Cambia si usas contraseña en XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Conexión exitosa<br>";
} catch (PDOException $e) {
    die("❌ Error de conexión: " . $e->getMessage());
}

// ----------------------
// 2. INSERTAR USUARIO DE PRUEBA (si no existe)
// ----------------------
$nombre_usuario = 'usuario_demo';
$contraseña = password_hash('123456', PASSWORD_DEFAULT);
$nombre = 'Demo Usuario';
$altura_cm = 180;
$peso_kg = 80;

$sql = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$nombre_usuario]);

if ($stmt->rowCount() == 0) {
    $insert = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, contraseña, nombre, altura_cm, peso_kg) 
                            VALUES (?, ?, ?, ?, ?)");
    $insert->execute([$nombre_usuario, $contraseña, $nombre, $altura_cm, $peso_kg]);
    echo "✅ Usuario de prueba insertado<br>";
} else {
    echo "ℹ️ El usuario de prueba ya existe<br>";
}

// ----------------------
// 3. CONSULTAR Y MOSTRAR DATOS
// ----------------------
$stmt = $pdo->prepare("SELECT id, nombre_usuario, nombre, altura_cm, peso_kg, fecha_creacion FROM usuarios WHERE nombre_usuario = ?");
$stmt->execute([$nombre_usuario]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

echo "<pre>";
print_r($usuario);
echo "</pre>";
