# typetrack. chat application - Final Project

Today, we're presenting our brand new chat application : typetrack.
Inspired by Keybase & Discord, it aims to be a convivial yet luxury chatting app.

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/adaltas/ece-webtech-2021-fall.git webtech
  cd webtech/courses/webtech/project
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignores the `dex` folder.
* Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```
## Authors

Kellian COTTART : 
* email : kellian.cottart@edu.ece.fr
* linkedin : https://www.linkedin.com/in/kellian-cottart-2aa0ba194/

Yann MESSALATI : 
* email : yann.messalati@edu.ece.fr
* linkedin : https://www.linkedin.com/in/yann-messalati-51519a20a/

## Tasks

Project management

* Naming convention   
  
  We used camel case as naming convention, which seems the most used in React : 
  - Components as `Component.js`
  - Default exports as `export default Component`
  - Functions & variables as `myFunction` & `variable`
 
  Source : https://en.wikipedia.org/wiki/Camel_case
  
  Points : 2/2
  
* Project structure   
  
  The project is stuctured using folders by group of components.
  
  - Channels components are stored in `channel` folder
  - Themes are stored in `themes`
  - Special effects such as special hovers are stored in `effects`
  - Icons are stored in `icons`
  - Component such as settings or welcome page are stored in `misc`
  
  Points : 4/4
  
* Code quality   
  
  ESLint has been implemented, as well as prettierEslint.
  
  - Code is properly idented using prettierEslint
  - We are using PropsTypes to validate our data used in functions.
  - Line spacing is respected
  - The code is commented as much as we could
 
  Points : 4/4
  
* Design, UX   
  
  We were inspired by Keybase, Discord and Typhora for themes and look&feel. 
  
  We managed to have a very comfy look, making the user feel at home, with nice sets of colors and themes. 
  
  - Simple but efficient design
  - Nice colors
  - Everything is one or two clicks away
  - Responsive : It has been thought for mobile usage as well 
  
  Points : 4/4
  
* Git and DevOps   
  
  - Linter has been implemented to check the parameters of functions & components
  - We're using GitKraken to manage our git, branching whenever we want to implement a new fonctionnality
  - We're rebasing main onto each working functionnality instead of using merge, because sometimes fonctionnalities are lost
  
  Points : 2/4 (wip)
  
Application development

* Welcome screens   
  
  We prototyped our login screen using Adobe XD. 
  
  We went along with a luxury chat application, using gold & black to bring out a "feel good experience".
  We're trying to give a "drinking a coffee or a tea" vibe, with a call-to-action designed to be a unique experience. 
  
  Points : 2/4 (wip)
  
* New channel creation   
  *place your graduation and comments*
* Channel membership and access   
  *place your graduation and comments*
* Ressource access control   
  *place your graduation and comments*
* Invite users to channels   
  *place your graduation and comments*
* Message modification   
  *place your graduation and comments*
* Message removal   
  *place your graduation and comments*
* Account settings   
  *place your graduation and comments*
* Gravatar integration   
  *place your graduation and comments*
* Avatar selection   
  *place your graduation and comments*
* Personal custom avatar   
  *place your graduation and comments*

## Bonus

*place your graduation and comments*
