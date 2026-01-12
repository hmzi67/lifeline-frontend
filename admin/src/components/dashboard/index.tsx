import React from 'react';
import {
    BarChart3,
    TrendingUp,
    ShoppingCart,
    CreditCard,
    PieChart,
    DollarSign,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';
import { GlowingCard, CircularProgress, StatsCard } from '../shared';
import type { RevenueData, OrderStats, TransactionData, StatData } from '@/types';

// Revenue Chart Component
export const RevenueChart: React.FC<{ data: RevenueData[] }> = ({ data }) => (
    <GlowingCard className="p-8 mb-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Total Revenue</h3>
                    <p className="text-gray-500">Monthly revenue comparison</p>
                </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-600">2022</span>
            </div>
        </div>

        <div className="relative h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            <div className="flex items-end justify-between h-full relative z-10 gap-4">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex items-end gap-2 mb-4 w-full">
                            <div
                                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                                style={{
                                    height: `${(item.current / Math.max(...data.map(d => d.current))) * 150}px`,
                                    width: '20px'
                                }}
                            />
                            <div
                                className="bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out"
                                style={{
                                    height: `${(item.previous / Math.max(...data.map(d => Math.max(d.current, d.previous)))) * 150}px`,
                                    width: '20px'
                                }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-600">{item.month}</span>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 right-6 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="font-medium text-gray-700">2021</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                    <span className="font-medium text-gray-700">2020</span>
                </div>
            </div>
        </div>
    </GlowingCard>
);

// Company Growth Component
export const CompanyGrowthCard: React.FC = () => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Company Growth</h3>
                    <p className="text-gray-500">Overall business performance</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
                <CircularProgress percentage={78} size={180} showAnimation={true} />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="font-semibold text-gray-900">2022</p>
                            <p className="text-sm text-gray-500">Current Year</p>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-gray-900">$32.5k</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-teal-600" />
                        <div>
                            <p className="font-semibold text-gray-900">2021</p>
                            <p className="text-sm text-gray-500">Previous Year</p>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-gray-900">$41.2k</span>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Company Growth Rate</p>
                    <p className="text-2xl font-bold text-green-600">62%</p>
                </div>
            </div>
        </div>
    </GlowingCard>
);

// Order Statistics Component
export const OrderStatsCard: React.FC<{ orderStats: OrderStats[] }> = ({ orderStats }) => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Order Statistics</h3>
                    <p className="text-gray-500">42.82k Total Sales</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                    <CircularProgress percentage={38} size={96} showAnimation={false} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-lg font-bold text-gray-900">38%</span>
                            <p className="text-xs text-gray-500">Weekly</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-gray-900">8,258</span>
                <span className="text-sm text-gray-500">Total Orders</span>
            </div>
        </div>

        <div className="space-y-4">
            {orderStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 ${stat.color} rounded-lg`}>
                            <stat.icon className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{stat.category}</p>
                            <p className="text-sm text-gray-500">{stat.description}</p>
                        </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                </div>
            ))}
        </div>
    </GlowingCard>
);

// Transactions Component
export const TransactionsCard: React.FC<{ transactions: TransactionData[] }> = ({ transactions }) => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Transactions</h3>
                    <p className="text-gray-500">Recent payment activities</p>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 ${transaction.color} rounded-lg`}>
                            <transaction.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{transaction.method}</p>
                            <p className="text-sm text-gray-500">{transaction.type}</p>
                        </div>
                    </div>
                    <span className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)} USD
                    </span>
                </div>
            ))}
        </div>
    </GlowingCard>
);

// Profit Report Component
export const ProfitReportCard: React.FC = () => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                    <PieChart className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Profit Report</h3>
                    <p className="text-gray-500">YEAR 2021</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">68.2%</span>
            </div>
        </div>

        <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$84,686k</span>
        </div>

        <div className="relative h-32 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 350 100" aria-label="Profit trend chart">
                <defs>
                    <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ea580c" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
                <polyline
                    fill="none"
                    stroke="url(#profitGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    points="20,70 70,50 120,60 170,40 220,45 270,30 320,35"
                />
                {[20, 70, 120, 170, 220, 270, 320].map((x, index) => {
                    const y = [70, 50, 60, 40, 45, 30, 35][index];
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#f59e0b"
                            className="drop-shadow-sm"
                        />
                    );
                })}
            </svg>
        </div>
    </GlowingCard>
);

// App Usage Stats Component
export const AppUsageStats: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard className="p-6" glowColor="rgba(239, 68, 68, 0.1)">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">Uninstalls</h4>
                    <p className="text-sm text-gray-500">App removals</p>
                </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">2,456</span>
            </div>
            <div className="flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">-14.82%</span>
            </div>
        </GlowingCard>

        <GlowingCard className="p-6" glowColor="rgba(16, 185, 129, 0.1)">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">Exercises</h4>
                    <p className="text-sm text-gray-500">Completed workouts</p>
                </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">3645</span>
            </div>
            <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+28.14%</span>
            </div>
        </GlowingCard>
    </div>
);

// Main Dashboard Component
export const DashboardComponent: React.FC<{
    statsData: StatData[];
    animatedValues: Record<string, number>
}> = ({ statsData }) => {
    const revenueData: RevenueData[] = [
        { month: 'Jan', current: 16, previous: -15 },
        { month: 'Feb', current: 4, previous: -8 },
        { month: 'Mar', current: 12, previous: -10 },
        { month: 'Apr', current: 27, previous: -15 },
        { month: 'May', current: 17, previous: -5 },
        { month: 'Jun', current: 10, previous: -18 },
        { month: 'Jul', current: 6, previous: -16 }
    ];

    const orderStats: OrderStats[] = [
        { category: 'Electronic', value: '82.5k', description: 'Mobile, Earbuds, TV', icon: TrendingUp, color: 'bg-purple-100' },
        { category: 'Fashion', value: '23.8k', description: 'T-shirt, Jeans, Shoes', icon: Activity, color: 'bg-green-100' },
        { category: 'Decor', value: '849k', description: 'Fine Art, Dining', icon: DollarSign, color: 'bg-cyan-100' },
        { category: 'Sports', value: '99', description: 'Football, Cricket Kit', icon: Activity, color: 'bg-gray-100' }
    ];

    const transactions: TransactionData[] = [
        { id: '1', type: 'Send money', method: 'Paypal', amount: 82.6, icon: CreditCard, color: 'bg-red-500' },
        { id: '2', type: "Mac'D", method: 'Wallet', amount: 270.69, icon: DollarSign, color: 'bg-purple-500' },
        { id: '3', type: 'Refund', method: 'Transfer', amount: 637.91, icon: ArrowUpRight, color: 'bg-cyan-500' },
        { id: '4', type: 'Ordered Food', method: 'Credit Card', amount: -838.71, icon: CreditCard, color: 'bg-green-500' },
        { id: '5', type: 'Starbucks', method: 'Wallet', amount: 203.33, icon: DollarSign, color: 'bg-purple-500' },
        { id: '6', type: 'Ordered Food', method: 'Mastercard', amount: -92.45, icon: CreditCard, color: 'bg-yellow-500' }
    ];

    return (
        <div className="space-y-8">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard key={index} stat={stat} index={index} />
                ))}
            </div>

            {/* Revenue Chart and Company Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevenueChart data={revenueData} />
                <CompanyGrowthCard />
            </div>

            {/* Order Stats and Profit Report */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OrderStatsCard orderStats={orderStats} />
                <ProfitReportCard />
            </div>

            {/* App Usage Stats */}
            <AppUsageStats />

            {/* Transactions */}
            <TransactionsCard transactions={transactions} />
        </div>
    );
};