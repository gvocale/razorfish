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
  style:
    label: Tile Style 
    type: radio
    options:
      color: Solid Color Background
      photo-text-top: Full Bleed Photo - Text Top
      photo-text-bottom: Full Bleed Photo - Text bottom
      split: Split Photo
    columns: 1
    width: 1/3
  color:
    label: Color Combination
    type: radio
    help: Select tile's color combination.
    options:
      color1: Green - Black - White
      color2: Green - White - Black
      color3: White - Black - Green
      color4: Black - White - Red
    columns: 1
    width: 1/3