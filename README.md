# js-task-ui
_A client app for the live WebSocket with the results of Premier League_

## Instructions

* **npm install**
* cd public & **bower install** 
* **gulp start** at the root level
* Open the browser at http://localhost:8088/ (_provided that the js-task Http Server  is already running_)

### Notes

* AngularJS was used as the front-end framework
* The build steps are simple; just install the back-end dependencies using **npm** and front-end dependencies using **Bower**. The rest is done via the **gulp start** task
* The **gulp start** will bundle the app commonJS modules using webpack. It will also concatenate and uglify the third party dependencies. Finally, it transpile and minify the **sass** file, run all the tests using the **karma test runner** and start the server.
* Other tools: **mocha** and **chai** for unit testing and **sinon-chai** for creating _spies_, _stubs_ and _mocks_
* **BEM Methodology** was used for css. 
* The design is **repsonsive** so the page can be viewed on a mobile phone, as well
* I haven't use **jsLint/jsHint** for this solution; However, I do add these tasks tho the gulp build process