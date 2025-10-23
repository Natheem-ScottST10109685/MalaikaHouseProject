import React from 'react';

const PaymentGateway = () => {
    const overviewStats = [
        {
            icon: '💰',
            value: 'R98,350',
            label: 'Monthly Revenue',
            trend: '+5.2% from last month'
        },
        {
            icon: '📊',
            value: '156',
            label: 'Transactions',
            trend: '+12% this month'
        },
        {
            icon: '✅',
            value: '98.7%',
            label: 'Success Rate',
            trend: '+0.3% improvement'
        },
        {
            icon: '⏱️',
            value: '2.3s',
            label: 'Avg Processing',
            trend: '-0.2s faster'
        },
        {
            icon: '🔒',
            value: '100%',
            label: 'Security Score',
            trend: 'Fully compliant'
        }
    ];

    const paymentMethods = [
        {
            id: 1,
            icon: '💳',
            name: 'Credit/Debit Cards',
            description: 'Visa, Mastercard, American Express',
            stats: '89% of transactions • R87,450 this month',
            active: true
        },
        {
            id: 2,
            icon: '🏧',
            name: 'EFT Bank Transfer',
            description: 'Direct bank transfers',
            stats: '8% of transactions • R7,850 this month',
            active: true
        },
        {
            id: 3,
            icon: '📱',
            name: 'Mobile Payments',
            description: 'SnapScan, Zapper, Apple Pay',
            stats: '3% of transactions • R3,050 this month',
            active: true
        },
        {
            id: 4,
            icon: 'PP',
            name: 'PayPal',
            description: 'International payment option',
            stats: 'Not yet configured',
            active: false
        }
    ];

    const transactions = [
        {
            id: 1,
            type: 'success',
            details: 'Heart Program - Sarah Mitchell',
            meta: 'Card ending •••• 4532 • Successful',
            amount: 'R850.00',
            time: '2 min ago'
        },
        {
            id: 2,
            type: 'success',
            details: 'Malaika Sessions - Rodriguez Family',
            meta: 'EFT Transfer • Successful',
            amount: 'R580.00',
            time: '15 min ago'
        },
        {
            id: 3,
            type: 'pending',
            details: 'Club Access - Michael Johnson',
            meta: 'Card ending •••• 8901 • Processing',
            amount: 'R320.00',
            time: '32 min ago'
        },
        {
            id: 4,
            type: 'failed',
            details: 'Session Pass - David Chen',
            meta: 'Card ending •••• 1234 • Declined',
            amount: 'R3,200.00',
            time: '1 hour ago'
        }
    ];

    const securityItems = [
        {
            icon: '🔐',
            text: 'SSL Certificate & Encryption',
            status: 'Active - 256-bit SSL encryption'
        },
        {
            icon: '🛡️',
            text: 'PCI DSS Compliance',
            status: 'Level 1 Certified - Expires Dec 2024'
        },
        {
            icon: '🔍',
            text: 'Fraud Detection',
            status: 'Active - 3 threats blocked today'
        },
        {
            icon: '💳',
            text: 'Tokenization',
            status: 'Enabled - No card data stored'
        }
    ];

    const gatewaySettings = [
        {
            name: 'Auto-capture',
            description: 'Automatically capture authorized payments',
            enabled: true
        },
        {
            name: 'Email Receipts',
            description: 'Send email confirmations to customers',
            enabled: true
        },
        {
            name: 'Retry Failed Payments',
            description: 'Automatically retry failed transactions',
            enabled: true
        },
        {
            name: 'Fraud Prevention',
            description: 'Enhanced security screening',
            enabled: true
        },
        {
            name: 'Test Mode',
            description: 'Use sandbox for testing',
            enabled: false
        }
    ];

    return (
        <div className="p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Payment Gateway</h1>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Process Payment
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                {overviewStats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                        <div className="text-3xl mb-3">{stat.icon}</div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                        <div className="text-sm text-green-600 mt-2">{stat.trend}</div>
                    </div>
                ))}
            </div>

            {/* Security Panel */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Security & Compliance</h2>
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        All Security Checks Passed
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {securityItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                {item.icon}
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">{item.text}</div>
                                <div className="text-sm text-green-600">{item.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Payment Methods */}
                <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Payment Methods</h2>
                        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Add Method
                        </button>
                    </div>

                    <div className="space-y-4">
                        {paymentMethods.map(method => (
                            <div
                                key={method.id}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                            >
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl">
                                    {method.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800">{method.name}</h3>
                                    <p className="text-sm text-gray-600">{method.description}</p>
                                    <p className="text-sm text-gray-500 mt-1">{method.stats}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${method.active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {method.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gateway Settings */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Gateway Settings</h2>
                    <div className="space-y-4">
                        {gatewaySettings.map((setting, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border-b">
                                <div>
                                    <h3 className="font-medium text-gray-800">{setting.name}</h3>
                                    <p className="text-sm text-gray-600">{setting.description}</p>
                                </div>
                                <div
                                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${setting.enabled ? 'right-0.5' : 'left-0.5'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent Transactions</h2>
                    <button className="text-gray-600 hover:text-gray-800">View All</button>
                </div>

                <div className="space-y-4">
                    {transactions.map(transaction => (
                        <div
                            key={transaction.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${transaction.type === 'success'
                                        ? 'bg-green-500'
                                        : transaction.type === 'pending'
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                    }`}
                            >
                                {transaction.type === 'success'
                                    ? '✓'
                                    : transaction.type === 'pending'
                                        ? '⏳'
                                        : '✗'}
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-gray-800">{transaction.details}</div>
                                <div className="text-sm text-gray-500">{transaction.meta}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-800">{transaction.amount}</div>
                                <div className="text-sm text-gray-500">{transaction.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;