# inventory-example

This is an example Inventory CRUD (Create, Read, Update, Delete) application built with Node.js and Express. It allows you to manage an inventory of items by performing various operations. This application also includes a Jest API test script.

## Features

- Create new items and add them to the inventory.
- Read the list of items in the inventory.
- Read details of a specific item.
- Update item details.
- Delete items from the inventory.

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Running the server
```
npm start
```

### API Endpoints

The following API endpoints are available:

#### Create an Item
- **Endpoint**: POST `/items`
- **Request Body**: JSON with the item's name (`name`).

#### Read All Items
- **Endpoint**: GET `/items`
- **Response**: JSON array containing all items in the inventory.

#### Read One Item
- **Endpoint**: GET `/items/:id`
- **Response**: JSON object with details of the item with the specified `id`.

#### Update an Item
- **Endpoint**: PUT `/items/:id`
- **Request Body**: JSON with the updated item's name (`name`).

#### Delete an Item
- **Endpoint**: DELETE `/items/:id`
