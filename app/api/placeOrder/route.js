import mysql from "mysql2/promise";
import 'dotenv/config';


const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DATABASE_TABLE_P } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE || !DB_DATABASE_TABLE_P) {
    console.error("Error: Missing one or more required environment variables.");
}
// Define the POST route for order submission
export async function POST(req) {
  try {
    // Parse the request body
    const  data  =await req.json();
    
      // Extract the data from the parsed object
    const { formData, finalTotal, idArray,selectedPayment } = data;
    console.log(idArray);
    
    // Validate the incoming data
    if (!formData || !finalTotal || !idArray || !selectedPayment) {
      return new Response(JSON.stringify({ error: "Incomplete data" }), {
        status: 400,
      });
    }
    function generateUniqueId() {
        // Get current timestamp in milliseconds
        const timestampPart = Date.now().toString().slice(-6); // 6 digits from timestamp
        // Generate a random part of 6 digits
        const randomPart = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
        // Combine both parts to generate a unique 12-digit code
        return timestampPart + randomPart.toString();
      }
      
    const uniqueId = generateUniqueId();
    // Connect to your MySQL database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'myjarvo.com',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 20000
    });

    // Insert the order into the `orders` table
    const [orderResult] = await connection.execute(
      `INSERT INTO orders 
      (oid, name, surname, email_id, phone_number, address_line1, city, state, pin_code, total_value, payment_method,parcel_content) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
      [
        uniqueId,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.address,
        formData.city,
        formData.state,
        formData.zip,
        finalTotal,
        selectedPayment,
        JSON.stringify(idArray),
      ]
    );
    console.log(orderResult);
    

    // Close the database connection
    await connection.end();

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Order placed successfully", uniqueId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing the order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to place the order" }),
      { status: 500 }
    );
  }
}
