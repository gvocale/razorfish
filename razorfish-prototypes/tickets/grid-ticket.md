Sorry, I think this needs some extra work. My bad not explaining all intentions well enough.

*Characteristics of the global grid*
- The Grid has margin-left and margin-right of 10vw at all breakpoints.
- Is divided in 4 column at $SM, 6 column at $MD, 12 column at $LG, $XL, $XXL.
- Each column has 1rem margin left and margin right.


To counter balance the 1rem margin-left of the first column, and 1rem margin-right of the last column, the grid container has to have:
{code:java}
    padding-left: calc(10vw - 1rem);
    padding-right: calc(10vw - 1rem);
{code}


I use, across all the prototype, two main mixins (sorry I only mentioned one mixin before):

*Mixin for the Grid / Container*
This mixin is assigned to any container of a module that has to align to the global Grid. It gives the 10vw margin, but subtract 1rem each side.
{code:java}
@mixin grid-padding {
    padding-left: calc(10vw - 1rem);
    padding-right: calc(10vw - 1rem);
}
{code}


*Mixin for the Content*
I assign this mixin to any content-module of a module that has to align to the global Grid. Each column has 1rem padding (or margin) left and right
{code:java}
@mixin component-padding {
    padding-left: 1rem;
    padding-right: 1rem;
}

@mixin component-margin {
    margin-left: 1rem;
    margin-right: 1rem;
}
{code}
_I have one calculated in padding, and one calculated in margin, because some times I'm already using the margin of a particular component in some other way, or vice versa._


Across the website, to align all the components that sits in the Grid, we need to have a similar mixin (grid-padding) assigned to the container, and a similar mixin (component-padding) assigned to the content.

In QA, 10vw margin is assigned instead to the content-module, while the container doesn't have any padding. I think this solution won't work, because it will make it impossible to align easily a container of X amount of column (let's say 8 column) to the grid, since the gutter will not be calculated correctly for all those 8 columns.

In the prototype, if I want a .module-content to be 8 column wide, I can say:
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


*Suggested CSS*

*Hero*