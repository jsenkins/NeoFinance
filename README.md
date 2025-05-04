# 💸 NeoFinance - Personal Finance Manager

NeoFinance is a full-stack personal finance management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It enables users to track income and expenses, manage debts, and visualize financial data through an intuitive interface.

---

##  Project Structure

```
NeoFinance/
├── client/   # Frontend React application
└── server/   # Backend Express.js API
```

---

## 🚀 Features

- 🔐 **User Authentication:** Secure login system with session management.
- 📊 **Transaction Tracking:** Add, view, and search financial transactions.
- 💰 **Debt Management:** Monitor and manage outstanding debts.
- 📈 **Dashboard Overview:** Visual summaries of financial status.
- 📄 **Report Generation:** Export financial data for analysis.
- ♻️ **Reusable Components:** Modular codebase for maintainability.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jsenkins/NeoFinance.git
   cd NeoFinance
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the `server` directory with the following content:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the application:**

   - Start the server:
     ```bash
     cd ../server
     npm start
     ```

   - Start the client:
     ```bash
     cd ../client
     npm start
     ```


---



---

##  Acknowledgements

Developed by [jsenkins](https://github.com/jsenkins) and [AbdurRehman Haroon](https://github.com/abdurrehman-haroon)
