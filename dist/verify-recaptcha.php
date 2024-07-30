<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $recaptchaSecret = '6LfJ1bsZAAAAALSIusIkGR8eH_0e9QwhVw9Zbyie';
  $recaptchaToken = $_POST['token'];

  $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}");
  $responseData = json_decode($response);

  if ($responseData->success) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'errors' => $responseData->{'error-codes'}]);
  }
} else {
  echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
