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
  
  We used camel case as naming convention, which seemed the most commonly and widely used in React : 
  
  - Components as `Component.js` following the component naming standard for React components.
  
  - Default exports as `export default Component`.
  - Functions & variables as `myFunction` & `variable` following the camel case convention for in-components elements.
  
  Source : https://en.wikipedia.org/wiki/Camel_case
  
  Points : 2/2
  
* Project structure   
  
  The project is stuctured using folders by group of components in the front-end. We separated components as much as possible for understandability.
  
  
  
  The arborescence is as follows:
  
  - Channels components are stored in `channel` folder, which is subdivided in three folders:
    - `fonctionnalities` which is composed of all channels fonctionnalities such as modifying channel name, joining, creating or deleting a channel.
    - `messages` which is composed of a `fonctionnalities` folder which holds the components that handle message deletion or modification.
    - `users` which holds the components for showing the authenticated user, as well as showing the channel users.
  - `Context` which is composed of the context provider.
  - Settings components are stored in `settings` folder, composed of `tabs` for each sub-settings categories.
  - Themes are stored in `themes`, with their own previews for the user to know which colors are used in the theme.
  - Special effects such as special hovers are stored in `effects`.
  - Components such as the error alerts, home, welcome and 404 pages are stored in `misc`.
  
  Points : 4/4
  
* Code quality   
  
  ESLint has been implemented, as well as prettierEslint as dev-dependencies. They allow for formatted code and better usage of VSCode. They have been parametered for React, and used accordingly.
  
  - Code is properly idented using prettierEslint.
  - Line spacing is respected through the use of VSCode prettierEslint.
  - We are using PropsTypes to validate our data used in functions.
  - The code is commented as much as we could.

  Points : 4/4
  
* Design, UX   
  
  We were inspired by Keybase, Discord and Typhora for the general look & feel. 
  
  We managed to have a very comfy look, making the user feel at home, with nice sets of colors and themes. The CSS has been thought over for a better day-to-day use, and a professionnal result. 
  
  - Simple but efficient design.
  - Nice set of colors.
  - Everything is one or two clicks away.
  - Responsive : It has been thought for mobile usage as well.
  
  Example of Adobe XD Design: 
  
  ![img](https://lh5.googleusercontent.com/eOp7enStXeaimWVTAPx7YZh5AZsT5uV3r9weNBdKsO17mC1N1l8AbmnFaS34glBHUEPOKNsY0EYH72QHTnN-te6p6yhbMFeePip1UduCpH2zO7uyrNw-6bcejFRCmu2s6L7wi_o7)
  
  The final render: 
  
  ![img](https://lh6.googleusercontent.com/etErJx3vXj_2BSTZ3v6-xf7bep-0TWq_6pybTlQi5U8kyWtCBP-U5NQ_fzY6HvEyH-pT4OgcUkcdjZbaEH_bx0kLe2LGCRmlMKwbu041Y35Oy09pJ192D912Y5QxuNgek8uxIWgx)
  
  It looks similar, but it has been redesigned considering the possibilities, and what we thought was best.
  
  Points : 4/4
  
* Git and DevOps   
  
  - Linter as well as PropTypes have been implemented to check the parameters of functions & components, making sure every variable is used, and every parameter is well-used.
  - We're using GitKraken to manage our git, branching whenever we want to implement a new fonctionnality.
  - We're rebasing main when we implement breaking functionnalities, and merging it when we are adding new ones that don't break anything.
  - We have implemented CI by using GitHub Actions on our tests (we have about 33 tests).
  
  Example of GitHub Actions:
  
  ![img](https://lh5.googleusercontent.com/SGrn5-Mpc-Pk4g_vVgUF-arHLPt4D6LH4xshFS4MMkw6MA9DuJ-HbeogJWAL7cFuIgdxw5d4cpIHU-irWbcSPtm9xl7soW4tFy2wBLPO4p00o5kuf2KmwVt_tq3GStoKf7-e3Njk)
  
  For each feature, we created a new branch named `feat-feature` to know what we were doing.
  
  ![img](https://lh6.googleusercontent.com/8qWbzfs6y3n9GocF7YhnvkiqL7EGo3YaNzFQS6lXtTnMzF-27c99tmVjc79iL8a3uYc-HRwwp6od-e29uHKqqRZcSI88T867-og0AVc1bIYAZznMK3ExWzDUNUuTn8wXcoKkTFKf)
  
  Points : 4/4 
  
  **TOTAL:  18/18**

Application development

* Welcome screens   
  
  We prototyped our login screen using Adobe XD. 
  
  We went along with a luxury chat application, using gold & black at first to bring out a "feel good experience". We're trying to give a "drinking a coffee or a tea" vibe, with a call-to-action designed to be a unique experience. 
  
  We were trying to create a brand which was both pleasant and enjoyable. We have some hover effects on the icons to make them feel more organic and interractive.
  
  Start screen (before login):
  
  ![img](https://lh3.googleusercontent.com/9wJa5uEdUvNCJb5XSir-2bzsZ9p3tggT-U3mmNm2s2HQPXOTjwKFvILTF7he-hVUBd7GRvkhKgu1EVC1QifKORumDOzHuztLbhNDKbd_6yDZqWLMzLSp41pnVmjDWXk-ACP_qE2f)
  
  Home page (after login):
  
  ![img](https://lh4.googleusercontent.com/dG0GzEhluux5kcY6CDESGih4Do-0lv1fm1XtrDgmfSsrt3ytzmFZoSHrxySuzChE1SdhQDYIwfjL3INxnD4wcjWgeIEWc_npOp9njtGBjtXh6G3JtTlQHiHHQd7JX_eykQ4n6eMD)
  
  Points : 4/4
  
* New channel creation   
  
  We create a channel by clicking the "Add a channel" button that you can see on the previous screen. It displays a dialog that allow for the input of a channel name, that cannot be empty. To cancel the form, simply click outside of the dialog to close it. As soon as we click on create, the channel is persisted into the database.
  
  Create a new channel:
  
  ![img](https://lh6.googleusercontent.com/RzFE9ZVLmoGAEw4a9mIMM0FSmYK7F__CbzFE6vCsYwrucrDnj8bNry5CEX_t93exHMpX5-K8tTznmDk5HDcIXDopyGHUDWnVnjizfNbv4f-bQClIrQj6H_h39VdCX-9I7IWCk-Pw)
  
  If you decide that you are no longer satisfied with your channel name, there is a pen icon to rename it if you own the channel.
  
  Edit button:
  
  ![img](https://lh5.googleusercontent.com/e7tNx4RFv7TbJE2CoukyMWdqKE-5nYCevcXXrm8P5r464EFIOiRdXrhWQmDUTA4CGN4co6YVXXX2-aMEr8r4cWSrT0YU-FxzaXHYSWZ2H2EUKkkGSgq8Crqy6SjVcL62GvnVkUA6)
  
  Points : 6/6
  
* Channel membership and access  

  Each time we try to do a request on the back-end, we check for the oauth access token using a header in the request. Of course, we implemented the authentication function in the back-end.

  Example of header:

  ![img](https://lh3.googleusercontent.com/ZKZKoWbcNraLEsN3sdw6E1yX6ObT9EyJTKieTNMYdwtPHr2RlSzzM5mWXwltV1OIE8ZhslQngGBfvpU4POjS7KVkae-fLNvJBL1Q5Tl5owCCge90cZCBl6tcJqShOJ2eQ2ujXycQ)

  Example of the authenticate function implementation in `app.js`: 

  ![img](https://lh6.googleusercontent.com/4Kh1GTfF6SpaapA2irVn2nyJ7M7BdY0BCCY-KX2F1yZ6h_v4eJQE64ZcRb3L2db5DgxocE6hSGp-VXIAc_qJidfwLJgs170HGNdRvswJ-e_p7-pukuHtA7lx7rEYL3CmVEJ4-kco)

  The user is also naturally inserted into the database if he doesn't exist after oauth. If he does exist, we simply say notice in the console that the user is already in the database with a 403 forbidden answer, as the user is already in the database.

  Points : 4/4

* Resource access control   

  Obviously, the application returns only the channels which the user created or joined. For this, we use a channel array inside every user to know which channels to display. This array is updated whenever we create or join a new channel, or that we delete one. 

  Each request to the back-end is encapsulated in a try and catch block, allowing for displaying different status in case an error is thrown, if we tried to call the API with wrong parameters.

  We did the same in the last part, using 403 Forbidden when we tried to create an already existing user, but we also do it when we don't have authentication, by showing a 401 status, and showing a 404 status when a request doesn't exist. 

  Example of API status usage:  

  ![img](https://lh6.googleusercontent.com/NRsthgHua9_X5XphJhLBUATApCmDanzYw5_jX4Ed5IASEEm72nYeMb84buNpnRJwP0HIU7r6_DeC7-A7PPuPhuDnCmwWf-F2jN9_wUzTmpnPpkvmUru81pVu_oZaRhjlFLMLzFNa)

  This resource access control is illustrated by the fact that we often call an error alert component, showing the user what bad things he tried to do, such as trying to create a nameless channel, which throws an error, caught and display as an alert.

  Points : 4/4

* Invite users to channels   

  Each channel possesses a share icon:

  ![img](https://lh4.googleusercontent.com/HPeyabXljv69vj1A9BE2CIisRZUZ-y5XFUuqIiyfh1Wxwb-I8eFis8Uunw1xpCi9yqFEWPUkUrXw3N4LKqUNk6hfZdYZ22nlMfd6-AYSXH3ON0MkVCV2YPcFTrLMBnwkjL5tqigh)

  On click, it display the link to join another channel. You can copy the link by clicking the copy-to-clipboard icon.

  Share link:

  ![img](https://lh4.googleusercontent.com/nMk9rd54fxhpWbb-pf1RB5WpoOEMscWY3RbXyX9Y4HyxxNou_Sofde9KR4pBaTEKmHmPkGA9Copw0RenP9aepbVpjVi5QD2ySqy2FLjUCnEs4e63FE39OSEWKzZsm_wkxTwaWdRp)

  By entering this link into the add channel section, you can join an existing channel:

  ![img](https://lh5.googleusercontent.com/JkDPtvhjHtuH2Qf1k_yT0ndG8VPBb8A12G2ZMtW6me2_lajGVNQqssmfsjgPrbtD4F3fwa2Kkpj42pmIovivJbFGAIB6RmEVPEsavIltHahX3k8CIjGRoQJupH6Qbkyv3TDqrX_q)

  Join page:

  ![img](https://lh4.googleusercontent.com/GcrIe3wtMmzqPcCoyTNhRNj4__pgfxDtbts84E2X5pRQ7BG0Hb9h0p0jOjVILKXFxforEV_krgOSDCRHc4XkQGZXNdw5SS0-K1nZEO33V0CGy_WaFRKAi9IJIw9JpuxadiyPeQS2)

  Of course, if you created the channel, or if you already have joined the channel, a little error will display.

  ![img](https://lh5.googleusercontent.com/ZXeCaj6k9gqtjcXJqwDikraXTKtvIKqNC9sn6JsRzUEgOUKNaq7ohCHi4F9PO9d_foVDICqWzFVpZ-ZyqxSKGeQbOleUH-qwF0mklHTUZhQd_TckU4lJK03JtUeTNnNhm186Xp7M)

​		Points: 6/6

* Message modification   

  When you hover one of your message, there is a hover effect that tells you that it is your message. This hover effect doesn't appear on other people's  messages.

  Once you are on one of your messages, right click on it and a menu will display:

  ![img](https://lh3.googleusercontent.com/NUD5u3bbWYWpdJk0aCDR2bbmN1Aki5cDzkwfjkqElvbZdxPXBCpgH4iJDCg_OJgEulFg-mkcFY1rAa1W_R-Sc1E0F9QRV3rr3NGX6mN5q9FBHA5nAiuWCJKyN9U_LHJV0DRKLG22)

  You can both edit or remove a message with this tool. When clicking on either option, a dialog will appear, allowing for changing a message, or confirming whether to delete it or not.

  Points : 2/2

* Message removal   

  Same as previously, except that it is the second function.

  ![img](https://lh3.googleusercontent.com/NUD5u3bbWYWpdJk0aCDR2bbmN1Aki5cDzkwfjkqElvbZdxPXBCpgH4iJDCg_OJgEulFg-mkcFY1rAa1W_R-Sc1E0F9QRV3rr3NGX6mN5q9FBHA5nAiuWCJKyN9U_LHJV0DRKLG22)

  You can both edit or remove a message with this tool. When clicking on either option, a dialog will appear, allowing for changing a message, or confirming whether to delete it or not.

  Points : 2/2

* Account settings   

  The settings are accessible on the bottom left of the application, using the cog icon:

  ![img](https://lh6.googleusercontent.com/Z6i0Cvh3DHSJQV2oG-Vp3B86u0KjPTSVHGSqUNLkXXw2Ugz5CryTzvUsXW6xRGlNEaNL-R6SQYOv04yoTDUFCV3NzWw6vKeP4DB4GJPygs-gS49_sbQhv69tLOL9zQBC1mO5B0Hp)

  On the setting page, we have three different tabs:

  1. **Account** to change the username.
  2. **Avatars** to change your avatar.
  3. **Themes **to change the current theme.

  We can also log out from the application.

  We have this settings page, which is the account page from where we can update our username. We chose to link the email with GitHub, so we elected that it was best not to modify it.

  Account tab: 

  ![img](https://lh3.googleusercontent.com/QqwLuPEHoQLFVvQjP1X7QDQDs7M-hTcJH7KC58NpxA4OvMb3IgTTUN1xPHqBuqzo1nohFa_DK0O6CMAF0EFojsvhUGI_50EE3N8VV6cOxWWRBKrkaDvaRq9XcvR0AejoCrfS2oHj)

  We will display the other tabs in the subsequent sections.

Points : 4/4

* Gravatar integration   

  As you could see from the previous pictures, we integrated Gravatar using `react-gravatar` from github.

  To implement Gravatar, we just have to import `import Gravatar from "react-gravatar"` and use the following component `<Gravatar email="myemail@example.com"` to create a Gravatar picture.

  Source : https://www.npmjs.com/package/react-gravatar

  Points : 2/2

* Avatar selection   

  For the avatar selection, we decided to generate 18 avatars by user from Gravatar using the md5 hash prop. This allows for a selection of a different Gravatar acting as embedded avatar selection. We then persist this selection using the database.

  Avatar selection page:

  ![img](https://lh6.googleusercontent.com/XG4cSnvhpDGahzhCtCmeQk44a3fKo-REny2s94-0XdJIVdHuT0KWAVVHNMRBxIekDS3T0pGa8MufuiaeNNDqMuCg914DyDwh0xypmf5SiCK6fG4EOiVU6WcHMMFu7XEoAY_xH7Ce)

  Points : 4/4

* Personal custom avatar   

  We decided not to do this part to focus on other aspects.

  Points : 0/6

  

**Points from part 1**: 18/18

**Points from part 2**: 38/44

**TOTAL:** 56/62

## Bonus

* Fixing the date when sending and printing a message

  The project code you wrote imported dayjs from which the implementation to show the date for every message was incorrect in our project. We fixed it to have the proper dates.

  Example of dates:

  ![img](https://lh5.googleusercontent.com/ncC4c-jmPelhIX4VYWr7rwy55jmiG3wXZ2MZ9kd69GBA5rbpDiE9_ViEggzO2PkDZHxch9PhKWzJeih3tyc-in5HWac9hIX-aRmcRD6GWT0eI_SJupg9HQgRTtoNzAB_Xfkh0NLb)

  Points : 1/1

* Header removal from messages

  When writing a message in the chat, the following messages made by the same user are not showing the header, for a duration up to 10 minutes since the last message.

  This allows a much fluent flow of messages. This couldn't have been done without the fix of dayjs.

  The two blocks are both two separate messages, not showing the header:

  ![img](https://lh4.googleusercontent.com/VusZPYbQpelFgVmwpZYBzAtw7N_wnFAP-n5SOUrReCWESJXaBPUeqjAZH-QdYcXnJa-foF_Lt_MolfdEivo0aOqLvbpuyeTFji1KqJg6JJ6_eaekD50grbqTTmjsiPWoTwj9d3Eo)

  Points: 1/1

* Complete theming support

  We implemented a total of three themes in our application, using a custom theme provider, inspiring ourselves from an article. We can implement n themes inside of our app, as long as we have colors to try.

  Source : https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react

  The themes have a preview image which allows the user to know which colors will be used.

  Themes page:

  ![img](https://lh3.googleusercontent.com/FP44GR-J3QWU_XH9xDsi7hYcmdfMf_4-yvEWsGLACQ22NENcxVIF5jmQCychQtyvsiEoOvOcMWV2YmYgBRq6qSGYfqUvyDMQ398xbdjf3CnhmdRuOdxIKh4DFobEsFb-actcac-B)

  The three themes are diverse, making a striking proposition from the others and giving a completely new feeling to the application.

  1. Cobalt Theme (Typora inspired, and also the theme I'm using on Typora right now

  ![img](https://lh6.googleusercontent.com/b1dbWaXKoBqVdq5sPd9sLPzJjWGolj_lNuDUsjBTJvu1IDwo5MOX84uOYhPyA_wnMb3DHMGlNxEyM8bbBA1DYJqVcz2q9M6A-Yymnec3uIF4XOxrY-5xJGNUeV0i4bLWN-LZjShM)

  2. Marine Theme (for water lovers I guess ?)

  ![img](https://lh5.googleusercontent.com/TfOjb7z8nAJVL7QeXnAk3WQW5DD1tK8Ym4J4ZNqh5ZzjA3mpawGjRyru8ma29D1snWQi8LOQqLz3j1tFwGwU97hZ5wklAB0jUdOU5yPuTks6dwElAg9OvxSPO0IIl-ROogIfAMSW)

  3. Light Theme (for the ones who like having their eyes burnt)

  ![img](https://lh6.googleusercontent.com/_Mq6P-GDR75Nmrv33w4HV9wlj8K2g7mNPUosRe1ETH9DLKNXcNi1Cq_iIb7ZCqZedVe11QVWycfuvAbyy8Nvlc9qbrDe-0LGOJJtl9GIBHpTGhIOHUjyL7qEXVxJSBCPVMMqIDhU)

  Points : 4/4

* Show a list of members of each channel

  Implemented a user list to know which users are using this channel. The owner is colored differently and has a different secondary text.

  Example:

  ![img](https://lh6.googleusercontent.com/n-yVblUWC8_wvyaD_Ni-XEFJ3IwtsbFP0rKqpQFPhLfMn2jTf-owZM6AGVleyJoBRYc1szNZV3V17X7WUDMJlR-iwONfwNZ0DNZQMvPMrlynb1taWObL0tT-IatJy3tS7R-nrmv7)

  Points : 1/1

* Channel deletion / Leaving a channel

  Our user can decide, at some point, to leave a channel which he can then join back again later. If you are the owner of the channel, you can delete it, cascading the delete to all the messages, and removing every instance of this channel in every user.

  1. The back-end was fully integrated,
  2. Clean deletion 
  3. Unit-testing

  

  Top right corner delete icon:

  ![img](https://lh4.googleusercontent.com/rG8d6oEROTwKBW0Lgw0cFi4sGx335cJWkdZ87EB5pqsDVybrwrsquIiiL5XWUEeBNjEv6_Od178aOxZAHl0s4ICVuQNrFe6GxvDyDwi5YwIpCQPipp3qBnD6TUxX9Cq9FHJ0hAvN)

  Pressing this icon shows a delete or leaving dialog, asking for confirmation.

  Points : 2/2

## Conclusion

**Part 1 and part 2 points**: 56/62

**Bonus**: 9/9

**TOTAL**: 65/62

We had a very pleasing experimenting time with React, that allowed us to grasp a little this new way of creating web applications and websites. 

We hope to have given you a professional-looking application, that is both comfortable to use, and pleasing to look at. We spent a great deal of time in details, and we hope it shows.

Thank you for the semester, and good luck with the remaining projects that you have to grade.

Kellian & Yann
