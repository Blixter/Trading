[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Blixter/Trading/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Blixter/Trading/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Blixter/Trading/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Blixter/Trading/build-status/master)
[![Build Status](https://travis-ci.org/Blixter/Trading.svg?branch=master)](https://travis-ci.org/Blixter/Trading)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Krav 2: Frontend

Jag har fortsatt att arbeta med React. Jag gillar att arbeta med React och jag blir hela tiden mer bekväm att arbeta med komponenter. I detta projektet har jag försökt att del upp det mesta i olika komponenter och jag börjar verkligen förstå tjusningen i att arbeta på detta sätt. Jag hade lite små problem i början med hur jag skulle skicka states mellan alla olika komponenter på bästa sätt. Till slut lyckades jag till och med att skicka med states via Router som jag först inte trodde var möjligt. Det gick genom att skicka det via render. Tack vara det lyckades jag skapa en Logout-länk i navbaren som bara visas när användaren är inloggad. När en användare loggar in skickas sätter jag staten som skickades via Routern till true, mycket smidigt!

Jag har återigen valt att styra layouten med Bootstrap, denna gång installerade jag även React-Bootstrap, som är Bootstrap integrerat i React. Hela sidan är responsiv och fungerar på alla olika storlekar tack vara detta.

Som graf valde jag efter mycket om och men till slut på Apex Charts. Främst för att de hade bra dokumentation kring implementering i React och även ett paket för React. Jag ritar upp de två olika objekten (guld och silver) i samma graf. På Trading-sidan kan se sin depå, fylla på saldot och köpa/sälja objekten, samt se grafen. Jag valde alltså att visa allt på samma sida.

För att få graf-datan från servern i realtid har jag använt mig av paketet socket.io-client. Socket-io verkar vara det bästa paketet på marknaden just nu och jag personligen känner mig bekväm med paketet. Det fungerar som det skall. Däremot hade jag gärna skapat mer funktionalitet, så som att varje köpta eller sålda objekt sparas i en databas, vilket hade det gjort det möjligt att visa köphistorik.

## Krav 5: Tester frontend

**Use-case 1** "Från startsidan skall användaren via navbaren kunna nå routen /login"

**Use-case 2** "Från startsidan skall användaren via navbaren kunna nå routen /register"

**Use-case 3** "Från startsidan skall användaren via navbaren kunna nå routen /trading, men användaren skall bli tillbaka skickad till routen /login eftersom användaren inte är inloggad."

**Use-case 4** "På login-sidan skall det finnas en submit-knapp i formuläret."

**Use-case 5** "På login-sidan skall användaren kunna fylla i email-adress, lösenord och sedan trycka på enter."


Eftersom jag inte kunde logga in på sidan blev det väldigt simpla test.
