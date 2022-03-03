<?php
  $required = array('name', 'email', 'phone');
  $error = false;
  foreach($required as $field) {
    if (empty($_REQUEST[$field])) {
      $error = true;
    }
  }

  if ($error) {
    echo 'Please fix errors';
  } else {
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $phone = $_REQUEST['phone'];
    $message = $_REQUEST['comment'];

    $fullmessage = "ФИО: ".$name."\n"."Почта: ".$email."\n"."Телефон: ".$phone."\n"."Сообщение: \n".$comment;

    // Set your email address where you want to receive emails.
    $to = 'talanovdd@yandex.ru';
    $subject = 'Сообщение с сайта. Заявка tseli.com';
    $send_email = mail($to,$subject,$fullmessage,$email);


    if ($send_email == false) {
      echo 'this is error';
    } else {
      echo 'this is success';
    }
  }
?>
