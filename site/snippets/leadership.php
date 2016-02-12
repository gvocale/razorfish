<?php $portraits = $page->images()->filterBy('filename', '*=', 'portrait') ?>

<section class="leadership">
	<div class="leadership-title">
		<?php echo $page->leadership_text()->kirbytext() ?>
	</div>
	<ul class="leadership-grid">
		<?php foreach ($portraits as $portrait): ?>
			
			<li class="leadership-tile">
				<div class="leadership-tile-text">						
					<h4 class="leader-name"><?php echo $portrait->leader_name() ?></h4>
					<div class="leader-divider-mask">
						<div class="leader-divider"></div>
					</div>
					<p class="leader-role"><?php echo $portrait->role() ?></p>										
					<p class="leader-office"><?php echo $portrait->office() ?></p>
				</div>
				<div class="leadership-tile-background" style="background-image: url(<?php echo $portrait->url() ?>)">
				</div>
			</li>
		<?php endforeach ?>
	</ul>
</section>