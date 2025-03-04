# Country-Info-App
A small application to provide information about countries and add holidays to the user’s calendar. 

## Prerequisites
Node.js, npm, TypeScript

## Installation

```bash
git clone https://github.com/dimon-maksi/Country-Info-App.git
cd Country-Info-App
npm install
```

rename .env.example to .env

```bash
nest start
```

## Testing
### Endpoints
http://localhost:3000/country/available

http://localhost:3000/country/info/UA

## Comments
The third endpoint is not working. I couldn't set up mongodb, a problem with model dependencies that I couldn't solve. If you have the time and desire, it's on the feature/datasource branch, but the program code is not formatted or cleaned up.
