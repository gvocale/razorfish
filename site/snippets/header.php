<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>
        <?php echo $site->title()->html() ?> |
            <?php echo $page->title()->html() ?>
    </title>
    <?php echo css('assets/css/main.css') ?>
        <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script src="<?php echo kirby()->urls()->assets() ?>/js/dump.js"></script>
        <script src="<?php echo kirby()->urls()->assets() ?>/js/jquery-visible.js"></script>
</head>

<body>
    <nav class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div id="logo" class="logo">
                    <img src="<?php echo kirby()->urls()->assets() ?>/images/razorfish-logo.svg" alt="" class="razorfish-logo">
                    <p class="global">Global</p>
                    <p class="test"></p>
                </div>
                <img src="<?php echo kirby()->urls()->assets() ?>/images/hamburger-icon.svg" alt="" class="hamburger-icon">
            </div>
        </div>
    </nav>
