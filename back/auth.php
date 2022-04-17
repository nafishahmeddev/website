<?php
if(!isset($_SESSION["logged_in"])){
    if(isset($_POST["enter"])){
        $code = $_POST["enter"];
        if ($code==="OK"){
            $_SESSION["logged_in"]="OK";
            header("Location: index.php");
        }
    }
    ?>
    <form method="post">
        <input type="password" value="" name="enter">
        <button>Let me in</button>
    </form>

    <?php
    exit();
}
?>