<?php $featured_quote = page('quote'); ?>

<section class="container-fluid featured-quote">
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-1">
            <div class="text-container">
            <?php echo $featured_quote->text()->kirbytext(); ?>
            </div>
        </div>
    </div>
</section>