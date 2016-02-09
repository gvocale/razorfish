<?php $projects = page('projects')->children()->visible(); ?>



<section class="container-fluid grid">
    <ul class="grid">
        <?php foreach ($projects as $project): ?>
            <?php if ($background_image = $project->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
                <li class="grid-tile col-xs-6" style="background-image: url(<?php echo $background_image->url() ?>)">
                <?php else: ?>
                <li class="grid-tile col-xs-6" style="background-color: #<?php echo $project->bgcolor() ?>">
            <?php endif ?>
                <?php if ($project->invert()->bool()): ?>
                <div class="grid-text-container-inverted">
                <?php else: ?>
                <div class="grid-text-container">
                <?php endif ?>
                    <p class="grid-eyebrow"><?php echo $project->eyebrow() ?></p>
                    <h3 class="grid-headline"><?php echo $project->headline() ?></h1>
                    </div>
                </li>
        <?php endforeach ?>
    </ul>
</section>
