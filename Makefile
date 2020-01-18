
build:
	@docker build --tag gcr.io/pibgama-dev/pibgama-api .

push:
	@docker push gcr.io/pibgama-dev/pibgama-api

build-and-push:
	@docker build --tag gcr.io/pibgama-dev/pibgama-api .
	@docker push gcr.io/pibgama-dev/pibgama-api

kube-deploy:
	@export NODE_ENV=production
	@cat ./kube/deployment.yaml | sed 's/NODE_ENV_VALUE/eval echo '$NODE_ENV')/' | kubectl apply -f -
