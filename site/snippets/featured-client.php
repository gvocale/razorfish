<?php $project = page('featured')->children()->visible()->first(); ?>

<?php if ($background_image = $project->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
<section class="container-fluid featured-client" style="background-image: url(<?php echo $background_image->url() ?>)">
<?php else: ?>
<section class="container-fluid featured-client">
<?php endif ?>
	<div class="row">
		<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1">
			<div class="text-container">
				<h1><?php echo $project->headline(); ?></h1>
				<p class="featured-client-description">
					<?php echo $project->description(); ?>
				</p>
			</div>
		</div>
	</div>
</section>