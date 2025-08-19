# Jito BAM Transaction Explorer (MVP)

A lightweight, real-time backend service to monitor the Solana blockchain, identify blocks produced by Jito validators, and detect potential MEV activity. This project serves as the foundational data layer for a specialized Jito Block Assembly Marketplace (BAM) explorer.
Key Features

-  Real-Time Block Processing: Uses a WebSocket connection to listen for and process new Solana blocks the instant they are confirmed.

- Jito Block Identification: Intelligently identifies blocks produced by Jito validators by checking the public key of the slot leader.

- MEV Activity Detection: Performs a simplified MEV check by scanning transactions for interactions with well-known DeFi and DEX protocols on Solana.

- In-Memory Storage: Caches the last 20 processed blocks for immediate access via the API, perfect for a live-updating frontend.

-  Scalable Architecture: Built with a clean, modular structure that's easy to extend with more advanced parsing, a persistent database, and a richer API.

- Simple API: Exposes a single, easy-to-use endpoint (/api/latest-blocks) to serve the processed data.

Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.
Prerequisites

    Node.js (v18 or later recommended)

    Yarn or npm

## Installation & Setup

1. Clone the repository:
 ```
    git clone <repository-url>
    cd bam-explorer

    Install dependencies:

    yarn install
    # or
    npm install
 ```

2. Running the Application

    Start the development server:
    ```
    yarn run dev
    ```

    This will start the server with nodemon, which automatically restarts the application when you make changes to the code.

    Verify the server is running:
    You should see the following output in your terminal:

    ✅ API server running on http://localhost:3001
    🚀 Starting Solana Live Worker...

    Access the API:
    Open your web browser or an API client like Postman and navigate to:
    http://localhost:3001/api/latest-blocks

    Initially, the array may be empty. As the worker processes new blocks on the Solana network, this endpoint will begin to serve an array of the latest processed block data.
