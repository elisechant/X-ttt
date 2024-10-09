# Roadmap

Immediate term plans of X Tic Tac Toe.

## Roadmap

### Product 

Product features we want to ship.   
 
* ↑↑ Game complexity - levels "easy" (current), "normal" or "hard" - We would like to know whether more complex games leads to more games being played.  
  * "hard" - use minimax AI decision algorithm
  * Run as ABC test
* Monetisation - Goal TBD 
  * Tasks TBD 
* Uplift game board UI, UX - We think that a cooler looking site will lead to more users, as we assume people will share it. 
  * Investigation: As animations are not stateful, can we simplify to improve performance?
  * Board elements as React components
  * Look and Feel uplift
  * Share link feature
* "Computer player" v2 - Goal TBD 
  * TBD
* "Live player" v2 - Goal TBD
  * TBD


### BAU

Technical things to do that don't change the product experience.

* ↑↑ Bug: Packages require --force to install
  * Requires significant bumping and re-platforming
  * Unable to bump React
  * Replace node-sass (deprecated)

* Bug: Socket is not working on local (or procedure is unclear)
* Bug: Production Heroku is down
* Bug: Contact form does not post
* Bug: Refreshing a game renders an empty screen 

* ↑↑ Feature flag infra
* ↑↑ Document system and end-to-end build procedure
* ↑↑ CI  
* ↑↑ Increase test coverage of user flows towards 85%
* Identify and address security vulnerabilities
* Config modernisation, replace ws_conf.xml
* Frontend stack modernisation, replace Ampersand
* Convert to TypeScript, resolve any type issues
* Automate Changelog management workflow
