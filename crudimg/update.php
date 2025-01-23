<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

$id = isset($_POST['id']) ? $_POST['id'] : null;
$name = isset($_POST['name']) ? $_POST['name'] : null;
$price = isset($_POST['price']) ? $_POST['price'] : null;

if (!$id || !$name || !$price) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit();
}

try {
    // Handle image upload if a new image is provided
    $image_path = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'img/'; // Make sure this directory exists and is writable
        
        // Get the old image path to delete later
        $sql = "SELECT image FROM products WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $old_image = $result->fetch_assoc()['image'];
        
        // Generate new filename
        $file_extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $new_filename = uniqid() . '.' . $file_extension;
        $upload_path = $upload_dir . $new_filename;
        
        // Move uploaded file
        if (move_uploaded_file($_FILES['image']['tmp_name'], $upload_path)) {
            $image_path = $upload_path;
            
            // Delete old image if it exists
            if ($old_image && file_exists($old_image)) {
                unlink($old_image);
            }
        }
    }
    
    // Update the database
    if ($image_path) {
        $sql = "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sdsi", $name, $price, $image_path, $id);
    } else {
        $sql = "UPDATE products SET name = ?, price = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sdi", $name, $price, $id);
    }
    
    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Product updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to update product: " . $stmt->error
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$conn->close();
?>