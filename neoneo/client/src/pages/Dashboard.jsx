// client/src/pages/Dashboard.jsx
import { useGetTransactionsQuery } from '../store/api'
import { DoughnutChart, BarChart, LineChart } from '../components/Chart'
import { useMemo } from 'react'

export default function Dashboard() {
  // ① Always call your query hook
  const { data: txs = [], isLoading, isError } = useGetTransactionsQuery()

  // ② Always call your memo hooks (even when loading)
  const doughnutData = useMemo(() => {
    const income  = txs.filter(t => t.type === 'income').reduce((s,t)=>s + Number(t.amount), 0)
    const expense = txs.filter(t => t.type === 'expense').reduce((s,t)=>s + Number(t.amount), 0)
    return {
      labels: ['Income','Expense'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#4ade80','#f87171'],
        hoverOffset: 10
      }]
    }
  }, [txs])

  const byMonth = useMemo(() => {
    const m = {}
    txs.forEach(t => {
      const month = t.date.slice(0,7) // "YYYY-MM"
      m[month] ??= { income: 0, expense: 0 }
      m[month][t.type] += Number(t.amount)
    })
    return Object.entries(m).sort()
  }, [txs])

  const monthlyBarData = useMemo(() => {
    const labels        = byMonth.map(([mo]) => mo)
    const incomeSeries  = byMonth.map(([,v]) => v.income)
    const expenseSeries = byMonth.map(([,v]) => v.expense)
    return {
      labels,
      datasets: [
        { label: 'Income',  data: incomeSeries,  backgroundColor: '#4ade80' },
        { label: 'Expense', data: expenseSeries, backgroundColor: '#f87171' }
      ]
    }
  }, [byMonth])

  const lineData = useMemo(() => {
    const cum = byMonth.map(([,v], i) => 
      byMonth.slice(0, i+1).reduce((sum, [,vv]) => sum + vv.income - vv.expense, 0)
    )
    return {
      labels: byMonth.map(([mo]) => mo),
      datasets: [{
        label: 'Balance',
        data: cum,
        borderColor: '#3b82f6',
        tension: 0.3,
        fill: false
      }]
    }
  }, [byMonth])

  // ③ Now handle loading/error states
  if (isLoading) return <p>Loading…</p>
  if (isError)   return <p>Error loading data</p>

  // ④ Finally render your charts
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="mb-2">Income vs Expense</h2>
          <DoughnutChart data={doughnutData} />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="mb-2">Monthly Income/Expense</h2>
          <BarChart   data={monthlyBarData} options={{ responsive:true }} />
        </div>
        <div className="md:col-span-2 p-4 bg-white rounded shadow">
          <h2 className="mb-2">Cumulative Balance</h2>
          <LineChart  data={lineData}      options={{ responsive:true }} />
        </div>
      </div>
    </div>
  )
}
