# Angular Request Animation Frame

An angular factory useful to handle different rAF instances. This factory will store the ids of each one so you don't have to worry about it when you want to stop one.

## How to install

```
$ bower install angular-request-animation-frame
```

Include the module `requestAnimationFrame` into your app.


## How to Use

```
angular.module('myapp').directive('myDirective', function(rAF){
    return {
        link: function(scope, el, attrs){
            rAF.start('width', function(){
                var width = el.width();
                el.width( width++ );
            });

            scope.$on('someEvent', function(){
                rAF.stop('width');
            });
        }
    };
});
```