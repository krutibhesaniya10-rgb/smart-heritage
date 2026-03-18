"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Clock, TrendingDown, TrendingUp, Calendar, Info, Lightbulb, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts"

const sites = [
  {
    id: 1,
    name: "Ancient Temple Complex",
    image: "/images/heritage-1.jpg",
    currentCrowd: "Low",
    crowdPercent: 25,
    bestTime: "9 AM - 11 AM",
    bestTimeText: "Best time to visit this heritage site is between 9 AM and 11 AM when the crowd is lowest.",
    weeklyData: [
      { day: "Mon", crowd: 35, visitors: 1200 },
      { day: "Tue", crowd: 30, visitors: 1000 },
      { day: "Wed", crowd: 40, visitors: 1400 },
      { day: "Thu", crowd: 25, visitors: 900 },
      { day: "Fri", crowd: 55, visitors: 1900 },
      { day: "Sat", crowd: 85, visitors: 3000 },
      { day: "Sun", crowd: 90, visitors: 3200 },
    ],
    hourlyData: [
      { hour: "6 AM", crowd: 10, visitors: 50 },
      { hour: "8 AM", crowd: 20, visitors: 120 },
      { hour: "10 AM", crowd: 35, visitors: 250 },
      { hour: "12 PM", crowd: 75, visitors: 520 },
      { hour: "2 PM", crowd: 65, visitors: 450 },
      { hour: "4 PM", crowd: 50, visitors: 350 },
      { hour: "6 PM", crowd: 30, visitors: 200 },
    ],
  },
  {
    id: 2,
    name: "Royal Fortress",
    image: "/images/heritage-2.jpg",
    currentCrowd: "Moderate",
    crowdPercent: 55,
    bestTime: "3 PM - 5 PM",
    bestTimeText: "Best time to visit this fortress is between 3 PM and 5 PM during the pleasant afternoon hours.",
    weeklyData: [
      { day: "Mon", crowd: 40, visitors: 1400 },
      { day: "Tue", crowd: 35, visitors: 1200 },
      { day: "Wed", crowd: 45, visitors: 1600 },
      { day: "Thu", crowd: 40, visitors: 1400 },
      { day: "Fri", crowd: 60, visitors: 2100 },
      { day: "Sat", crowd: 90, visitors: 3200 },
      { day: "Sun", crowd: 95, visitors: 3400 },
    ],
    hourlyData: [
      { hour: "9 AM", crowd: 45, visitors: 300 },
      { hour: "10 AM", crowd: 55, visitors: 380 },
      { hour: "11 AM", crowd: 70, visitors: 490 },
      { hour: "12 PM", crowd: 80, visitors: 560 },
      { hour: "1 PM", crowd: 65, visitors: 450 },
      { hour: "3 PM", crowd: 40, visitors: 280 },
      { hour: "5 PM", crowd: 30, visitors: 200 },
    ],
  },
  {
    id: 3,
    name: "Palace of Mirrors",
    image: "/images/heritage-3.jpg",
    currentCrowd: "High",
    crowdPercent: 82,
    bestTime: "5 PM - 7 PM",
    bestTimeText: "Best time to visit this palace is between 5 PM and 7 PM during the cooler evening hours.",
    weeklyData: [
      { day: "Mon", crowd: 50, visitors: 1800 },
      { day: "Tue", crowd: 45, visitors: 1600 },
      { day: "Wed", crowd: 55, visitors: 2000 },
      { day: "Thu", crowd: 50, visitors: 1800 },
      { day: "Fri", crowd: 70, visitors: 2500 },
      { day: "Sat", crowd: 95, visitors: 3500 },
      { day: "Sun", crowd: 98, visitors: 3600 },
    ],
    hourlyData: [
      { hour: "10 AM", crowd: 55, visitors: 400 },
      { hour: "12 PM", crowd: 80, visitors: 580 },
      { hour: "2 PM", crowd: 90, visitors: 650 },
      { hour: "4 PM", crowd: 75, visitors: 540 },
      { hour: "5 PM", crowd: 45, visitors: 320 },
      { hour: "6 PM", crowd: 35, visitors: 250 },
      { hour: "7 PM", crowd: 25, visitors: 180 },
    ],
  },
]

const getCrowdColor = (percent: number) => {
  if (percent < 40) return "#22c55e" // green
  if (percent < 70) return "#eab308" // yellow
  return "#ef4444" // red
}

const getCrowdBgColor = (percent: number) => {
  if (percent < 40) return "bg-green-50 border-green-200"
  if (percent < 70) return "bg-yellow-50 border-yellow-200"
  return "bg-red-50 border-red-200"
}

const getCrowdTextColor = (percent: number) => {
  if (percent < 40) return "text-green-600"
  if (percent < 70) return "text-yellow-600"
  return "text-red-600"
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
    const crowdLevel = data.crowd < 40 ? "Low" : data.crowd < 70 ? "Moderate" : "High"
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-[#d4c4a8]">
        <p className="font-semibold text-[#5e3417] mb-2">{data.hour || data.day}</p>
        <div className="space-y-1">
          <p className="text-sm flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getCrowdColor(data.crowd) }}
            />
            <span className="text-[#8c623b]">Crowd Level: <span className="font-medium">{crowdLevel}</span></span>
          </p>
          <p className="text-sm text-[#8c623b]">Capacity: <span className="font-medium">{data.crowd}%</span></p>
          <p className="text-sm text-[#8c623b]">Est. Visitors: <span className="font-medium">~{data.visitors.toLocaleString()}</span></p>
        </div>
      </div>
    )
  }
  return null
}

export default function CrowdDashboard() {
  const [selectedSite, setSelectedSite] = useState(sites[0])
  const [viewType, setViewType] = useState<"daily" | "weekly">("daily")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Site Selector - Mobile Dropdown */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 rounded-xl bg-white border-2 border-[#d4c4a8] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image src={selectedSite.image} alt={selectedSite.name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#5e3417]">{selectedSite.name}</p>
                  <span className={`text-xs font-medium ${getCrowdTextColor(selectedSite.crowdPercent)}`}>
                    {selectedSite.currentCrowd} Crowd
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#8c623b] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#d4c4a8] shadow-lg z-10 overflow-hidden">
                {sites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => {
                      setSelectedSite(site)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-[#f9edd2] transition-colors ${
                      selectedSite.id === site.id ? "bg-[#f9edd2]" : ""
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                      <Image src={site.image} alt={site.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-[#5e3417] text-sm">{site.name}</p>
                      <span className={`text-xs ${getCrowdTextColor(site.crowdPercent)}`}>
                        {site.currentCrowd}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Site Selector - Desktop Cards */}
        <div className="hidden md:flex gap-4 overflow-x-auto pb-4 mb-8">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`flex-shrink-0 w-80 p-4 rounded-2xl border-2 transition-all hover:shadow-lg ${
                selectedSite.id === site.id
                  ? "border-[#5e3417] bg-[#f9edd2] shadow-md"
                  : "border-[#d4c4a8] bg-white hover:border-[#8c623b]"
              }`}
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={site.image} alt={site.name} fill className="object-cover" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-[#5e3417] mb-2">{site.name}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getCrowdBgColor(site.crowdPercent)} ${getCrowdTextColor(site.crowdPercent)}`}>
                    <span 
                      className="w-2.5 h-2.5 rounded-full animate-pulse" 
                      style={{ backgroundColor: getCrowdColor(site.crowdPercent) }}
                    />
                    {site.currentCrowd} ({site.crowdPercent}%)
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Chart Card */}
        <Card className="bg-white border-[#d4c4a8] shadow-xl rounded-3xl overflow-hidden mb-8">
          <CardHeader className="border-b border-[#d4c4a8] bg-gradient-to-r from-[#f9edd2] to-[#f9edd2]/50 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl text-[#5e3417] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5e3417] flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  Crowd Prediction
                </CardTitle>
                <p className="text-[#8c623b] mt-2 ml-13">{selectedSite.name}</p>
              </div>
              <div className="flex gap-2 bg-white p-1 rounded-xl border border-[#d4c4a8]">
                <Button
                  size="sm"
                  onClick={() => setViewType("daily")}
                  className={`rounded-lg px-4 ${viewType === "daily" 
                    ? "bg-[#5e3417] text-white hover:bg-[#5e3417]/90" 
                    : "bg-transparent text-[#5e3417] hover:bg-[#f9edd2]"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Today
                </Button>
                <Button
                  size="sm"
                  onClick={() => setViewType("weekly")}
                  className={`rounded-lg px-4 ${viewType === "weekly" 
                    ? "bg-[#5e3417] text-white hover:bg-[#5e3417]/90" 
                    : "bg-transparent text-[#5e3417] hover:bg-[#f9edd2]"
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  This Week
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            {/* Chart */}
            <div className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                {viewType === "daily" ? (
                  <BarChart 
                    data={selectedSite.hourlyData} 
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5e3417" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8c623b" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc0" vertical={false} />
                    <XAxis 
                      dataKey="hour" 
                      tick={{ fill: '#8c623b', fontSize: 12 }}
                      axisLine={{ stroke: '#d4c4a8' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#8c623b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9edd2', opacity: 0.5 }} />
                    <Bar 
                      dataKey="crowd" 
                      radius={[8, 8, 0, 0]}
                      maxBarSize={45}
                    >
                      {selectedSite.hourlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getCrowdColor(entry.crowd)} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <AreaChart 
                    data={selectedSite.weeklyData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5e3417" stopOpacity={0.3}/>
                        <stop offset="100%" stopColor="#8c623b" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc0" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: '#8c623b', fontSize: 12 }}
                      axisLine={{ stroke: '#d4c4a8' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#8c623b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      formatter={() => <span className="text-[#5e3417] text-sm">Crowd Level</span>}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="crowd" 
                      stroke="#5e3417" 
                      strokeWidth={3}
                      fill="url(#areaGradient)"
                      dot={{ fill: '#5e3417', strokeWidth: 2, r: 5, stroke: '#fff' }}
                      activeDot={{ r: 8, fill: '#8c623b', stroke: '#fff', strokeWidth: 2 }}
                      name="Crowd Level"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 pt-6 border-t border-[#e8dcc0]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-green-700 font-medium">Low (0-40%)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-yellow-700 font-medium">Moderate (40-70%)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-red-700 font-medium">High (70-100%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Time Info Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 rounded-2xl mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-green-800 text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Best Time to Visit
                </h3>
                <p className="text-green-700 mt-2 text-base leading-relaxed">{selectedSite.bestTimeText}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-green-700 font-semibold">
                  <Clock className="w-4 h-4" />
                  Recommended: {selectedSite.bestTime}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="border-[#d4c4a8] rounded-2xl shadow-lg overflow-hidden">
          <CardHeader className="bg-[#f9edd2]/50 border-b border-[#d4c4a8]">
            <CardTitle className="flex items-center gap-2 text-[#5e3417]">
              <TrendingDown className="w-5 h-5 text-green-500" />
              Tips for Avoiding Crowds
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5e3417]">Visit Early Morning</p>
                    <p className="text-[#8c623b] text-sm mt-1 leading-relaxed">
                      Arrive when sites open (6-8 AM) for the quietest experience and best photos
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5e3417]">Choose Weekdays</p>
                    <p className="text-[#8c623b] text-sm mt-1 leading-relaxed">
                      Monday to Thursday typically has 40% fewer visitors than weekends
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5e3417]">Avoid Peak Hours</p>
                    <p className="text-[#8c623b] text-sm mt-1 leading-relaxed">
                      11 AM to 2 PM is typically the busiest time at most heritage sites
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 rounded-xl bg-[#f9edd2]/50 border border-[#d4c4a8]">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#8c623b] mt-0.5" />
                <p className="text-sm text-[#8c623b] leading-relaxed">
                  <span className="font-medium text-[#5e3417]">Pro Tip:</span> Our crowd predictions are based on historical data and real-time visitor counts. 
                  For the most accurate information, check back on the day of your visit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
