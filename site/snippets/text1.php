



<section class="container-fluid text1">
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            <div class="text-container">
                <h1><?php echo $section->quote1()->kirbytext() ?></h1>
            </div>
        </div>
    </div>
</section>

<section class="container-fluid text2">
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            <div class="text-container">
                <h1><?php echo $section->quote2()->kirbytext() ?></h1>
            </div>
        </div>
    </div>
</section>

<section class="container-fluid text3">
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            <div class="text-container">
                <h1><?php echo $section->quote3()->kirbytext() ?></h1>
            </div>
        </div>
    </div>
</section>

<section class="container-fluid client1 " style="background-image: url(<?php echo $section->url() ?>/spotify.jpg)">
    <div class="row text">
        <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            <?php echo $section->client1()->kirbytext() ?>
        </div>
    </div>
</section>


<section class="container-fluid client2 " style="background-image: url(<?php echo $section->url() ?>/spotify.jpg)">
    <div class="row text">
        <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            <?php echo $section->client2()->kirbytext() ?>
        </div>
    </div>
</section>



<section class="container-fluid client3 " style="background-image: url(<?php echo $section->url() ?>/spotify.jpg)">
    <div class="row text">
        <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
            <?php echo $section->client2()->kirbytext() ?>
        </div>
    </div>
</section>
