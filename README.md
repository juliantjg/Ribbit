<div align="center">
  <img src="https://user-images.githubusercontent.com/53683415/223293131-997df882-f40d-4073-9bd6-9d4bcd0d87b4.png" width="135">
  <h1> 
    RIBBIT
    
  </h1>
  <a href="http://170.64.146.173:8000/#/landingPage/mainLanding" target=”_blank”><b>:link: LAUNCH</b></a>
  <br><br>
   Fullstack Reddit Clone Made With React+Redux & Django.
   <br><br>
   <img src="https://img.shields.io/badge/react-v17.0-lightyellow">
   <img src="https://img.shields.io/badge/python-v3.8-lightyellow">
   <img src="https://img.shields.io/badge/redux-v7.2-lightyellow">
   <img src="https://img.shields.io/badge/django-v4.0-lightyellow">
</div>
<br>
<div align="center">
  <img src="https://user-images.githubusercontent.com/53683415/223298414-168d83a6-f305-42fc-b7c5-039f5e87a1d7.png" width="380">
  <img src="https://user-images.githubusercontent.com/53683415/223298128-31b906fa-19ec-4212-a9d2-327c4719f9db.png" width="380">
  <img src="https://user-images.githubusercontent.com/53683415/223298978-c0fc1594-940a-4d6c-a07a-06dec2f392f6.png" width="380">
  <br>
</div>

## :question: What Is Ribbit?
<a href="https://www.youtube.com/watch?v=8BLILMtfteE&feature=emb_logo">:movie_camera: Intro Video</a> <br>
<b>Ribbit</b> is a web application made with Django (backend api) and React.js + Redux (frontend). Made in reference to Reddit, Ribbit provides features such as sharing posts, communities, and many more. Please check [this](https://youtu.be/P8cvGw_9J-s) video for details regarding Ribbit's features and development.

## ⚙️ What Does It Do?
<b>Ribbit</b>'s functionalities are mostly based on Reddit, such as communities, upvote/downvote posts, etc. [Click here for complete functionalities rundown](http://170.64.146.173:8000/#/landingPage/functionalitiesLanding).

## :hammer: Utilization
<b>Ribbit</b> utilizes the following points:
- Django REST Framework - Simple JWT for authentication
- Complete back-end APIs for authentication, users, posts, subs, etc
- Forgot password functionality
- Front end with React
- Front end API fetching and form submissions
- Redux for state management
- Proper error handling
- Group management system
- Responsive UI with css, bootstrap, etc
- Loader, error handling, etc
- MySQL database on deployed server
- Back-end unit testing
- GitHub CT (Continuous Testing)
- Dockerized the entire project under a container
- Deployed on online virtual machine service (Digital Ocean)

## :airplane: Getting Started (without Docker)
Setting up <b>Ribbit</b> on your local machine without Docker? Here are the instructions:

<details>
 <summary><b>Setting up the back-end</b></summary>
 <br />
 
1. First clone the repository

```sh
$ git clone https://github.com/juliantjg/Ribbit.git
```

2. Setting up python virtual environment and activating it

```sh
$ cd Ribbit
$ python -m venv myenv
$ source myenv/bin/activate
```

4. Install Ribbit's dependencies

```sh
$ cd backend
$ pip install -r requirements.txt
```

6. Setting up environment file using `settingsExample.py`

```sh
$ mv backend/settingsExample.py backend/settings.py
```

7. Configure your local MySQL credentials

```python
# Go to the newly created `settings.py` file, and find the `DATABASE` configuration:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
    }
}
```

8. Once the DB has been properly set up, run migrations

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

9. Finally, run the server

```sh
$ python manage.py runserver

=======================================================
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
March 08, 2023 - 00:40:33
Django version 4.1.3, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
=======================================================
```

</details>

<details>
 <summary><b>Setting up the front-end</b></summary>
 <br />
 
1. Install dependencies

```sh
$ cd frontend
$ npm install
```

2. Run the server

```sh
$ npm start

=======================================================
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.88:3000
=======================================================
```

**That's it!**
 
</details>

<details>
 <summary><b>Running tests</b></summary>
 <br />

1. To run API tests, simply do the following

```sh
$ cd backend
$ python manage.py test
```

</details>

## :whale: Docker
You can access the dockerized full stack version of <b>Ribbit</b> under the GitHub Container Registry [here](https://github.com/juliantjg/Ribbit/pkgs/container/ribbit-full-stack). Follow these steps to run the Docker image on your local machine:

<details>
 <summary><b>Setting up full stack app with Docker</b></summary>
 <br />
 
1. Click on the `ribbit-full-stack` package provided on the the Packages section of this repository (alternatively, you can [click here](https://github.com/juliantjg/Ribbit/pkgs/container/ribbit-full-stack)):

![image](https://user-images.githubusercontent.com/53683415/224958641-32c03471-cabb-404c-9bd1-01e445b47be2.png#gh-dark-mode-only)
![image](https://user-images.githubusercontent.com/53683415/224959049-a29bc18b-1ae3-4c17-a553-c0adb3ff9e39.png#gh-light-mode-only)


2. Next, pull the image:
```sh
docker pull ghcr.io/juliantjg/ribbit-full-stack:latest
```

3. Finally, run the image:
```sh
docker run -p 8000:8000 -it ghcr.io/juliantjg/ribbit-full-stack:latest

=======================================================
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
March 14, 2023 - 09:11:34
Django version 4.1.3, using settings 'backend.settings'
Starting development server at http://0.0.0.0:8000/
Quit the server with CONTROL-C.
=======================================================
```

4. Finally, access the application by entering the following link on your browser:
```sh
http://localhost:8000/#/landingPage/functionalitiesLanding
```

</details>

## :recycle: Continuous Testing <img src="https://github.com/juliantjg/Ribbit/actions/workflows/django.yml/badge.svg">
I've set up Git Actions for this repository to run automated tests on pushes/PRs made on the `main`. 
<details>
 <summary><b>View build snapshot</b></summary>
 <br />
  
![image](https://user-images.githubusercontent.com/53683415/223595202-954dde63-ca1b-4f22-9e1a-442a52a9a78e.png#gh-dark-mode-only)

![image](https://user-images.githubusercontent.com/53683415/223594907-d7bdbe54-7475-443e-a7f6-48d8f2d48576.png#gh-light-mode-only)

</details>
  
## 🛠️ Built With <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/224955579-a1ed2e8c-3ab7-41e1-b129-f37466f77c05.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313774-2b46fc19-b811-483f-a53c-978070d5777e.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313813-78e199cc-9a22-4603-99d3-6b50e2bcec0f.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/224954200-33f50594-34e2-43b6-81e9-f3c0bb269f97.png" width="30">
- <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="12"> <b><a href="https://reactjs.org/">React</a> -</b> React is a free and open-source front-end JavaScript library for building user interfaces based on components.
- <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="12"> <b><a href="https://getbootstrap.com/">Bootstrap</a> -</b> Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.
- <img src="https://user-images.githubusercontent.com/53683415/224955579-a1ed2e8c-3ab7-41e1-b129-f37466f77c05.png" width="12"> <b><a href="https://www.mysql.com/">MySQL</a> -</b> MySQL is an open-source relational database management system.
- <img src="https://user-images.githubusercontent.com/53683415/223313774-2b46fc19-b811-483f-a53c-978070d5777e.png" width="12"> <b><a href="https://www.digitalocean.com/">Digital Ocean</a> -</b> DigitalOcean Holdings, Inc. is an American multinational technology company and cloud service provider.
- <img src="https://user-images.githubusercontent.com/53683415/223313813-78e199cc-9a22-4603-99d3-6b50e2bcec0f.png" width="12"> <b><a href="https://www.djangoproject.com/">Django</a> -</b> Django is a free and open-source, Python-based web framework that follows the model–template–views architectural pattern.
- <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="12"> <b><a href="https://redux.js.org/">Redux</a> -</b> Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.
- <img src="https://user-images.githubusercontent.com/53683415/224954200-33f50594-34e2-43b6-81e9-f3c0bb269f97.png" width="12"> <b><a href="https://www.docker.com/">Docker</a> -</b> Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

## ✍️ Author
- [Julian Tjiong](https://juliantjg.github.io/)

## :scroll: License
- [Standart MIT License](https://github.com/juliantjg/Ribbit/blob/main/LICENSE.md)
