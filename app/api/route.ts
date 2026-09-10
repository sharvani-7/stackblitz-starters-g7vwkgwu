// app/api/todos/route.js

// -------------------------------------------------------
// TEMPORARY DATA
// -------------------------------------------------------
//
// We are using an array instead of a database for now.
//
// In the next part of the workshop, we can replace this
// with MongoDB.
//
// IMPORTANT:
// This data will reset when the server restarts.
// -------------------------------------------------------

let todos = [
    {
      id: 1,
      title: 'Learn Next.js',
      completed: false,
    },
    {
      id: 2,
      title: 'Build an API',
      completed: true,
    },
  ]; // ======================================================= // GET /api/todos // ======================================================= // // Get all todos // // Example: // // GET http://localhost:3000/api/todos // // =======================================================
  
  export async function GET() {
    return Response.json(todos);
  } // ======================================================= // POST /api/todos // ======================================================= // // Create a new todo // // Example: // // POST http://localhost:3000/api/todos // // Request body: // // { //   "title": "Learn React" // } // // =======================================================
  
  export async function POST(request:any) {
    // Read the JSON data sent by the client
    const data = await request.json(); // Basic validation
  
    if (!data.title) {
      return Response.json(
        {
          message: 'Title is required',
        },
        {
          status: 400,
        }
      );
    } // Create a new todo
  
    const newTodo = {
      id: Date.now(),
      title: data.title,
      completed: false,
    }; // Add the todo to our array
  
    todos.push(newTodo); // Send the newly created todo to the client
  
    return Response.json(newTodo, {
      status: 201,
    });
  } // ======================================================= // PATCH /api/todos?id=1 // ======================================================= // // Update a todo // // The todo ID is passed as a query parameter. // // Example: // // PATCH http://localhost:3000/api/todos?id=1 // // Request body: // // { //   "completed": true // } // // =======================================================
  
  export async function PATCH(request:any) {
    // Get the URL from the request
    const url = new URL(request.url); // Get the "id" query parameter // // /api/todos?id=1 //              ↑ //
  
    const id = Number(url.searchParams.get('id')); // Check whether an ID was provided
  
    if (!id) {
      return Response.json(
        {
          message: 'Todo ID is required',
        },
        {
          status: 400,
        }
      );
    } // Read the data sent by the client
  
    const data = await request.json(); // Find the todo
  
    const todo = todos.find((todo) => todo.id === id); // Todo not found
  
    if (!todo) {
      return Response.json(
        {
          message: 'Todo not found',
        },
        {
          status: 404,
        }
      );
    } // Update the title if it was provided
  
    if (data.title !== undefined) {
      todo.title = data.title;
    } // Update completed if it was provided
  
    if (data.completed !== undefined) {
      todo.completed = data.completed;
    } // Return the updated todo
  
    return Response.json(todo);
  } // ======================================================= // DELETE /api/todos?id=1 // ======================================================= // // Delete a todo // // Example: // // DELETE http://localhost:3000/api/todos?id=1 // // =======================================================
  
  export async function DELETE(request:any) {
    // Get the URL from the request
    const url = new URL(request.url); // Get the "id" query parameter
  
    const id = Number(url.searchParams.get('id')); // Check whether an ID was provided
  
    if (!id) {
      return Response.json(
        {
          message: 'Todo ID is required',
        },
        {
          status: 400,
        }
      );
    } // Find the position of the todo in the array
  
    const todoIndex = todos.findIndex((todo) => todo.id === id); // Todo not found
  
    if (todoIndex === -1) {
      return Response.json(
        {
          message: 'Todo not found',
        },
        {
          status: 404,
        }
      );
    } // Remove the todo
  
    const deletedTodo = todos.splice(todoIndex, 1); // Return the deleted todo
  
    return Response.json(deletedTodo[0]);
  }
  Message materials
  