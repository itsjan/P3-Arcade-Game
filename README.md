# Arcade Game

## DevOps with Docker

### Part 3, exercice 3.2:
Link to running app: https://arcade-game-2c2k.onrender.com

---

Docker deployment
-----------------
Build the image:
```bash
docker build -t arcade-game .
```
run the image:
```bash
docker run -d -p 8080:80 arcade-game 
```
Point your browser to <http://localhost:8080> to start the game.

How to play?
------------

First, select a play character using left and right arrow keys.
Game will start when you press Enter.

![select_char](https://github.com/itsjan/P3-Arcade-Game/blob/master/select_char.png)

You initially have three lives. Game will end when you run out of lives.
Move your character on the play field using arrow keys.

Bugs are your enemies, and they move across the play field at varying speeds.
Colliding with a bug will cost you one life.

Reach the water to gain a life.

A gem will appear on the play field at random times. Reach the gem to add to your score.

Press the S key at any time to change your play character.


![play](https://github.com/itsjan/P3-Arcade-Game/blob/master/play.png)

