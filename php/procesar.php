<?php
header('Content-Type: application/json; charset=UTF-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluimos PHPMailer manualmente
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags($_POST['nombre']);
    $contacto = strip_tags($_POST['contacto']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags($_POST['mensaje']);
    $privacidad = isset($_POST['privacidad']) ? 'Sí' : 'No';
    $promociones = isset($_POST['promociones']) ? 'Sí' : 'No';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "El correo electrónico no es válido."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP (Gmail)
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@mueblesamuebla.com';       // ⚡ tu correo Gmail
        $mail->Password = 'mkcc mbnn venh ivjz';                  // ⚡ contraseña de aplicación
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Remitente y destinatario
        $mail->setFrom('info@mueblesamuebla.com', 'Amuebla');
        $mail->addAddress('info@mueblesamuebla.com');  // ⚡ tu correo donde recibirás los mensajes
        $mail->addReplyTo($email, $nombre);

        // Contenido del correo
        $mail->isHTML(true); // ✅ Activar formato HTML
        $mail->Subject = "Nuevo presupuesto solicitado";

        $mail->AddEmbeddedImage(__DIR__ . '/logoCorreo.jpg', 'logo_amuebla');

        // ✅ Contenido HTML con estilos inline
       $mail->Body = '
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f0f2f5;
                    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    color: #333;
                }

                .email-wrapper {
                    max-width: 600px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0,0,0,0.05);
                }

                .email-header {
                    background-color: #346231;
                    padding: 20px;
                    text-align: center;
                }

                .email-header img {
                    max-height: 50px;
                }

                .email-body {
                    padding: 30px;
                }

                .email-title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    color: #346231;
                }

                .campo {
                    margin-bottom: 15px;
                }

                .label {
                    font-weight: 800;
                    margin-bottom: 5px;
                    color: #555;
                }

                .valor {
                    color: #222;
                }

                .email-footer {
                    text-align: center;
                    font-size: 12px;
                    color: #888;
                    padding: 20px;
                }
            </style>
        </head>
        <body>  
            <div class="email-wrapper">
                <div class="email-header">
                    <img src="cid:logo_amuebla" alt="Logo de Amuebla">
                </div>
                <div class="email-body">
                    <div class="email-title">Nuevo presupuesto solicitado</div>
                    <div class="campo">
                        <span class="label">Nombre:</span>
                        <span class="valor">' . htmlspecialchars($nombre) . '</span>
                    </div>
                    <div class="campo">
                        <span class="label">Contacto:</span>
                        <span class="valor">' . htmlspecialchars($contacto) . '</span>
                    </div>
                    <div class="campo">
                        <span class="label">Email:</span>
                        <span class="valor">' . htmlspecialchars($email) . '</span>
                    </div>
                    <div class="campo">
                        <span class="label">Mensaje:</span>
                        <span class="valor">' . nl2br(htmlspecialchars($mensaje)) . '</span>
                    </div>
                    <div class="campo">
                        <span class="label">Acepta privacidad:</span>
                        <span class="valor">' . $privacidad . '</span>
                    </div>
                    <div class="campo">
                        <span class="label">Promociones:</span>
                        <span class="valor">' . $promociones . '</span>
                    </div>
                </div>
                <div class="email-footer">
                    © ' . date("Y") . ' Amuebla. Todos los derechos reservados.
                </div>
            </div>
        </body>
        </html>';


        $mail->send();
        echo json_encode([
    "success" => true,
    "message" => "<strong>Gracias por contactarnos</strong> <br> Tu mensaje ha sido enviado"
]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error al enviar: {$mail->ErrorInfo}"]);
    }
}
?>

