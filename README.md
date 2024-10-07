Instructions
============

How to run the game?
--------------------
Simply open index.html using a browser, and the game will load.

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


### 1.15: Homework
Create Dockerfile for an application or any other dockerised project in any of your own repositories and publish it to Docker Hub. This can be any project, except the clones or forks of backend-example or frontend-example.

For this exercise to be complete you have to provide the link to the project in Docker Hub, make sure you at least have a basic description and instructions for how to run the application in a README that's available through your submission.

**Solution**
Containerised project in Docker Hub:
<https://hub.docker.com/repository/docker/itsjan/arcade-game/general>



```bash
docker run -d -p 8080:80 itsjan/arcade-game
```
Point your browser to <http://localhost:8080> to start the game.