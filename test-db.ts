import "dotenv/config";
import { Client } from "pg";

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function test() {
    try {
        await client.connect();

        console.log("Connected to PostgreSQL");

        const result = await client.query('SELECT * FROM public."Task"');

        console.log("Rows:", result.rows);
    }
    catch (error) {
        console.error("Database error:", error);
    }
    finally {
        await client.end();
    }
}

test();