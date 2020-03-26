require( 'dotenv' ).config( {path: 'variables.env' } );

const createServer = require( './createServer' );
const db           = require( './db' );

const server = createServer();

// TODO use express midleware cookies/jwt
// .. polulate users

server.start( {
  cors: {
    credentials: true,
    orogin: process.env.FRONTEND_URL
  }
}, deets => {
  console.log( process.env.FRONTEND_URL );
  console.log( `server is now running on port localhost:${ deets.port } ` );
});