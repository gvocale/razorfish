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