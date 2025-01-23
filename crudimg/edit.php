<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

// Get the form data
$id = $_POST['id'];
$name = $_POST['name'];
$price = $_POST['price'];

// Check if a new image was uploaded
if(isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $image_name = $image['name'];
    $image_tmp = $image['tmp_name'];
    
    // Generate unique name for image
    $image_new_name = uniqid() . '_' . $image_name;
    $upload_path = 'img/' . $image_new_name;
    
    // Move uploaded file
    if(move_uploaded_file($image_tmp, $upload_path)) {
        // Update with new image
        $sql = "UPDATE products SET name=?, price=?, image=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $name, $price, $upload_path, $id);
    }
} else {
    // Update without changing image
    $sql = "UPDATE products SET name=?, price=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $name, $price, $id);
}

// Execute the query
if($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Product updated successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}

$stmt->close();
$conn->close();
?>