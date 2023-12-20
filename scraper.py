import requests
from bs4 import BeautifulSoup

print('CREATE DATABASE Aiko;\n')
print('\c Aiko;\n')
print('CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(32), img VARCHAR(256), nameP VARCHAR(32), nameQ VARCHAR(32), nameW VARCHAR(32), nameE VARCHAR(32), nameR VARCHAR(32), imgP VARCHAR(256), imgQ VARCHAR(256), imgW VARCHAR(256), imgE VARCHAR(256), imgR VARCHAR(256));\n')

response = requests.get('https://www.leagueoflegends.com/fr-fr/champions/')

if response.ok:
	soup = BeautifulSoup(response.text, 'lxml')
	champs = soup.findAll('a',  class_="style__Wrapper-sc-n3ovyt-0 style__ResponsiveWrapper-sc-n3ovyt-4 jMmGcS iUmzcQ style__Item-sc-13btjky-3 idPziT isVisible isFirstTime")
	for champ in champs:
		print("INSERT INTO users (name, img, nameP, nameQ, nameW, nameE, nameR, imgP, imgQ, imgW, imgE, imgR) VALUES (\"", end="")
		print(champ.find('span', class_="style__Text-sc-n3ovyt-3 kThhiV").text, end="")
		print("\", \"", end="")
		print(champ.find('img')['src'], end="")
		response2 = requests.get('https://www.leagueoflegends.com/' + champ['href'])
		if response2.ok:
			soup2 = BeautifulSoup(response2.text, 'lxml')
			comps_name = soup2.findAll('h5')
			for comp_name in comps_name:
				print("\", \"", end="")
				print(comp_name.text, end="")
			comps_img = soup2.findAll('span', class_="style__OptionIconContent-sc-1ac4kmt-6 eQgsrb")
			for comp_img in comps_img:
				print("\", \"", end="")
				print(comp_img.find('img')['src'], end="")
		print("\");")

print('\nSELECT * FROM users;')
