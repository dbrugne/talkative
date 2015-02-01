# talkative
Talkative is a jQuery plugin to roll pieces of text in an animated way.

Depends on jQuery 1.x.

##Usage

Load jQuery, the talkative plugin and the provided CSS file ``talkative.css``.

You should have a DOM element with ``data-toggle="talkative"`` and nested elements to roll:

```html
<div data-toggle="talkative">
    <span>tagada</span>
    <span>fruikipik</span>
    <span>schtroumpf</span>
    <span>croco</span>
    <span>dragibus</span>
</div>
```

And finally launch rotation:

```javascript
<script>
$(document).on('ready', function() {

    $(function () {
        $('[data-toggle="talkative"]').talkative({
            start: 2000,
            delay: 4000
        });
    });

});
</script>
``

## Options

Following options could be passed to the talkative function:

* selector: selector to find nested alternate element (default: *span*),
* start: delay before starting first rolling (in ms, default: *1000*),
* delay: delay between rotation (in ms, default: *4000*),
* animation_delay: duration of the animation, should be longer that ``delay`` (in ms, default: *1000*)

## About the original author
This was freely and happily made by Maaya for the donut.me team.
I put no licence on this, fork, change, use and do what you want.

Feel free to contact me for questions, thanks, or insults at maaya.code.dev@gmail.com (if any).
