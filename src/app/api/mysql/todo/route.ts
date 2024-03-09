import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise'

let connectionParams = {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

// Function to execute SQL queries
async function executeQuery(query: string, values: any[] = []) {
    const connection = await mysql.createConnection(connectionParams);
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } finally {
        await connection.end();
    }
}

export async function GET(request: Request) {

    try {
        // Execute SELECT query to retrieve data
        const results = await executeQuery("SELECT * FROM list");

        // return the results as a JSON API response
        return NextResponse.json(results)

    } catch (error) {
        console.log('ERROR: API - ', (error as Error).message)
        
        const response = {
            error: (error as Error).message,
            returnedStatus: 200,
        }
        
        return NextResponse.json(response, { status: 200 })
    }
}


// Handler for POST request
export async function POST(request: Request) {
    try {
        // Parse request body
        const body = await request.json();
        const { description, isCompleted } = body;

        // Execute INSERT query to add new record
        const results = await executeQuery("INSERT INTO list (description, isCompleted) VALUES (?, ?)", [description, isCompleted]);
        // Return results with 200 status code for successful creation
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        // Handle errors
        console.log('ERROR: API - ', (error as Error).message);
        const response = {
            error: (error as Error).message,
            returnedStatus: 200,
        };
        return NextResponse.json(response, { status: 200 });
    }
}

// Handler for PUT request
export async function PUT(request: Request) {
    try {
        // Parse request body
        const body = await request.json();
        const { id, description, isCompleted } = body;

        // Execute UPDATE query to update existing record
        const results = await executeQuery("UPDATE list SET description = ?, isCompleted = ? WHERE id = ?", [description, isCompleted, id]);
        // Return results with 200 status code for successful update
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        // Handle errors
        console.log('ERROR: API - ', (error as Error).message);
        const response = {
            error: (error as Error).message,
            returnedStatus: 200,
        };
        return NextResponse.json(response, { status: 200 });
    }
}

// Handler for DELETE request
export async function DELETE(request: Request) {
    try {
        // Parse request body
        const { id } = await request.json();

        // Execute DELETE query to remove record
        const results = await executeQuery("DELETE FROM list WHERE id = ?", [id]);
        // Return results with 200 status code for successful deletion
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        // Handle errors
        console.log('ERROR: API - ', (error as Error).message);
        const response = {
            error: (error as Error).message,
            returnedStatus: 200,
        };
        return NextResponse.json(response, { status: 200 });
    }
}