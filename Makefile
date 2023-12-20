build:
	docker compose up --build -d

up:
	docker compose up -d

down:
	docker compose down

clean:
	docker compose down -v

fclean: clean 
	docker system prune -af

re: down up

red: clean up

refd: fclean build

db:
	rm -rf file.sql
	python3 scraper.py > file.sql
	mysql -u ${POSTGRES_USER} -p
	USE Aiko;
	source /root/Aiko/file.sql;
	quit;
