<?php snippet('header');?>

<?php snippet('featured-quote');?>

<?php snippet('featured-client');?>

<?php $feed = page('feed')->children()->visible(); ?>

<div class="feed-grid-container">
	<?php foreach ($feed as $item): ?>
		<div class="feed-item-frame">
			<div class="feed-item bottom">
				<div class="feed-item-content">
					<p class="feed-item-eyebrow">
						<?php echo $item->eyebrow() ?>
					</p>
					<h3 class="feed-item-headline">
						<?php echo $item->headline() ?>
					</h3>
				</div>
                <?php if ($image = $item->images()->filterBy('filename', '*=', 'background')->sortBy('sort', 'asc')->first()): ?>
                    <div class="feed-item-background" style="background-image: url(<?php echo $image->url() ?>)">
                    </div>
                <?php else: ?>
                    <div class="feed-item-background">
                    </div>
                <?php endif ?>
			</div>
		</div>
	<?php endforeach ?>
</div>



<?php snippet('locations');?>        

<script src="<?php echo kirby()->urls()->assets() ?>/js/content-blocks.js"></script>
<?php snippet('footer');?>

