# Basket Flyer

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

![hello](IMG_0033.PNG)

