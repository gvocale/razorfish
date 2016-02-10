<?php if(!defined('KIRBY')) exit ?>

title: Heroes
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
  text:
    label: text
    type:  textarea
  type:
    label: Type
    type: radio
    help: Select hero's type.
    options:
      project: Project
      quote: Quote
    columns: 1
    width: 1/3
  color:
    label: Color Combination
    type: radio
    help: Select tile's color combination.
    options:
      color1: Black h1 - Black p - White background
      color2: White h1 - White p - Black background
      color3: Black h1 - Black p - Green background
      color4: White h1 - White p - Red background
    columns: 1
    width: 1/3    