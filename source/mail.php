<?php 

	if(isset($_POST['name'])) $name = htmlspecialchars(trim($_POST['name']));
	if(isset($_POST['phone'])) $phone = htmlspecialchars(trim($_POST['phone']));
	if(isset($_POST['email'])) $email = htmlspecialchars(trim($_POST['email']));
	if(isset($_POST['city'])) $city = htmlspecialchars(trim($_POST['city']));
	if(isset($_POST['date'])) $date = htmlspecialchars(trim($_POST['date']));

	if(isset($_POST['program'])) $program = htmlspecialchars(trim($_POST['program']));
	if(isset($_POST['sizePeople'])) $sizePeople = htmlspecialchars(trim($_POST['sizePeople']));

	if(isset($_POST['recvize'])) {
		$recvize = htmlspecialchars(trim($_POST['recvize']));
	} else {
		$recvize = ' ';
	}

	$msg = "Имя : " . $name . "\n" . "Телефон : " . $phone . "\n" . "Почта : " . $email . "\n" . "Город : " . $city . "\n" . "Дата мероприятия : " . $date . "\n" . "Программа : " . $program . "\n" . "Количество артистов : " . $sizePeople . "\n" . "Дополнительные услуги : " . $recvize;

	if(mail("tartitan1999@gmail.com", "Заявка с сайта", $msg, "From: tartitan1999@gmail.com")) {
		echo $msg;
	} else {
		echo "при отправке сообщения возникли ошибки";
	}

?>