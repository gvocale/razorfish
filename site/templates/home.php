<?php 

snippet('header');

foreach($pages->visible() as $section) {
  snippet($section->uid(), array('section' => $section));
}

snippet('footer');

?>