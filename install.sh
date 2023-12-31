#!/bin/bash

apt-get update -y
apt-get upgrade -y
apt-get install make -y
apt-get install curl -y
apt-get install mariadb-server -y
apt-get install python3 -y
apt-get install pip -y
curl -fsSL https://get.docker.com | sh

pip install requests
pip install bs4
pip install lxml