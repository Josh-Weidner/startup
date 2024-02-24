# [Basket Flyer](https://basketflyer.com)

## Specification Deliverable

### Elevator Pitch

Remember spending hours on end trying to beat your friends high score on Flappy Bird? And the satisfaction that was felt once you finally overcame that score and were able to rub it in your friends face? We all miss that simple game and competition. Basket Flyer will bring back that same feeling of competition and nostalgia from almost a decade ago. 

### Design

![The UI of Basket Flyer itself.](IMG_0033.PNG)

You can control the basketball with arrow keys and must hit the hoops as they fly across the screen.

![Log In screen.](IMG_0034.PNG)

Log-in screen

![Leader Board screen.](IMG_0035.PNG)

Up to date leaderboard and recent scores of your classmates.

### Key features

- Secure login over HTTPS
- Ability to select game difficulty
- Display of classmates recent scores
- Display of all-time high scores
- Display personal high score
- Ability to play or play again by pressing arrow keys
- Scores are persistently stored

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, one for playing, and one for leaderboard. Hyperlinks to all three pages.
- **CSS** - Application styling that makes game playable on all screen sizes, uses good whitespace on log-in and leaderboard screens, color choice and contrast.
- **JavaScript** - Provides login, choice display, players in-put from arrow keys, display recent scores of classmates and all-time high scores, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving classmates scores
  - submitting personal recent scores
  - retrieving top three high-scores
- **DB/Login** - Store users, and scores in database. Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- **WebSocket** - As each user plays and reaches new high scores, their scores are broadcast to all other users.
- **React** - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Three HTML pages that represent structures in order to login, play, and view the leaderboard.
- **Links** - The login button requires a username and password and takes you to the game itself. Each page has links to the other pages.
- **Text** - Directions are given on the play now screen. Along with the current score text on the play now screen.
- **Images** - I use images from third party websites for the basketball, hoop, and hand.
- **3rd party Service** Invalid (Backend email verification)
- **DB/Login** - Input box and submit button for login. The Leaderboard represents data pulled from the database.
- **WebSocket** - The recent scores under the leaderboard represent the scores of realtime players.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I turned the navigation bar into a thick grey bar that spreads out the page links.
- **Responsive to window resizing** - My app looks great on all window sizes and devices
- **Application elements** - Used good contrast and whitespace, that is consistant on all pages.
- **Application text content** - Consistent fonts.
- **Application images** - I used a logo that I generated in place of the game name on the top of the screens.
