
.PHONY: up

up:
	docker-compose up -d
	npm run typeorm migration:run
	npm run seed:admin