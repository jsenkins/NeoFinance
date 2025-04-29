// client/src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: [
    'Transactions',
    'Budgets',
    'Summary',        // budget summary
    'Bills',
    'Debts',
    'DebtSummary',
    'Credits',
    'CreditSummary'
  ],
  endpoints: builder => ({
    // Transactions
    getTransactions: builder.query({
      query: () => '/transactions',
      providesTags: ['Transactions']
    }),
    addTransaction: builder.mutation({
      query: data => ({ url: '/transactions', method: 'POST', body: data }),
      invalidatesTags: ['Transactions']
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
      invalidatesTags: ['Budgets', 'Summary']
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
      query: debt => ({
        url: '/finance/debts',
        method: 'POST',
        body: debt
      }),
      invalidatesTags: ['Debts', 'DebtSummary']
    }),
    payDebt: builder.mutation({
      query: ({ id, amount }) => ({
        url: `/finance/debts/${id}/pay`,
        method: 'POST',
        body: { amount }
      }),
      invalidatesTags: ['Debts', 'DebtSummary', 'Transactions']
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
      query: credit => ({
        url: '/finance/credits',
        method: 'POST',
        body: credit
      }),
      invalidatesTags: ['Credits', 'CreditSummary']
    }),
    getCreditSummary: builder.query({
      query: () => '/finance/credits/summary',
      providesTags: ['CreditSummary']
    })
  })
});

export const {
  // Transactions hooks
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useSearchTransactionsQuery,

  // Budgets hooks
  useGetBudgetsQuery,
  useAddBudgetMutation,
  useGetBudgetSummaryQuery,

  // Contacts hooks
  useGetContactsQuery,

  // Export hooks
  useExportPDFQuery,
  useExportCSVQuery,

  // Bills hooks
  useGetBillsQuery,
  useAddBillMutation,
  useDelBillMutation,

  // Debts hooks
  useGetDebtsQuery,
  useAddDebtMutation,
  usePayDebtMutation,
  useGetDebtSummaryQuery,

  // Credit hooks
  useGetCreditsQuery,
  useAddCreditMutation,
  useGetCreditSummaryQuery
} = api;
