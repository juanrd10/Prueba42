init:
	docker-compose -f ./docker-compose.yml up --build

init_back:
	docker-compose -f ./docker-compose.yml up --build -d

stop:
	docker-compose -f ./docker-compose.yml down --volumes
