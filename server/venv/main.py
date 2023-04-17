from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# pip install "uvicorn[standard]"

from pydantic import BaseModel
from typing import Union

import requests

# how to start server 
# open new terminal
# write the following prompts in the terminal in this order
# cd  my-app
# npm run start

# How to start front end 
# open new terminal
# write the following prompts in the terminal in this order
# cd server
# cd venv
# python -m uvicorn main:app --reload


# import FastAPI framework
app = FastAPI()

# add Cross-Origin Resource Sharing middleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# define constants for the project ID and private key
PROJECT_ID = "cffce686-2385-45fd-b88d-a85e61a209d4"
PRIVATE_KEY = "10ab7e80-5360-4406-95cf-81ed55252255"

# define a user data model with several fields
class User(BaseModel):
    username: str
    secret: str
    email: Union[str, None] = None
    first_name: Union[str, None] = None
    last_name: Union[str, None] = None

# define an HTTP POST endpoint for user login
@app.post('/login/')
async def root(user: User):
    # make an HTTP GET request to the ChatEngine API using the provided user data
    response = requests.get('https://api.chatengine.io/users/me/', 
        headers={ 
            "Project-ID": PROJECT_ID,
            "User-Name": user.username,
            "User-Secret": user.secret
        }
    )
    # return the response as JSON data
    return response.json()

# define an HTTP POST endpoint for user signup
@app.post('/signup/')
async def root(user: User):
    # make an HTTP POST request to the ChatEngine API using the provided user data
    response = requests.post('https://api.chatengine.io/users/', 
        data={
            "username": user.username,
            "secret": user.secret,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        },
        headers={ "Private-Key": PRIVATE_KEY }
    )
    # return the response as JSON data
    return response.json()


