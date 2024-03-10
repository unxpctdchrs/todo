import { NextResponse, NextRequest } from "next/server";
import mysql, { RowDataPacket } from 'mysql2/promise'
import DATA from "@/app/DATA";

let connectionParams = {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

// Function to execute SQL queries
async function executeQuery<T extends RowDataPacket[] | any[]>(query: string, values: any[] = []): Promise<T> {
    const connection = await mysql.createConnection(connectionParams);
    try {
        const [results] = await connection.execute(query, values) as any as T;
        return results;
    } finally {
        await connection.end();
    }
}

export async function GET(request: Request) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1)
    // Fetch data from the database instead of making an external API call
    const query = "SELECT * FROM list WHERE id = ?";
    const values = [id];
    const results: RowDataPacket[] = await executeQuery(query, values);
    
    if (results.length === 0) {
        return NextResponse.json({ "message": "Id not found" });
    }
    
    const list: DATA = {
        id: results[0].id,
        title: results[0].title,
        description: results[0].description,
        dueDate: results[0].dueDate,
        isCompleted: results[0].isCompleted
    };
    return NextResponse.json(list);
}

// DELETE method
export async function DELETE(request: Request) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1)
    const query = "DELETE FROM list WHERE id = ?";
    const values = [id];
    const results: RowDataPacket = await executeQuery(query, values);
    
    if (results.affectedRows === 0) {
        return NextResponse.json({ "message": "Id not found" });
    }
    
    return NextResponse.json({ "message": "Item deleted successfully" });
}

// POST method
export async function POST(request: Request) {
    const data = await request.json();
    const query = "INSERT INTO list (title, description, dueDate, isCompleted) VALUES (?, ?, ?, ?)";
    const values = [data.title, data.description, data.dueDate, data.isCompleted];
    const results: RowDataPacket = await executeQuery(query, values);
    
    return NextResponse.json({ id: results.insertId });
}

// PUT method
export async function PUT(request: Request) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1)
    const data = await request.json();
    const query = "UPDATE list SET title = ?, description = ?, dueDate = ?, isCompleted = ? WHERE id = ?";
    const values = [data.title, data.description, data.dueDate, data.isCompleted, id];
    const results: RowDataPacket[] = await executeQuery(query, values);
    
    if (results.affectedRows === 0) {
        return NextResponse.json({ "message": "Id not found" });
    }
    
    return NextResponse.json({ "message": "Item updated successfully" });
}