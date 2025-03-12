# Abbr plugin for tinyMCE in processwire

<strong style="color:green;">Works in TinyMCE6 and, after reading their plugin docs, will work in TinyMCE7</strong>

The html tag abbr is a pretty important one when it comes to accessibility, it allows screen readers to "tell" they are "reading" an abbreviation and, if it has a title attribute to "tell" what it means too\
Of course, it's also useful just for semantic html and lets you use css style(s) and generates a tooltip (with or without js like any title attribute)

## Installation

installation works exactly like my little [pw-tinymce-div-plugin](https://github.com/virtualgadjo/pw-tinymce-div-plugin) if you want to see scrennshots of the how to

to install it in pw, simply put the js file where you want, e.g. /site/modules/tiny/abbr.js or /site/templates/script/abbr.js  (well, actually, wherever you want)\
then go to modules -> configure -> InputfieldTinyMCE and add the file path in the External plugin files textarea and save

afterwards, you'll be able to enable the plugin to any tinyMCE field you want and add it to the toolbar (using the select list or simply writing its name (abbr) in the input and hit enter)\
you should then see a new (Abbr) button in your field toolbar

to use it, just select an abbreviation/acronym in the text content, hit the button, fill the dialog input or leave it empty and hit submit

if filled you'll get something like this in your html
```
<abbr title="The abbreviation full meaning">TABBR</abbr>
```
and you'll get the tooltip\
if left empty you'll just get
```
<abbr>TABBR</abbr>
```
wich is already better than nothing :)

## <span style="color:red; text-transform: uppercase;">Important</span>

If you plan to rely on the browsers native behaviour just leave this line (30)
```
editor.insertContent(`<abbr title="${data.fulltxt}">${cnt}</abbr>`);
```
as it is but you can also add a custom attribute if you need it for some custom js too
```
editor.insertContent(`<abbr title="${data.fulltxt}" data-title="${data.fulltxt}">${cnt}</abbr>`);
```
just remember not to remove the genuine title attribute which is the only really accessible one here except if you want to get rid of the default browser tooltip behaviour while staying fully accessible\
in this case change the line to
```
editor.insertContent(`<abbr aria-label="${data.fulltxt}">${cnt}</abbr>`);
```
with the **aria-label** attribute which is considered even more accessible than the title one

### CSS tip

i'm sure you know that every browser can behave its own way to visually tell your visitor there is an abbr, somme even do nothing, thus you can be the boss with this kind of simple trick to show the abbr's and those having a title\
i personally always use sass/scss and css vars but once compiled here is the idea :)

```css
abbr {
	text-decoration      : underline dotted green 3px;
	text-underline-offset: 3px;
}

/**
 * if there is a title or any attribute you've used
 * could be abbr[aria-label] for example
 * the same selectors are available in js if needed
 */
abbr[title]::after {
	content             : '?';
	padding-inline-start: .1em;
	font-size           : .8em;
	vertical-align      : .3em;
}
```

---
Obviously, you can modify the plugin to do the same kind of thing with any html tag you want with the attribute of your choice

as usual do whatever you want with this and if ever you needed any help to play around with it, just tag me in procewwire forum, i'll see it and try to help
