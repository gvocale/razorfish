<?php $projects = page('projects')->children()->visible(); ?>
<section class="container-fluid grid">
    <ul class="grid">
        <?php foreach ($projects as $project): ?>
            <li class="grid-tile <?php echo $project->color() ?> <?php echo $project->style() ?>">
                <div class="grid-text-container">
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
            </li>
        <?php endforeach ?>
    </ul>
</section>
