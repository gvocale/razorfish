<input type="checkbox" id="navigation-checkbox" >
<label for="navigation-checkbox" id="navigation-overlay-container">
    <nav class="navigation-overlay-content" role="navigation">
      <ul>
        <?php foreach($site->children()->visible() as $item): ?>
            <li class="navigation-overlay-link-container">
                <a class="navigation-overlay-link<?php e($item->isOpen(), ' active') ?>" href="<?php echo $item->url() ?>"><?php echo html($item->title()) ?>
            </a>
        </li>
    <?php endforeach ?>
</ul>
</nav>
</label>

<section class="navigation">

    <div class="navigation-container">
        <div class="navigation-logo-container">
            <img class="razorfish-logo" src="<?php echo kirby()->urls()->assets() ?>/images/razorfish-logo.svg" alt="" >
            <span class="navigation-global">Global</span>
        </div>
        <label for="navigation-checkbox" class="hamburger-container">
            <div class="hamburger"></div>
        </label>
    </div>

</section>
<script src="<?php echo kirby()->urls()->assets() ?>/js/show-hide-header.js"></script>