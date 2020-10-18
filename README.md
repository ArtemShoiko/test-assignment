# Test Assignment made by Artem Shoiko

### API Testing made [here](cypress/integration/closestAsteroids.spec.js)

### NoSQL made [here](cypress/integration/noSQL.spec.js)

### Setup
1. Install all dependensies: `npm install`
2. Run tests using headless mode: `npm run test` or UI mode: `npm run cy:open`
Note: assumption is made that there is a DB up and running during the tests execution. DB "cinema" with collection "movies" are hardcoded here: [here](cypress/plugins/index.js)
