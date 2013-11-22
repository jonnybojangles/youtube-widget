Youtube Widget
===
Implement a single page that interfaces with the Youtube API (iframe or JS) as well as the
Youtube feed API and renders videos about Oculus VR using only JS, HTML & CSS.

## Example
<http://youtube.solidcobalt.com/> as of 20131121

## Requirements
- [x] Only a body tag. Make use of a templating engine
- [x] Show one video at a time
- [x] Navigation for different videos
- [x] Each nav item should show a thumbnail of it's video
- [x] Video should load dynamically, no change to the page's URL
- [x] Cache video data
- [x] Cross browser
- [x] No app dependent images
- [x] Have fun

## Like to do
- [x] Set up karma and Jasmine confs
- [-] Unit tests
- [x] Grunt build server for concatenation and magnification
- [-] Dependencies, package.json
- [ ] Use font awesome for great icons
- [!] Dependency load CSS
- [x] 16:9 iframe wrapper so there is no blink when the player loads
- [ ] slide in and out channel list for more video player real estate
- [ ] responsive if possible at the element level rather than window.
- [ ] Add a search bar
- [ ] User options like auto play
- [ ] Order videos by
- [ ] App script loader injects widget if no place holder is found
- [ ] Repair IDE's files watches to support SCSS
- [ ] Update or write own localstorage provider I would like to see expire dates built into the system (could be built into the key as well)
- [x] Added error CSS
- [ ] Added created with easter egg playlist
- [ ] Stringify the CSS and bring it in with JS to reduce server requests and repaint
- [ ] Add a transparent gradient or arrow-down under the scrollable video list side bar to alert the user that there are more videos should they not scroll first
- [ ] Add an active state (horizontal bar with small delta) to the current video, add a scroll to active video in the video list.

## Known issues
- [ ] localstorage is not set to expire ... search results may change since they were last cached resulting in duplicate videos in the list


