# Dida-Keys

## Description

Dida-Keys is a small web app with didactic games to help children learn letters, numbers and words. 
It's a project I developed in cooperation with an association called [Le Labo Collectif](https://www.helloasso.com/associations/le-labo-collectif) in Lyon, France, composed of teachers, educators and psychologists.

Their goal is to help children learn to manage conflict and support students in situations of educational deprivation.

The project is still in development and user testing phase.

## Technologies

- PHP 8.2
- Symfony 7.0
- "Vanilla" JavaScript

## Installation

1. Clone the repository
2. Install the dependencies with `composer install`
3. Create the database with `make db-reset`
4. Load the fixtures with `make db-fixtures`
5. Start the server with `symfony server:start` or `php bin/console server:run`
6. Go to `http://localhost:8000`

## Features

- `Château des lettres` : learn the alphabet
- `Château des nombres` : learn numbers
- `Mots flash` : learn words

## Authors & contributors

- Léo Paillard


