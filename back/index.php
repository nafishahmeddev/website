<?php
global $conn, $system_techs;
include("config.php");
include("auth.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/css/uikit.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css">

    <link rel="icon"  href="/assets/images/n..svg">

    <script src="/js/uikit.js"></script>
    <script src="/js/uikit-icons.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <title>Projects</title>
</head>
<body class="uk-background-muted">
<div class="uk-container uk-padding">
    <h2>Projects</h2>

    <div>

        <?
        if(isset($_GET["save"]) && isset($_POST)){
            $conn->beginTransaction();
            try {
                $title = addslashes($_POST["title"]);
                $excerpt = addslashes($_POST["excerpt"]);
                $tech_text = addslashes($_POST["tech_text"]);
                $techs = @json_encode($_POST["techs"]);
                $url = addslashes($_POST["url"]);

                $target_dir = "uploads/";
                $thumb = $target_dir . rand(0,99999)."_".basename($_FILES["thumb"]["name"]);
                move_uploaded_file($_FILES["thumb"]["tmp_name"], $thumb);

                $stmt = $conn->prepare("INSERT INTO projects (title, excerpt, tech_text, techs, thumb, url) VALUES (?,?,?,?,?,?)");
                $stmt->execute([$title, $excerpt, $tech_text, $techs, $thumb, $url]);
                $conn->commit();
            } catch (Exception $err){
                $conn->rollBack();
            }

            ?>
            <script>
                alert("Successfully added project.");
                window.location.href = "index.php";
            </script>

            <?
        }
        if(isset($_GET["delete"])){
            $conn->beginTransaction();
            try {
                $_id = $_GET["delete"];

                $stmt = $conn->prepare("DELETE FROM projects WHERE _id=?");
                $stmt->execute([$_id]);
                $conn->commit();
            } catch (Exception $err){
                $conn->rollBack();
            }

            ?>
            <script>
                alert("Successfully deleted project.");
                window.location.href = "index.php";
            </script>

            <?
        }

        ?>
    </div>

    <div class="uk-grid-small" uk-grid>
        <div>
            <div class="uk-card uk-card-default uk-margin uk-card-body uk-width-medium">
                <form method="post" action="?save=save" enctype="multipart/form-data">
                    <div class="uk-margin-small">
                        <label>Title</label>
                        <input class="uk-input uk-form-small uk-border-rounded" name="title" required>
                    </div>
                    <div class="uk-margin-small">
                        <label>Excerpt</label>
                        <textarea class="uk-textarea uk-form-small uk-border-rounded" name="excerpt" required></textarea>
                    </div>
                    <div class="uk-margin-small">
                        <label>Tech Text</label>
                        <textarea class="uk-textarea uk-form-small uk-border-rounded" name="tech_text" required></textarea>
                    </div>
                    <div class="uk-margin-small">
                        <label>Techs</label>
                        <div>
                            <select class="uk-select uk-form-small uk-border-rounded select2" name="techs[]" multiple="multiple"  required style="width: 100%">
                                <?foreach ($system_techs as $tech){?>
                                    <option><?= $tech?></option>
                                <?}?>
                            </select>
                        </div>
                    </div>
                    <div class="uk-margin-small">
                        <label>Thumb</label>
                        <input class="uk-input uk-form-small uk-border-rounded" name="thumb" type="file"  required>
                    </div>
                    <div class="uk-margin-small">
                        <label>Url</label>
                        <input class="uk-input uk-form-small uk-border-rounded" name="url"  required>
                    </div>
                    <div class="uk-margin-small">
                        <button class="uk-button uk-button-primary uk-button-small uk-border-rounded" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="uk-width-expand">
            <div class="uk-card uk-card-default uk-margin uk-overflow-auto">
                <table class="uk-table uk-table-small uk-table-divider">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Thumb</th>
                        <th>Title</th>
                        <th>Excerpt</th>
                        <th>Tech Text</th>
                        <th>Techs</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?
                    $stmt = $conn->query("SELECT * FROM projects");
                    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    foreach($projects as $index=>$project){?>
                        <tr>
                            <td><?= $index+1?></td>
                            <td>
                                <a onclick="deleteProject(<?= $project["_id"];?>)" class="uk-text-danger">X</a>
                            </td>
                            <td><img src="<?= $project["thumb"];?>" style="width: 100px"/></td>
                            <td>
                                <?= $project["title"];?><br>
                                <a target="_blank" href="<?= $project["url"];?>"><small><?= $project["url"];?></small></a>
                            </td>
                            <td class="uk-text-small"><?= $project["excerpt"];?></td>
                            <td class="uk-text-small"><?= $project["tech_text"];?></td>
                            <td><?

                                $technologies =  json_decode($project["techs"])?:[];
                                foreach ($technologies as $technology){
                                    ?>
                                    <code><?= $technology?></code>
                                    <?
                                } ?>
                            </td>
                        </tr>
                    <?}?>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>

<script>
    $(document).ready(function() {
        $('.select2').select2();
    });

    function deleteProject(_id) {
        if(confirm("Are you sure want to delete this project?"))
            location.href=`?delete=${_id}`
    }
</script>
</body>
</html>
