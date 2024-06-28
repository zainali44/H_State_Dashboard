import React from 'react';

const Investments = () => {
    return (
        <div className="min-h-screen p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-900">Overview</h1>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-700">Investment Count</div>
                    <div className="text-2xl font-bold text-gray-900">
                        13</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-700">Total Amount Committed</div>
                    <div className="text-2xl font-bold text-gray-900">$4,838,597.16</div>
                    <div className="text-green-500">View Currency Allocation</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">Total Distributed</div>
                    <div className="text-2xl font-bold text-gray-900">
                        $2,681,986.4</div>
                    <div className="text-green-500">View Currency Allocation</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">Annualized COC 2023</div>
                    <div className="text-2xl font-bold text-gray-900">
                        545.48%</div>
                    <div className="text-gray-500">2022 COC: 249.94%</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">ROE</div>
                    <div className="text-2xl font-bold text-gray-900">
                        55.43%</div>
                    <div className="text-gray-500">2024
                        ROI: 34.32%</div>
                </div>
                <div className="card p-4 border rounded shadow">
                    <div className="text-gray-500">Yield</div>
                    <div className="text-2xl font-bold text-gray-900">
                        34.32%</div>
                </div>
            </div>

            {/* // Investment Table */}
            <div className="container mx-auto mt-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-900">Investments</h1>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg">Export</button>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <div class=" overflow-x-auto">
                        <div class="min-w-full inline-block align-middle">
                            <div class="overflow-hidden border rounded-lg border-gray-300">
                                <table class=" min-w-full  rounded-xl">
                                    <thead>
                                        <tr class="">
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50 "> Name </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900"> ID </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50"> Type </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900"> Commitment </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50"> Distributed </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900"> COC </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900 bg-gray-50"> ROI </th>
                                            <th class="p-5 whitespace-nowrap text-sm leading-4 font-bold text-gray-900"> Status </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        <tr class="bg-white">
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">John Doe</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">123456</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Equity</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$1,000,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$500,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">50%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">20%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Active</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">John Doe</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">123456</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Equity</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$1,000,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$500,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">50%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">20%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Active</td>
                                        </tr>
                                        <tr class="bg-white">
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">John Doe</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">123456</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Equity</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$1,000,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$500,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">50%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">20%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Active</td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">John Doe</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">123456</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Equity</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$1,000,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">$500,000</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">50%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">20%</td>
                                            <td class="p-5 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">Active</td>
                                        </tr>
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Investments;
