
<?php $heroes = page('heroes')->children()->visible(); ?>
<article class="home-hero container-fluid">
	<?php foreach ($heroes as $hero): ?>
		<section class="hero-section row <?php echo $hero->type() ?> <?php echo $hero->color() ?>" style="<?php if ($image = $hero->images()->filterBy('filename', '*=', 'background')->first()) {
			echo "background-image: url(" . $image->url() . ")";
		} ?>" ?>
		<header class="hero-header col-xs-12 col-md-10 col-md-offset-1">
			<?php echo $hero->text()->kirbytext() ?>
		</header>
	</section>
<?php endforeach ?>
</article>
</main>
<script src="<?php echo kirby()->urls()->assets() ?>/js/hero-text-mask.js"></script>


