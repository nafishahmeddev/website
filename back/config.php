<?php
session_start();
$conn = new \PDO("sqlite:".__DIR__."/db.n") or die ("Database Error");

$system_techs = array_unique([
    "php",
    "mysql",
    "jquery",
    "html5",
    "css3",
    "android",
    "firebase", "php",
    "mysql",
    "jquery",
    "html5",
    "css3",
    "android",  "php",
    "mysql",
    "codeigniter",
    "android", "html5","css3",
    "php",
    "mysql",
    "wordpress",
    "javascript",  "html5",
    "css3",
    "php",
    "mysql",
    "jquery",
    "javascript","html5",
    "css3",
    "php",
    "mysql",
    "jquery",
    "javascript","css3",
    "html5",
    "mysql",
    "javascript",
    "php"
]);

