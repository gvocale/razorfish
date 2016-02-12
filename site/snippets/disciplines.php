<?php $disciplines = $page->images()->filterBy('filename', '*=', 'discipline') ?>

<section class="disciplines">
	<div class="disciplines-title">
		<?php echo $page->disciplines_text()->kirbytext() ?>
	</div>
	<ul class="disciplines-grid">
		<?php foreach ($disciplines as $discipline): ?>
			<li class="disciplines-tile">
				<div class="disciplines-tile-icon" style="background-image: url(<?php echo $discipline->url() ?>)">
				</div>
				<h4 class="discipline-name"><?php echo $discipline->discipline_name() ?></h4>
			</li>
		<?php endforeach ?>
	</ul>
</section>