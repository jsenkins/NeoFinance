# 💸 NeoFinance - Personal Finance Manager

Neo Finance is a web-based personal finance tracking application with the goal to articulate the user’s financial profile to allow easy understanding and management of their income, expenses, and savings. This proposal outlines the approach, techniques and the key features planned for Neo Finance that align with the needs of its target audience. 
The vision for Neo Finance is not only to provide easier management for personal finance, but to also educate the users since a great many people lack in financial literary and addressing their monetary matters. 

---

## 🚀 Features

- 🔐 **User Authentication:** Secure login with Redux state management.
- 📊 **Transaction Tracking:** View, search, and manage financial transactions.
- 💰 **Debt Management:** Organize and display debts owed or due.
- **Clean Dashboard for an overview**
- **Report Generation** 
- 🧩 **Reusable Components:** Clean modular code for reusability and clarity.

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── TransactionForm.jsx         # Form for adding transactions
        
│
├── pages/
│   ├── Login.jsx                   # Login UI and authentication logic
│   ├── Transactions.jsx           # Page to view/search transactions
│   ├── Debts.jsx                  # Page to manage and view debts
│
├── store/
│   ├── authSlice.js                # Auth state management
│   ├── api.js                      # RTK Query API for backend communication
│
├── App.jsx                        # Application routes and layout
└── index.jsx                      # Main entry point
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/neofinance.git
   cd neofinance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Backend Setup**
   - Make sure the backend API is running and accessible (usually at `/api` endpoints).
   - Configure environment variables if necessary (e.g., `REACT_APP_API_URL`).

---

## 📄 Component Descriptions

### `Login.jsx`

- Allows users to log in using email and password.
- Implements error handling and redirects on success.
- Integrated with Redux to store user credentials.

### `Transactions.jsx`

- Displays a searchable and sortable list of user transactions.
- Includes a form for adding new transactions (`TransactionForm.jsx`).
- Fetches data using RTK Query.

### `Debts.jsx`

- (Assuming standard functionality from filename) Shows a list of debts.
- May include logic for categorizing, adding, and viewing debt records.

---

## 🌐 Tech Stack

- **Frontend:** React, Redux Toolkit, React Router
- **API Integration:** RTK Query
- **Styling:** Tailwind CSS, DaisyUI
- **State Management:** Redux + Redux Toolkit

---

## 🧪 Testing

To be added (suggested tools: Jest, React Testing Library)

---

## 📃 License

[MIT](LICENSE)

---

## 🙌 Acknowledgements

Built with ❤️ by your team. Contributions welcome!
