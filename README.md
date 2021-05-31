# CCSGP Job Board

The [CCSGP Job Board](https://ccsgp.herokuapp.com/) is an event posting platform for NGOs or other relevant organisations to submit proposals. This repository serves as a collaborative platform. Refer to [Contribution Guidelines](https://github.com/Zhou-Jiahao-1998/Orbital#contribution-guidelines) for more.

## Installation

### Pre-Requisites

Check that you have the following installed, tutorials can be found [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend):

- Git
- Node.js
- Ruby on Rails
- PostgreSQL

### Cloning a Local Copy

- Open up terminal.
- Run `git clone https://github.com/Zhou-Jiahao-1998/Orbital.git`.
- Navigate to the "Orbital" directory.
- Run `yarn install` and `bundle install`.
- Run `rails s` to start local frontend server.

### How to access database

- Open up terminal.
- Run `psql orbital_development`.
- Run `\dt` to show tables.
- To see the contents of a table, say "events", run `select * from events;`.
- To quit the psql prompt, run `\q`.

## Contribution Guidelines

To contribute, create a fork of the repository and submit a Pull Request. You can also head to "Issues" page to contribute to any opened issues found there.
