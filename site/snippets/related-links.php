<?php $projects = page('projects')->children()->visible(); ?>
<section class="container-fluid grid-container">
    <ul class="grid">
        <?php foreach ($projects->limit(3) as $project): ?>
            <li class="grid-tile <?php echo $project->color() ?> <?php echo $project->style() ?>">
                <div class="grid-tile-content">
                    <div class="grid-tile-text-container">
                        <p class="grid-eyebrow">
                            <?php echo $project->eyebrow() ?>
                        </p>
                        <h3 class="grid-headline">
                            <?php echo $project->headline() ?>
                        </h3>
                    </div>
                    <?php if ($background_image = $project->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
                        <div class="grid-tile-background" style="background-image: url(<?php echo $background_image->url() ?>)">
                        </div>
                    <?php else: ?>
                        <div class="grid-tile-background">
                        </div>
                    <?php endif ?>
                </div>
            </li>
        <?php endforeach ?>
    </ul>
</section>
<script src="<?php echo kirby()->urls()->assets() ?>/js/grid-blocks.js"></script>