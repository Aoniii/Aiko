#!/bin/bash

echo "Which port do you want to use for postgres ?"
read userInput
echo "POSTGRES_PORT=$userInput" >> .env

echo "choose a postgres username ?"
read userInput
echo "POSTGRES_USER=$userInput" >> .env

echo "choose a postgres password ?"
read userInput
echo "POSTGRES_PASSWORD=$userInput" >> .env
