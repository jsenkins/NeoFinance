// client/src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: [
    'Transactions','Budgets','Summary','Bills',
    'Debts','DebtSummary','Credits','CreditSummary'
  ],
  endpoints: (builder) => ({
    // Transactions
    getTransactions: builder.query({
      query: () => '/transactions',
      providesTags: ['Transactions']
    }),
    addTransaction: builder.mutation({
      query: data => ({ url: '/transactions', method: 'POST', body: data }),
      invalidatesTags: ['Transactions', 'Budgets', 'Summary']
    }),
    searchTransactions: builder.query({
      query: q => `/transactions/search?q=${q}`
    }),

    // Budgets
    getBudgets: builder.query({
      query: () => '/budgets',
      providesTags: ['Budgets']
    }),
    addBudget: builder.mutation({
      query: data => ({ url: '/budgets', method: 'POST', body: data }),
      invalidatesTags: ['Budgets','Summary']
    }),
    getBudgetSummary: builder.query({
      query: () => '/budgets/summary',
      providesTags: ['Summary']
    }),

    // Contacts
    getContacts: builder.query({
      query: () => '/contacts'
    }),

    // Export
    exportPDF: builder.query({
      query: () => '/export/pdf'
    }),
    exportCSV: builder.query({
      query: () => '/export/csv'
    }),

    // Bills
    getBills: builder.query({
      query: () => '/bills',
      providesTags: ['Bills']
    }),
    addBill: builder.mutation({
      query: data => ({ url: '/bills', method: 'POST', body: data }),
      invalidatesTags: ['Bills']
    }),
    delBill: builder.mutation({
      query: id => ({ url: `/bills/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Bills']
    }),

    // Debts
    getDebts: builder.query({
      query: () => '/finance/debts',
      providesTags: ['Debts']
    }),
    addDebt: builder.mutation({
      query: debt => ({ url: '/finance/debts', method: 'POST', body: debt }),
      invalidatesTags: ['Debts','DebtSummary']
    }),
    payDebt: builder.mutation({
      query: ({ id, amount }) => ({
        url: `/finance/debts/${id}/pay`,
        method: 'POST',
        body: { amount }
      }),
      invalidatesTags: ['Debts','DebtSummary','Transactions']
    }),
    getDebtSummary: builder.query({
      query: () => '/finance/debts/summary',
      providesTags: ['DebtSummary']
    }),

    // Credit Lines
    getCredits: builder.query({
      query: () => '/finance/credits',
      providesTags: ['Credits']
    }),
    addCredit: builder.mutation({
      query: credit => ({ url: '/finance/credits', method: 'POST', body: credit }),
      invalidatesTags: ['Credits','CreditSummary']
    }),
    getCreditSummary: builder.query({
      query: () => '/finance/credits/summary',
      providesTags: ['CreditSummary']
    }),

    // AUTH
    register: builder.mutation({
      query: creds => ({ url: '/auth/register', method: 'POST', body: creds })
    }),
    login: builder.mutation({
      query: creds => ({ url: '/auth/login',    method: 'POST', body: creds })
    })
  })
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useSearchTransactionsQuery,
  useGetBudgetsQuery,
  useAddBudgetMutation,
  useGetBudgetSummaryQuery,
  useGetContactsQuery,
  useExportPDFQuery,
  useExportCSVQuery,
  useGetBillsQuery,
  useAddBillMutation,
  useDelBillMutation,
  useGetDebtsQuery,
  useAddDebtMutation,
  usePayDebtMutation,
  useGetDebtSummaryQuery,
  useGetCreditsQuery,
  useAddCreditMutation,
  useGetCreditSummaryQuery,
  useRegisterMutation,
  useLoginMutation
} = api;
