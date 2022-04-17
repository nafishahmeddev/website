<?

include  "vendor/autoload.php";
include("back/config.php");
global $conn, $system_techs;
$faker = Faker\Factory::create();
$message = [];
if(isset($_POST["send_message"])) {
    $to_email = "hello@nafish.me";
    $subject = "Enquiry from website";
    $message = "From:".$_POST["name"]."\n".
        "Email:".$_POST["email"]."\n".
        "Mobile:".$_POST["mobile"]."\n\n".
        $_POST["message"];
    $headers = 'From: hello@nafish.me';
    if(mail($to_email,$subject,$message,$headers)){
        $message = [
            "error"=>0,
            "message"=>"Successfully mail sent"
        ];
    } else{
        $message = [
            "error"=>1,
            "message"=>"Ops! something went wrong"
        ];
    }
}
?>
<html lang="en-gb">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/uikit.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.11.0/devicon.min.css">

    <link rel="icon"  href="assets/images/n..svg">

    <script src="js/uikit.js"></script>
    <script src="js/uikit-icons.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>

    <title>Nafish Ahmed - Full Stack Developer(ReactJS, ExpressJS & MySQL)</title>
</head>
<body class="body">
<section id="preloader"
         class="uk-position-fixed uk-height-1-1 uk-width-1-1 uk-position-top-left uk-background-muted uk-flex uk-flex-middle uk-flex-center uk-hidden" style="z-index: 99">
    <img src="assets/images/n..svg" style="height: 90px">
</section>
<video playsinline autoplay muted loop  style="height:100vh; width: 100vw; position: fixed; object-fit: cover; z-index: -1">
    <source src="assets/videos/banner.mp4" type="video/mp4">
</video>
<section  class="uk-section uk-section-large uk-position-relative  uk-flex uk-flex-middle banner">
    <div class="uk-container uk-container-small">

        <div class="uk-light">

            <img src="assets/images/n..svg" style="height: 80px">

        <h2 class="uk-heading uk-heading-small uk-text-bold">Hi I'm </h2>

            <h1 class="uk-heading uk-heading-xlarge uk-text-bold">Nafish Ahmed</h1>
        <p>
            I'm Nafish, a 23-year-old Indian Freelance Web developer. I'm a weird guy who likes making weird things with web technologies.
            I like to resolve design problems, create smart user interface and imagine useful interaction, developing rich web experiences & web applications.
            When not working or futzing around with code, I study how to escape from University. Actually for hire.
        </p>
        <p>Got any questions?
            <a class="uk-button uk-button-text uk-text-primary" onclick="document.querySelector('#contact').scrollIntoView()"> Contact me.</a></p>
        </div>
        <div class="uk-margin-top">


            <a class="uk-button uk-button-primary" href="http://resume.nafish.me" target="_blank">
                Download My Resume
                <span uk-icon="arrow-down"></span>
            </a>
        </div>
    </div>
</section>

<?
$projects = [
    [
        "title"=>"Shishu Suraksha",
        "description"=>"This is an android application of the Online Complaint Management System of the West Bengal Commission for Protection of Child Rights (WBCPCR).\nThrough this App, any individual or organisation can file complaint relating to violation of child rights virtually. Complainant can view status of his or her complaint. The complainant need not come to the office of WBCPCR for filing a complaint.",
        "technologies_text"=>"Sishu suraksha is bult on webview with some of android native features. On other hand php used for backend and Mysql as database.  The firebase is used to track analytical data, remote config and push notification.",
        "image"=>"assets/images/shishu-suraksha.png",
        "url"=>"https://play.google.com/store/apps/details?id=in.co.webtrackers.sishusuraksha",
        "technologies"=>[
            "php",
            "mysql",
            "jquery",
            "html5",
            "css3",
            "android",
            "firebase"
        ]

    ],
    [
        "title"=>"Medi Angels",
        "description"=>"Medi Angels is a android app to help people in the COVID pandemic situation  by providing Covid related medical consultancy services (medical help, oxygen, hospitalization advice, cremation/burial etc.), completely free of cost ",
        "technologies_text"=>"Medi Angels app build with android java and webview. Firebase is used to track analytical data, remote config and push notification. In backend Php is used MySQL is for database.",
        "image"=>"assets/images/medi-angels.png",
        "url"=>"https://play.google.com/store/apps/details?id=in.co.webtrackers.covidangels",
        "technologies"=>[
            "php",
            "mysql",
            "jquery",
            "html5",
            "css3",
            "android"
        ]

    ],
    [
        "title"=>"Furkan",
        "description"=>"Furkan is a android version of holy quran. It is developed to help people to read quran on the go in bengali language. It has also a special feature for searching any Surah or Ayat by related keywords.",
        "technologies_text"=>"Furqan is build with android java.  In backend Php is used MySQL is for database. Also used codeigniter4 framework in backend",
        "image"=>"assets/images/furkan.png",
        "url"=>"https://webtrackers.co.in",
        "technologies"=>[
            "php",
            "mysql",
            "codeigniter",
            "android"
        ]

    ],
    [
        "title"=>"Currys2go",
        "description"=>"Currys2Go is a pick-up service and delivery takes place at Laan van Vollenhove 2971, 3706 AK Zeist. The restaurant's specialties include Indian curry, tandoori, biryani, fish and vegetarian dishes. ",
        "technologies_text"=>"For frontend HTML, CSS, JS, JQuery is used and for backed used PHP and Wordpress",
        "image"=>"assets/images/currys2go.png",
        "url"=>"http://currys2go.nl/",
        "technologies"=>[
                "html5","css3",
            "php",
            "mysql",
            "wordpress",
            "javascript",
        ]

    ],
    [
        "title"=>"Cribs Day Nursery",
        "description"=>"Cribs day nursery is an Ofsted registered nursery which provides high quality childcare for babies sand young children from the ages of 0-5 years. We also provide an afterschool care session which go up to the age of 8..",
        "technologies_text"=>"For frontend HTML, CSS, JS, JQuery is used and for backed used Core PHP with custom cms.",
        "image"=>"assets/images/cribs.png",
        "url"=>"http://www.cribsdaynursery.com/",
        "technologies"=>[
            "html5",
            "css3",
            "php",
            "mysql",
            "jquery",
            "javascript",
        ]

    ],
    [
        "title"=>"Global Forum Consulting",
        "description"=>"The Global Forum Consulting Limited is a South London based Chartered Certified Firm of Accountants, which offers professional and affordable Accountancy and Information Technology & Security services.",
        "technologies_text"=>"For frontend HTML, CSS, JS, JQuery is used and for backed used Core PHP with custom cms.",
        "image"=>"assets/images/global.png",
        "url"=>"https://globalgorumconsulting.com/global_forum",
        "technologies"=>[
            "html5",
            "css3",
            "php",
            "mysql",
            "jquery",
            "javascript",
        ]

    ],
    [
        "title"=>"Ambinigma",
        "description"=>"Ambinigma is a ecommerce website which provides wood, gas, bioethanol products.",
        "technologies_text"=>"Opencart E-Commerce platform is used to develop the website. The website is built with PHP, HTML, CSS, JQuery",
        "image"=>"assets/images/ambinigma.png",
        "url"=>"https://store.ambinigma.pt",
        "technologies"=>[
            "css3",
            "html5",
            "mysql",
            "javascript",
            "php"
        ]

    ],
];

$section_class = ["uk-section-primary", "uk-section-secondary"];
$x=0;
foreach ($projects as $project){

    $class = $x%2?$section_class[rand(0,1)]:"uk-section-default";
    $class2 = $x%2?"uk-flex-first@m":"";
    $button_class = $x%2?"uk-button-default":"uk-button-secondary";
    ?>
    <section class="uk-section uk-section-large <?= $class?>" id="section_<?= $x+1?>">
        <div class="uk-container uk-container-small"  data-depth="0.2">
            <div class="uk-grid uk-child-width-1-2@m uk-margin-large uk-grid-large" uk-grid>
                <div class="">
                    <div>
                    <img src="<?= $project["image"]?>" class="uk-width-1-1"/>
                    </div>
                </div>
                <div class="<?= $class2?>" data-depth="0.6">
                    <h2 class="uk-text-primary"><?= $project["title"]?></h2>
                    <p><?= $project["description"]?></p>
                    <h3>Technologies</h3>
                    <p><?= $project["technologies_text"]?></p>

                </div>



            </div>
            <div class="text-xxl uk-text-center uk-margin-large uk-text-primary" style="letter-spacing: 0.4em">
                <?foreach ($project["technologies"] as $technology){?>
                <i class="devicon-<?=$technology?>-plain"></i>
                <?}?>
            </div>
            <div class="uk-text-center">
                <a class="uk-button <?= $button_class?>" href="<?= $project["url"]?>" target="_blank">
                    View Project Details
                    <span uk-icon="link"></span>
                </a>
            </div>

        </div>

    </section>
<?$x++;}?>

<?
$stmt = $conn->query("SELECT * FROM projects");
$projects = $stmt->fetchAll(\PDO::FETCH_ASSOC);
$x=1;
foreach($projects as $project){
    $class = $x%2?$section_class[rand(0,1)]:"uk-section-default";
    $class2 = $x%2?"uk-flex-first@m":"";
    $button_class = $x%2?"uk-button-default":"uk-button-secondary";
    ?>
    <section class="uk-section uk-section-large <?= $class?>" id="section_<?= $x+1?>">
        <div class="uk-container uk-container-small"  data-depth="0.2">
            <div class="uk-grid uk-child-width-1-2@m uk-margin-large uk-grid-large" uk-grid>
                <div class="">
                    <div>
                        <img src="back/<?= $project["thumb"]?>" class="uk-width-1-1"/>
                    </div>
                </div>
                <div class="<?= $class2?>" data-depth="0.6">
                    <h2 class="uk-text-primary"><?= $project["title"]?></h2>
                    <p><?= $project["excerpt"]?></p>
                    <h3>Technologies</h3>
                    <p><?= $project["tech_text"]?></p>

                </div>



            </div>
            <?if(json_decode($project["techs"])){?>
            <div class="text-xxl uk-text-center uk-margin-large uk-text-primary" style="letter-spacing: 0.4em">
                <?foreach (json_decode($project["techs"]) as $technology){?>
                    <i class="devicon-<?=$technology?>-plain"></i>
                <?}?>
            </div>
            <?}?>
            <div class="uk-text-center">
                <a class="uk-button <?= $button_class?>" href="<?= $project["url"]?>" target="_blank">
                    View Project Details
                    <span uk-icon="link"></span>
                </a>
            </div>

        </div>

    </section>

<?}?>
<section class="uk-section uk-section-large uk-section-secondary">
    <div class="uk-container uk-container-small uk-text-center">
        <h3>Technology I Use</h3>
        <div class="text-xxl uk-text-center" style="letter-spacing: 0.4em">
            <em class="devicon-jquery-plain colored  "></em>
            <em class="devicon-php-plain colored "></em>
            <em class="devicon-mysql-plain colored"></em>
            <em class="devicon-react-plain colored"></em>
            <em class="devicon-codeignitor-plain colored"></em>
            <em class="devicon-laravel-plain colored"></em>
            <em class="devicon-wordpress-plain colored"></em>
            <em class="devicon-android-plain colored"></em>
            <em class="devicon-firebase-plain colored"></em>
            <em class="devicon-codeigniter-plain colored"></em>
            <em class="devicon-nodejs-plain colored"></em>
        </div>

        <h3 class="uk-margin-large-top">I'm available for work, get in touch</h3>
        <a class="uk-button uk-button-text">nafish.ahmed.dev@gmail.com</a>

    </div>
</section>
<section class="uk-section uk-section-large uk-section-default" id="contact">
    <div class="uk-container uk-container-small ">
        <h3 class="uk-text-center">Let’s talk.</h3>
        <p class="uk-text-center">New projects, freelance inquiry or even a coffee.</p>

        <form method="post" enctype="multipart/form-data">
            <input type="hidden" name="send_message">
            <div class="uk-child-width-1-1" uk-grid>
                <div>
                    <label for="name">Name</label>
                    <input class="uk-input" name="name" id="name" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" class="uk-input" name="email" id="email" required>
                </div>
                <div>
                    <label for="mobile">Mobile</label>
                    <input type="number"  min="6000000000" max="9999999999" class="uk-input" name="mobile" id="mobile">
                </div>
                <div>
                    <label for="message">Query</label>
                    <textarea class="uk-textarea" style="min-height: 150px" name="message" id="message"></textarea>
                </div>
                <div class="uk-text-center">
                    <button type="submit" class="uk-button uk-button-primary">
                        Send Message <span uk-icon="arrow-right"></span>
                    </button>
                </div>
            </div>
        </form>

    </div>
</section>
<section class="uk-section uk-section-large uk-section-muted uk-hidden">
    <h3 class="uk-text-center">Web is fun.</h3>
    <p class="uk-text-center">Experiments & Open Sources</p>

    <div class="uk-container uk-container-large uk-margin-large">
        <div class=" uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-match" uk-grid>
            <?for ($y=0;$y<4; $y++){?>
                <div>
                    <div class="uk-card uk-card-default uk-card-hover uk-text-center">
                        <img src="https://source.unsplash.com/random/200x200" class=" uk-width-1-1">
                        <div class="uk-card-body uk-text-left ">
                            <h5 class="uk-margin-remove-bottom"><?= $faker->text(10)?></h5>
                            <p class="uk-margin-small-top"><?= $faker->text(40)?></p>
                        </div>
                    </div>
                </div>
            <?}?>
        </div>
    </div>
</section>

<section class="uk-section-muted uk-section uk-section-secondary"
         style="background-color: var(--color-secondary-dark)">
    <div class="uk-container-small uk-container uk-text-center">
        <a class="uk-button uk-button-text">hello@nafish.me &copy; Nafish Ahmed. All rights reserved.</a>
    </div>

</section>


<?if(!empty($message)){?>
<div id="message_modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-width-medium uk-text-center">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <span class="uk-text-<?=$message["error"]?"danger":"success"?>"><?= $message["message"]?></span>
    </div>
</div>
    <script>
        UIkit.modal("#message_modal").show();
    </script>
<?}?>

<script>
    window.onload = function (){
        setTimeout(()=>{
            document.querySelector("#preloader").style.opacity =0;
            setTimeout(()=>{
                document.querySelector("#preloader").style.display ="none";
            }, 250);
        }, 0);

    }
</script>


<div id="pointer"></div>
<div id="pointer_dot"></div>
<script>
    document.body.onmousemove = function (ev){
        setTimeout(()=>{


            document.querySelector("#pointer").style.left = ev.clientX;
            document.querySelector("#pointer").style.top = ev.clientY;
        }, 200);
        document.querySelector("#pointer_dot").style.left = ev.clientX;
        document.querySelector("#pointer_dot").style.top = ev.clientY;
    }
    document.body.onmousedown = ()=>{document.querySelector("#pointer").classList.add('pressed');}
    document.body.onmouseup = ()=>{document.querySelector("#pointer").classList.remove('pressed');}
</script>


</body>
</html>
