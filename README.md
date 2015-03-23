# colorfinder
Color Finder Chrome Extension for UX Team

This is a Chrome extension ot help us find color variables and values a little more quickly.

On first run, you have to paste in a raw SCSS file with the color palette definitions you want to search. Once that's saved, the data will be ready for you.

###Instructions###

*To install:*
- Clone this repo or just download the `.crx` file.
- Drag the `.crx` file into Chrome Extension window (Window-->Entensions) and follow the dialogs to install it. 

*To load color data:*
- Find your color data SCSS file and open in a text editor. Most likely you will want the main red-carpet `_colors.scss` file.
- In Chrome, right-click (ctrl-click) on the extension's icon in the toolbar (top right of the window) to open the Options window.
- Paste the entire contents of the SCSS file into the text box and click the save button.
- Click the extension icon in the toolbar and try it out.

*Usage:*
- It filters the list with substrings, so...
  - "#" shows all colors with hex values
  - "red" shows all colors with "red" in the name or value
  
*Notes:*
- The parser isn't super smart, so it won't yet handle data with SASS rules and block comments in it.
- The parser is smart enough to handle inline comments and multiple variable assignments on the same line.
- You can also manually add color assignments in the options. Use this format: `$color_variable: #112233;`
- Self referencing assignments aren't evalutaed, so they won't have a color swatch.


###Next up###
- Fully evaluate self referencing variables
- Improve parsing to filter
  - SASS rules
  - Block comments
