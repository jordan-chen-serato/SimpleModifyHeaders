# Serato Firewall Header extension

Extension for Firefox and Chrome. Extends didierfred's SimpleModifyHeaders for internal use at Serato, allowing testers and developers to bypass the WAF when using a VPN.

## Installing dependencies

* Run `npm install`

## NPM scripts:

* `build:firefox`: Bundles and minifies the ES6 code (currently only serato-firewall-header.js), and creates a Firefox-specific manifest.json
* `build:chrome`: Bundles and minifies the ES6 code, and creates a Chrome-specific manifest.json
* `sign:firefox`: Executes the Firefox build process and then sends the add-on to Mozilla to sign as an unlisted add-on. If successful, an .xpi file will be downloaded to the web-ext-artifacts directory
* `lint`: Runs `web-ext lint`
* `test`: In Linux and MacOS, opens the Jasmine SpecRunner page, which executes the tests and displays their results. Doesn't actually return a non-zero exist code on test error/failure
* `test:windows`: Opens the Jasmine SpecRunner page in Windows
* `package:chrome`: Builds for Chrome, then zips the extension. Directories/files such as node_modules are excluded as they are either redundant or can cause errors and warnings when the extension is installed

## Further help and documentation

* See http://confluence.akld.serato.net:8090/x/XJSBBQ

# Forked from SimpleModifyHeaders V 1.6

Extension for firefox and chrome. (The extension can be install via [this link](https://addons.mozilla.org/fr/firefox/addon/simple-modify-header/) for firefox and via [this link](https://chrome.google.com/webstore/detail/simple-modify-headers/gjgiipmpldkpbdfjkgofildhapegmmic) for chrome)

The extension rewrite the headers based on a rules table. 

The extension can be start and stop via the button on the top right.

To save and apply the modification, you need to click on the save button.

It's possible to: 
-  export the configuration in a file (json format)
-  import the configuration from a file , it support the format of  the Modifyheaders plugin 

## Rules table
The rules table contains lines with the following parameters :
- action : add, modify or delete a header field
- header field name
- header field value 
- comment : a comment 
- apply on : "request" if the modification apply on the request headers or "response" if the modification apply on the response headers
- status : on if the modification is active , off otherwise 

## Url pattern
We can choose the urls on which the modifications applies by modifying the url pattern :  
- The url pattern must follow the syntaxe define by https://developer.chrome.com/extensions/match_patterns
- Putting an empty string on the field will select all urls
- It's possible to select mutliple url patterns using semicolon(;) separator
- It's not possible to define a specific port number https://stackoverflow.com/questions/11425591/match-port-in-chrome-extension-pattern

## Parameters
The parameters button permits to :
- Activate debug mode: show detail log messages in the extension debugging console of the browser.
- Show comments : show comments field on the config panel 
- Filter URL per rules : activate the possiblity to filter url for each rules on the config panel, the header field will be modify only if the url contains the configurated value.


## Firefox specific issue
According to the version of Firefox, the addition of a new header behaves differently. In the latest version, when you choose the "add" action and the header exist, it appends the value, while in the old version, it replaces it. If you want to modify an exiting header, you should use "modify" instead of "add"
  
## Extension permissions
In order to work, the following browser permissions are needed for the extension: 
- storage : needed to store the configuration and the rules
- activeTab, tabs : needed to show the configuration screen in the browser tab.
- webRequest,webRequestBlocking,<all_urls> :  needed to modify the headers according to the rules table. 
  
## License
The code is opensource under Mozilla Public License 2.0 




