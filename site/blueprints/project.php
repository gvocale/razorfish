<?php if(!defined('KIRBY')) exit ?>

title: Project
pages: False
files: true
fields:
  title:
    label: Title
    type:  text
  eyebrow:
    label: Eyebrow
    type:  text    
  headline:
    label: Headline
    type:  text
  description:
    label: Description
    type:  textarea
  bgcolor:
    label: Background Color
    type:  color
    default: 095af0
  invert:
    label: Invert Headline / Eyebrow color
    type:  checkbox
    text: Yes.
    help: Invert the color of Headline and Eyebrow in case the background of the tile is bright.