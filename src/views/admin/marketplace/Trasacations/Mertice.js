import React from 'react';
import { UnderlineTabs } from './Tabs';

const Metrics = () => {
    return (
        <div className="min-h-screen p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-900">Overview</h1>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-700 text-sm">Total Amount Committed</div>
                    <div className="text-lg font-bold text-gray-900">$4,838,597.16</div>
                    <div className="text-indigo-500 text-sm">View Currency Allocation</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500 text-sm">Total Distributed</div>
                    <div className="text-lg font-bold text-gray-900">
                        $2,681,986.4</div>
                    <div className="text-indigo-500 text-sm">View Currency Allocation</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500 text-sm">ROE</div>
                    <div className="text-lg font-bold text-gray-900">
                        55.43%</div>
                    <div className="text-gray-500 text-sm">2024
                        ROI: 34.32%</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500 text-sm">Yield</div>
                    <div className="text-lg font-bold text-gray-900">
                        34.32%</div>
                </div>
            </div>
            <div className="container mx-auto mt-6">
                <UnderlineTabs />
            </div>
        </div>
    );
}

export default Metrics;
