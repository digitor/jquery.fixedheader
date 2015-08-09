# jquery.fixedheader
jQuery plugin for fixed position header that can change position on scroll

## Description 
Sometimes you have a 'sticky' header on a site, but it sits vertically below another header when you're scrolled to the top of the page.
You can change the `position` property to `fixed` or `absolute` based on a scroll event, but it causes a major DOM refresh and is a jarring experience.
To work around this, this plugin uses CSS transform's 'translateY' property and changes it as we scroll. 
Works fine in IE9+ and all good browsers.

## CSS
Assumes your element already has `position:fixed` CSS property.

## Development
Please beware, this plugin is in it's very early stages of development and hasn't been thoroughly tested yet.