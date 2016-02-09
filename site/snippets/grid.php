<?php $projects = page('projects')->children()->visible(); ?>
<section class="container-fluid grid">
    <ul class="grid">
        <?php foreach ($projects as $project): ?>
            <?php if ($background_image = $project->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
                <li class="grid-tile" style="background-image: url(<?php echo $background_image->url() ?>)">
            <?php else: ?>
                <li class="grid-tile" style="background-color: #<?php echo $project->bgcolor() ?>">
            <?php endif ?>
            <?php if($project->tile_art_direction() == 'color'): ?>
                <div class="grid-text-container color">
            <?php elseif($project->tile_art_direction() == 'photo-text-top'): ?>
                <div class="grid-text-container">
            <?php elseif($project->tile_art_direction() == 'photo-text-bottom'): ?>
                <div class="grid-text-container bottom">
            <?php else: ?>
                <div class="grid-text-container split">
            <?php endif ?>
            <?php if ($project->invert() == '1'): ?>  
                <p class="grid-eyebrow invert">
                    <?php echo $project->eyebrow() ?>
                </p>
                <h3 class="grid-headline invert"><?php echo $project->headline() ?></h1>
                <?php else: ?>
                <p class="grid-eyebrow">
                    <?php echo $project->eyebrow() ?>
                </p>
                <h3 class="grid-headline"><?php echo $project->headline() ?></h1>
            <?php endif ?>
            </li>
        <?php endforeach ?>
    </ul>
</section>
