import React from 'react';

const Distribution = () => {
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-900">Overview</h1>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-700">Investment Count</div>
                    <div className="text-3xl font-bold text-gray-900">
                        13</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-700">Total Amount Committed</div>
                    <div className="text-3xl font-bold text-gray-900">$4,838,597.16</div>
                    <div className="text-green-500">View Currency Allocation</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">Total Distributed</div>
                    <div className="text-3xl font-bold text-gray-900">
                        $2,681,986.4</div>
                    <div className="text-green-500">View Currency Allocation</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">Annualized COC 2023</div>
                    <div className="text-3xl font-bold text-gray-900">
                        545.48%</div>
                    <div className="text-gray-500">2022 COC: 249.94%</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">ROE</div>
                    <div className="text-3xl font-bold text-gray-900">
                        55.43%</div>
                    <div className="text-gray-500">2024
                        ROI: 34.32%</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">Yield</div>
                    <div className="text-3xl font-bold text-gray-900">
                        34.32%</div>
                </div>
            </div>
        </div>
    );
}

export default Distribution;
