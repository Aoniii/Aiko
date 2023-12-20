#!/bin/bash

echo "choose a postgres username ?"
read userInput
echo "POSTGRES_USER=$userInput" >> .env

echo "choose a postgres password ?"
read userInput
echo "POSTGRES_PASSWORD=$userInput" >> .env
