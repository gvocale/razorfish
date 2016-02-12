<?php 

$related_large_top = page('projects')->children()->filterBy('Style', "photo-text-top")->visible();
$related_large_bottom = page('projects')->children()->filterBy('Style', "photo-text-bottom")->visible();
$related_large = new Pages();
$related_large->add($related_large_top)->add($related_large_bottom);

$thought_leadership = page('projects')->children()->filterBy('Title', "Thought Leadership")->first();

$partecipatory_marketing = page('projects')->children()->filterBy('Title', "Partecipatory Marketing")->first();

$related_split = page('projects')->children()->filterBy('Style', "split")->visible()->shuffle()->first(); 
?>

<section class="related">
    <ul class="related-grid">
            <li class="related-tile <?php echo $thought_leadership->color() ?> <?php echo $thought_leadership->style() ?>">
                <div class="related-tile-content">
                    <div class="related-tile-text-container">
                        <p class="related-eyebrow">
                            <?php echo $thought_leadership->eyebrow() ?>
                        </p>
                        <h3 class="related-headline">
                            <?php echo $thought_leadership->headline() ?>
                        </h3>
                    </div>
                    <?php if ($background_image = $thought_leadership->images()->sortBy('sort', 'asc')->first()): ?>
                        <div class="related-tile-background" style="background-image: url(<?php echo $background_image->url() ?>)">
                        </div>
                    <?php else: ?>
                        <div class="related-tile-background">
                        </div>
                    <?php endif ?>
                </div>
            </li>
        
            <li class="related-tile <?php echo $partecipatory_marketing->color() ?> <?php echo $partecipatory_marketing->style() ?>">
                <div class="related-tile-content">
                    <div class="related-tile-text-container">
                        <p class="related-eyebrow">
                            <?php echo $partecipatory_marketing->eyebrow() ?>
                        </p>
                        <h3 class="related-headline">
                            <?php echo $partecipatory_marketing->headline() ?>
                        </h3>
                    </div>
                    <?php if ($background_image = $partecipatory_marketing->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
                        <div class="related-tile-background" style="background-image: url(<?php echo $background_image->url() ?>)">
                        </div>
                    <?php else: ?>
                        <div class="related-tile-background">
                        </div>
                    <?php endif ?>
                </div>
            </li>
        
                        <?php foreach ($related_split->shuffle()->limit(1) as $tile): ?>
            <li class="related-tile <?php echo $tile->color() ?> <?php echo $tile->style() ?>">
                <div class="related-tile-content">
                    <div class="related-tile-text-container">
                        <p class="related-eyebrow">
                            <?php echo $tile->eyebrow() ?>
                        </p>
                        <h3 class="related-headline">
                            <?php echo $tile->headline() ?>
                        </h3>
                    </div>
                    <?php if ($background_image = $tile->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
                        <div class="related-tile-background" style="background-image: url(<?php echo $background_image->url() ?>)">
                        </div>
                    <?php else: ?>
                        <div class="related-tile-background">
                        </div>
                    <?php endif ?>
                </div>
            </li>
        <?php endforeach ?>
    </ul>
</section>
<!-- <script src="<?php echo kirby()->urls()->assets() ?>/js/grid-blocks.js"></script> -->