require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const BCRYPT_WORK_FACTOR=13
function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
    const dbHost = process.env.DATABASE_HOST || "localhost";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || "vaccine_hub";


    
    //if the DATABASE_URL environment variable use that,
    //otherwise create the db connection string ourselves
    return (
        process.env.DATABASE_URL ||
        `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
    );
}

// console.log("process.env".yellow, Object.keys(process.env));
// console.log("App Config".inverse);
// console.log(`PORT: ${PORT}`.bgBrightGreen);
// console.log("Database URI:".bgMagenta, getDatabaseUri());
// console.log("---");

module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
};
