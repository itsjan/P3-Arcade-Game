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

### Exercise 1.16: Cloud deployment
It is time to wrap up this part and run a containerized app in the cloud.

You can take any web-app, eg. an example or exercise from this part, your own app, or even the course material (see devopsdockeruh/coursepage) and deploy it to some cloud provider.

Submit the Dockerfile, a brief description of what you did, and a link to the running app.

**Solution**

Link to running app:
<https://arcade-game-2c2k.onrender.com>


Dockerfile
```dockerfile
FROM nginx

WORKDIR /usr/share/nginx/html

COPY . .

```

Building the image for Render:
Note: Images must be built with the platform linux/amd64.
```bash
docker buildx build --platform linux/amd64 --tag itsjan/arcade-game:latest .
```
Next, log in to Docker, and push the image to Docker Hub
```bash
docker login

docker push 

docker push itsjan/arcade-game:latest
```



**Steps taked in Render:**



as per [documentation ](https://docs.render.com/deploy-an-image)
1. Go to <https://dashboard.render.com/>
2. Select New --> Web Service
3. Enter the name of the image, eg. `itsjan/arcade-game`, select 'Next'
4. Select Instance Type 'Hobbyist' for free service
5. Select 'Deloy Web Service' 

It will take a while to spin up the service. Once completed, the app can be accessed using the link shown on the page.