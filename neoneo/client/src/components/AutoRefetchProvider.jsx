// client/src/components/AutoRefetchProvider.jsx
import { useCallback } from 'react'
import {
  useGetTransactionsQuery,
  useGetBudgetsQuery,
  useGetBudgetSummaryQuery
} from '../store/api'

export default function AutoRefetchProvider({ children }) {
  // we use `skip: true` so these hooks don't fetch immediately on mount
  const { refetch: refetchTransactions } = useGetTransactionsQuery(undefined, { skip: true })
  const { refetch: refetchBudgets      } = useGetBudgetsQuery(undefined,      { skip: true })
  const { refetch: refetchSummary      } = useGetBudgetSummaryQuery(undefined,{ skip: true })

  const clickHandler = useCallback(
    (e) => {
      if (e.target.tagName === 'BUTTON') {
        // refetch all
        refetchTransactions()
        refetchBudgets()
        refetchSummary()
      }
    },
    [refetchTransactions, refetchBudgets, refetchSummary]
  )

  return <div onClick={clickHandler}>{children}</div>
}
