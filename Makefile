.PHONY: all db-up inst-back inst-front mig-up run-back-bg run-front

all: db-up inst-back inst-front mig-up run-back-bg run-front

db-up:
	docker compose up -d

inst-back:
	cd backend && npm install

inst-front:
	cd frontend && npm install

mig-up:
	cd backend && yarn run migrate:up

mig-down:
	cd backend && yarn run migrate:down

run-back:
	cd backend && yarn run dev

run-back-bg:
	cd backend && yarn run dev &

run-front:
	cd frontend && yarn run start

# db-seed:
# 	cd backend && npx sequelize-cli db:seed:all
