Sorry, I think this needs some extra work. My bad not explaining all intentions well enough.

*Characteristics of the global grid*
- The Grid has margin-left and margin-right of 10vw at all breakpoints.
- The Grid is divided in 4 column at $SM, 6 column at $MD, 12 column at $LG, $XL, $XXL.
- Each column has 1rem margin left and margin right (the "gutter").

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
.module.hero {
    .module-content {
        width: calc(((80% - (2rem * (4 - 1))) / 4 * 4) + (2rem * (4 - 1)));
        @media screen and ($lg) {
            width: calc(((80% - (2rem * (6 - 1))) / 6 * 6) + (2rem * (6 - 1)));
        }
        @media screen and ($lg) {
            width: calc(((80% - (2rem * (12 - 1))) / 12 * 10) + (2rem * (10 - 1)));
        }
        @media screen and ($xl) {
            width: calc(((80% - (2rem * (12 - 1))) / 12 * 8) + (2rem * (8 - 1)));
        }
        @media screen and ($xxl) {
            width: calc(((80% - (2rem * (12 - 1))) / 12 * 6) + (2rem * (6 - 1)));
        }
    }
}
{code}

To break the above formula down:
- 80% is the width of the grid (100vw - 10vw margin-left - 10vw margin-right)
- (2rem * (12 - 1)) subtract all the gutters for 12 columns
- (2rem * (6 - 1)) adds the gutters for 6 columns (in case the width has to be 6 out of 12 columns)


To conclude, to achieve the desired result and align .module-content correctly to the intended grid.