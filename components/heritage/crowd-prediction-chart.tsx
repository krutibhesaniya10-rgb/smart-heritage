"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Info } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface CrowdPredictionChartProps {
  bestTime: string
}

// Mock crowd data for different hours
const hourlyData = [
  { hour: "6 AM", crowd: 15, visitors: 50 },
  { hour: "8 AM", crowd: 25, visitors: 100 },
  { hour: "10 AM", crowd: 55, visitors: 280 },
  { hour: "12 PM", crowd: 85, visitors: 520 },
  { hour: "2 PM", crowd: 70, visitors: 420 },
  { hour: "4 PM", crowd: 50, visitors: 300 },
  { hour: "6 PM", crowd: 30, visitors: 150 },
]

const weeklyData = [
  { day: "Mon", crowd: 35, visitors: 1200 },
  { day: "Tue", crowd: 30, visitors: 1000 },
  { day: "Wed", crowd: 40, visitors: 1400 },
  { day: "Thu", crowd: 28, visitors: 950 },
  { day: "Fri", crowd: 55, visitors: 1900 },
  { day: "Sat", crowd: 88, visitors: 3100 },
  { day: "Sun", crowd: 92, visitors: 3300 },
]

const getCrowdColor = (crowd: number) => {
  if (crowd < 40) return "#22c55e" // green
  if (crowd < 70) return "#eab308" // yellow
  return "#ef4444" // red
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    payload: {
      hour?: string
      day?: string
      crowd: number
      visitors: number
    }
  }>
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-[#d4c4a8]">
        <p className="font-medium text-[#5e3417] mb-1">{data.hour || data.day}</p>
        <p className="text-sm flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: getCrowdColor(data.crowd) }}
          />
          <span className="text-[#8c623b]">Crowd: {data.crowd}%</span>
        </p>
        <p className="text-sm text-[#8c623b]">~{data.visitors} visitors</p>
      </div>
    )
  }
  return null
}

export default function CrowdPredictionChart({ bestTime }: CrowdPredictionChartProps) {
  const [viewType, setViewType] = useState<"daily" | "weekly">("daily")
  const data = viewType === "daily" ? hourlyData : weeklyData
  const dataKey = viewType === "daily" ? "hour" : "day"

  return (
    <Card className="border-[#d4c4a8] rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#d4c4a8] bg-[#f9edd2]/50 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg text-[#5e3417]">
            Crowd Prediction - Best Time to Visit
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setViewType("daily")}
              className={viewType === "daily" 
                ? "bg-[#5e3417] text-white hover:bg-[#5e3417]/90" 
                : "bg-white text-[#5e3417] border border-[#d4c4a8] hover:bg-[#f9edd2]"
              }
            >
              Daily
            </Button>
            <Button
              size="sm"
              onClick={() => setViewType("weekly")}
              className={viewType === "weekly" 
                ? "bg-[#5e3417] text-white hover:bg-[#5e3417]/90" 
                : "bg-white text-[#5e3417] border border-[#d4c4a8] hover:bg-[#f9edd2]"
              }
            >
              Weekly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d4c4a8" />
              <XAxis 
                dataKey={dataKey}
                tick={{ fill: '#8c623b', fontSize: 12 }}
                axisLine={{ stroke: '#d4c4a8' }}
              />
              <YAxis 
                tick={{ fill: '#8c623b', fontSize: 12 }}
                axisLine={{ stroke: '#d4c4a8' }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="crowd" 
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCrowdColor(entry.crowd)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-[#d4c4a8]">
          <span className="flex items-center gap-2 text-sm text-[#5e3417]">
            <span className="w-3 h-3 rounded bg-green-500" />
            Low (Best)
          </span>
          <span className="flex items-center gap-2 text-sm text-[#5e3417]">
            <span className="w-3 h-3 rounded bg-yellow-500" />
            Moderate
          </span>
          <span className="flex items-center gap-2 text-sm text-[#5e3417]">
            <span className="w-3 h-3 rounded bg-red-500" />
            High (Avoid)
          </span>
        </div>

        {/* Best Time Info */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-green-800 flex items-center gap-1 text-sm">
                <Info className="w-3.5 h-3.5" />
                Best Time to Visit
              </p>
              <p className="text-green-700 text-sm mt-0.5">
                Visit during <strong>{bestTime}</strong> when the crowd is typically lowest.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
