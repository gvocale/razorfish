
<link rel="stylesheet" href="./assets/css/main.css">

<?php $heroes = page('heroes')->children()->visible(); ?>
<article class="home-hero">

	<?php foreach ($heroes as $hero): ?>
		<section class="hero-section <?php echo $hero->type() ?>" style="<?php if ($image = $hero->images()->filterBy('filename', '*=', 'background')->first()) {
			echo "background-image: url(" . $image->url() . ")";
		} ?>" ?>
		<header class="hero-header">
			<?php echo $hero->text()->kirbytext() ?>
		</header>
	</section>
<?php endforeach ?>
</article>
</main>
<script src="<?php echo kirby()->urls()->assets() ?>/js/hero-text-mask.js"></script>


