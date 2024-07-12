<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {

	$project_name = "Ваш сайт";
	$admin_email  = "test@gmail.com";
	$form_subject = "Заказ с сайта deliver";

	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "form_subject" ) {
			switch($key){
				case 'name':
					$n = 'Имя';
					break;
				case 'tel':
					$n = 'Телефон';
					break;
				case 'email':
					$n = 'E-mail';
					break;
				}
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$n</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
		}
	}
}

$message = "<table style='width: 100%;'>$message</table>";
$last = 'delivery';
$tema = '=?utf-8?B?'.base64_encode($last).'?=';

$sended = mail($admin_email, $form_subject, $message, "From: $tema" . "\r\n" . "Reply-To: $admin_email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");

if($sended){
	header('Content-Type: text/html; charset=utf-8');
	header( 'Refresh: 3; url=index.php' );
	echo "<center>СПАСИБО, СООБЩЕНИЕ ОТПРАВЛЕНО</center>";
} else{
	echo 'Ошибка отправки письма';
}