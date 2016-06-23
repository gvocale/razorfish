Sorry, I think this needs some extra work. My bad not explaining all intentions well enough.

Currently, in QA, the width of each .module-content is calculated in column with a formula like:
{code:java}
width: calc(100% / 12 * 6); // For a module that spans across 6 columns
{code}

This solution does not calculate the Gutters correctly and in some components columns may not align well.

Here is an example of the intended Grid: http://razorfish.tubedatabase.co/grid.html
The Green grid at the top is the one used across the prototype, using Flexbox.
The Red grid at the bottom is the one you could use if you want not to use Flexbox.

Any comparable solution is acceptable, but it needs to account for the Gutters correctly

*Characteristics of the global grid*
- The Grid has margin-left and margin-right of 10vw at all breakpoints.
- The Grid is divided in 4 column at $SM, 6 column at $MD, 12 column at $LG, $XL, $XXL.
- Each column has 1rem margin left and margin right (the "Gutters").

I use, across all the prototype, two main mixins:

*Mixin for the Grid / Container*
To counter balance the gutter of the first column and last column, the grid container has 1rem subtracted left and right.
This mixin is assigned to any Container (.module), if it is aligning to the global Grid.
{code:java}
@mixin grid-padding {
    padding-left: calc(10vw - 1rem);
    padding-right: calc(10vw - 1rem);
}
{code}


*Mixin for the Content*
I assign this mixin to any .module-content of a module that has to align to the global Grid. Each column has 1rem padding (or margin) left and right
{code:java}
@mixin component-margin {
    margin-left: 1rem;
    margin-right: 1rem;
}

@mixin component-padding {
    padding-left: 1rem;
    padding-right: 1rem;
}
{code}

_I use the one calculated in padding for rare situations in which I am already using the margin of .module-content for some other reason._


In QA, 10vw margin is assigned instead to the .content-module, while the container doesn't have any padding. As it is implemented now, any .module-content that is less then 12 column wide, will not align precisely to the grid, because the "gutter" (1rem left / right) is not calculated proportionally for the number of the columns.

In the prototype, I use a flexbox grid, so the calculation is cleaner. I also align horizontally / vertically .module-content using flexbox. For example, if I want a .module-content to be 8 column wide, I can say:
{code:java}
.module {
    width: 100%;
    @include grid-padding;
    .module-content {
        width: calc(100% / 12 * 8);
        @include component-padding;
    }
}
{code}


In QA, the main grid is not using Flexbox. The same behaviour can be archieved, but requires the gutter to be calculated in the width at each break point.

For example, let's .hero .module-content needs to be:
- $SM 4/4 columns
- $MD 6/6 columns
- $LG 10/12 columns
- $XL 8/12 columns
- $XXL 8/12 columns

The width of .hero .module-content will need to be:
{code:java}
@mixin col($content-col, $grid-col: 12) {
  width: calc(((80% - (2rem * (#{$grid-col} - 1))) / #{$grid-col} * #{$content-col}) + (2rem * (#{$content-col} - 1)));
}
.module.hero {
    .module-content {
        @include col(4,4);
        @media screen and ($md) {
            @include col(6,6);
        }
        @media screen and ($lg) {
            @include col(10,12);
        }
        @media screen and ($xl) {
            @include col(8,12);
        }
        @media screen and ($xxl) {
            @include col(6,12);
        }
    }
}
{code}

To break the above formula down:
- 80% is the width of the grid (100vw - 10vw margin-left - 10vw margin-right)
- (2rem * (#{$grid-col} - 1)) subtract all the gutters for the total number of columns the grid can contain at that breakpoint.
- (2rem * (#{$content-col} - 1)) adds the gutters for the number of columns the content takes

@include col(6,12);
This means the width of the module will be 6 column out of 12.


Suggested CSS
To conclude, to achieve the desired result and align .module-content correctly to the intended grid, the CSS for the hero is
{code:java}
.module.hero {
    .module-content {
        margin-left: calc(10vw);
        // Padding-bottom is fine, the previous styling can be left in place
        @include col(4,4);
        @media screen and ($md) {
            @include col(6,6);
        }
        @media screen and ($lg) {
            @include col(10,12);
        }
        @media screen and ($xl) {
            @include col(8,12);
        }
        @media screen and ($xxl) {
            @include col(6,12);
        }
        .hero-content {
            max-width: auto; // Remove the previosly set max-width to this div
        }
    }
}
{code}
A similar solution will need to be implemented to all other modules that sit on the grid. I guess I will need to open tickets separately for those.
