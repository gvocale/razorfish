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
  tile-art-direction:
    label: Tile Art Direction
    type: radio
    options:
      color: Solid Color Background
      photo-text-top: Full Bleed Photo - Text Top
      photo-text-bottom: Full Bleed Photo - Text bottom
      split: Split Photo
    columns: 1
    width: 1/3
  bgcolor:
    label: Background Color
    type:  text
    default: 095af0
  invert:
    label: Text color
    type: checkbox
    text: Invert text color
    help: Invert the color of Headline and Eyebrow in case the background of the tile is bright.    