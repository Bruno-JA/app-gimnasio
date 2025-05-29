<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->usuario_id, $data->fecha, $data->series, 
          $data->repeticiones_por_serie, $data->peso_utilizado)
) {
    $usuario_id = $data->usuario_id;
    $fecha = $data->fecha;
    $series = (int) $data->series;
    $repeticiones = (int) $data->repeticiones_por_serie;
    $peso = (float) $data->peso_utilizado;
    $notas = isset($data->notas) ? $data->notas : '';
    $peso_total = $series * $repeticiones * $peso;

    try {
        $stmt = $pdo->prepare("UPDATE entrenamientos 
                               SET series = :series, 
                                   repeticiones_por_serie = :repeticiones, 
                                   peso_utilizado = :peso, 
                                   peso_total_levantado = :peso_total, 
                                   notas = :notas 
                               WHERE usuario_id = :usuario_id AND fecha = :fecha");

        $stmt->execute([
            ':series' => $series,
            ':repeticiones' => $repeticiones,
            ':peso' => $peso,
            ':peso_total' => $peso_total,
            ':notas' => $notas,
            ':usuario_id' => $usuario_id,
            ':fecha' => $fecha
        ]);

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Faltan datos obligatorios.']);
}
