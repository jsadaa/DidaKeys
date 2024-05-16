.SILENT:

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

############
# Database #
############

## Suppression et création de la DB
db-reset:
	bin/console doctrine:database:drop --if-exists --force
	bin/console doctrine:database:create
	make db-migrate

db-migrate:
	bin/console doctrine:migrations:sync-metadata-storage
	bin/console doctrine:migrations:migrate --no-interaction

## Chargement des fixtures
db-fixtures:
	bin/console doctrine:fixtures:load --no-interaction


## compilation des assets
compile-assets:
	php bin/console asset-map:compile

update:
	git pull
	composer install --no-dev --optimize-autoloader
	make db-migrate
