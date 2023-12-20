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