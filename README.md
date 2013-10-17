# angular-confirm #

Angular directive to display a confirmation dialog before performing an action.

Bootstrap 2.x required to display a popover.

## Usage ##

```Javascript
var myapp = angular.module('myapp', ['ngConfirm']);
```

```HTML
<!-- Include jquery.js (required) -->
<script src="path/to/jquery.js"></script>

<!-- Include bootstrap.js (required) -->
<script src="path/to/bootstrap.js"></script>

...

<button ng-confirm="performAction()">Perform an action</button>
```

## TODO ##

+ Add unit tests.
+ Add example.
+ Document `is-active` option.
+ Remove dependency from jQuery, use angular-ui maybe.
+ Add support for more events besides `click`.