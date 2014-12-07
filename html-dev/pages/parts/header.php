<?php $base_url = 'http://' . $_SERVER['HTTP_HOST'] . implode('/', array_slice(explode('/', $_SERVER['REQUEST_URI']), 0, -2)) . '/';?>

<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js no-svg ie8"> <![endif]-->
<!--[if IE 9]>         <html class="no-js no-svg ie9"><![endif]-->

<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="utf-8">
        
        <base href="<?php echo $base_url;?>">

        <title><?php if( isset($title) ){ echo $title; } ?></title>
        <link href="dist/style.min.css" rel="stylesheet" type="text/css" media="screen">

        <!--Meta-->        
		<meta name="author" content="Jaco Mensink"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <!--Icons-->
        <link rel="shortcut icon" href="assets/images/icons/favicon.ico">
        <link rel="shortcut icon" href="assets/images/icons/icon57.png">
        <link rel="apple-touch-icon" href="assets/images/icons/icon57.png">
        <link rel="apple-touch-icon" sizes="72x72" href="assets/images/icons/icon72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="assets/images/icons/icon114.png">
        <link rel="apple-touch-icon" sizes="144x144" href="assets/images/icons/icon144.png">

        <!--Fonts-->
        
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <![endif]-->
        
   	</head>
	<body class="<?php if(isset($body_class)){ echo $body_class; }?>">
        <header class="main-header">
            <figure class="logo">
                <img src="assets/images/logos/logo.png" alt="Logo" title="logo">
            </figure>
            <nav class="main-menu">
                <ul>
                    <li><a href="#">Item 1</a></li>
                    <li><a href="#">Item 2</a></li>
                    <li><a href="#">Item 3</a></li>
                    <li><a href="#">Item 4</a></li>
                    <li><a href="#">Item 5</a></li>
                </ul>
            </nav>
            <nav class="mobile-menu">
                <ul>
                    <li><a href="#">Item 1</a></li>
                    <li><a href="#">Item 2</a></li>
                    <li><a href="#">Item 3</a></li>
                    <li><a href="#">Item 4</a></li>
                    <li><a href="#">Item 5</a></li>
                </ul>
            </nav>
        </header>