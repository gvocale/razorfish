<section class="hero-video">
	<div class="hero-video-play-button"></div>
	<div class="hero-video-text-container">
		<?php echo $page->video_text()->kirbytext() ?>
	</div>
	<div class="hero-video-background" style="<?php if ($image = $page->images()->filterBy('filename', '*=', 'background')->first()) {
		echo "background-image: url(" . $image->url() . ")";
	} ?>"></div>
</section>