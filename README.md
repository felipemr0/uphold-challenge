# uphold-challenge
<h3>Requirements</h3>
  <ul>
    <li>Node.js</li>
    <li>PostgreSQL</li>
  </ul>
  <br>
<h3>Database setup</h3>
  <ul>
    <li>Open a command line and execute <b>psql -U postgres</b></li>
    <li>Then it should ask for a password</li>
    <li>Create a database with <b>CREATE DATABASE < database name > ;</b> then execute <b>exit</b> to leave</li>
    <li>Now execute <b>psql -q -h localhost -p 5432 -v ON_ERROR_STOP=1 -U postgres -d < database name > -f < path to schema.sql ></b></li>
  </ul>
  <br>
<h3>Bot environment variables</h3>
  <ul>
    <li>Open the .env file and change the values of DATABASE_PASSWORD to your password and DATABASE_NAME to < database name ></li>    
  </ul>
<h3>Running the bot</h3>
  <ul>
      <li>To run the bot open a command line and navigate to the project directory</li> 
      <li>Then execute <b>node app < list of pairs > --deviation=< deviation > --interval=< interval ></b></li>
      <li>Where < list of pairs > is a list of currency pairs, < deviation > is the price oscillation percentage and < interval > is the fetch interval</li>
      <li>Example <b>node app BTC-USD XPT-AAPL --deviation=0.01 --interval=5000</b></li>
  </ul>
