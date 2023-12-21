import requests
from bs4 import BeautifulSoup

print('CREATE DATABASE Aiko;\n')
print('\c Aiko;\n')
print('CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(128), img VARCHAR(512), nameP VARCHAR(128), nameQ VARCHAR(128), nameW VARCHAR(128), nameE VARCHAR(128), nameR VARCHAR(128), imgP VARCHAR(512), imgQ VARCHAR(512), imgW VARCHAR(512), imgE VARCHAR(512), imgR VARCHAR(512));\n')

response = requests.get('https://www.leagueoflegends.com/fr-fr/champions/')

if response.ok:
	soup = BeautifulSoup(response.text, 'lxml')
	champs = soup.findAll('a',  class_="style__Wrapper-sc-n3ovyt-0 style__ResponsiveWrapper-sc-n3ovyt-4 jMmGcS iUmzcQ style__Item-sc-13btjky-3 idPziT isVisible isFirstTime")
	for champ in champs:
		print("INSERT INTO users (name, img, nameP, nameQ, nameW, nameE, nameR, imgP, imgQ, imgW, imgE, imgR) VALUES ('", end="")
		print(champ.find('span', class_="style__Text-sc-n3ovyt-3 kThhiV").text.replace("'", "''"), end="")
		print("', '", end="")
		print(champ.find('img')['src'], end="")
		response2 = requests.get('https://www.leagueoflegends.com/' + champ['href'])
		if response2.ok:
			soup2 = BeautifulSoup(response2.text, 'lxml')
			comps_name = soup2.findAll('h5')
			for comp_name in comps_name:
				print("', '", end="")
				print(comp_name.text.replace("'", "''"), end="")
			comps_img = soup2.findAll('span', class_="style__OptionIconContent-sc-1ac4kmt-6 eQgsrb")
			for comp_img in comps_img:
				print("', '", end="")
				print(comp_img.find('img')['src'], end="")
		print("');")

print('\nSELECT * FROM users;')
