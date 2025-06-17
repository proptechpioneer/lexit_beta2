import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { calculateCashflowData } from "../utils/cashflow";
import { useAuth } from "../context/AuthContext";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, ChartDataLabels);

export default function Cashflow() {
    const { globalData } = useAuth();
    const [showModal, setShowModal] = useState(false);

    // Use dynamic property data from Firebase

    const propertyData = globalData && globalData.propertyData;

    if (!propertyData) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h3>No property data found.</h3>
                <p>Please complete the property form to see your cashflow forecast.</p>
            </div>
        );
    }


    const cashflowData = calculateCashflowData(propertyData);

    // Only use the first 10 years
    const first10 = cashflowData.slice(0, 10);

    // Calculate the total net income after tax for all rows
    const totalNetIncomeAfterTax = first10.reduce((sum, row) => sum + (row.netIncomeAfterTax || 0), 0);

    // Helper to show label only on last point
    const lastIndex = first10.length - 1;

    // Prepare data for the line chart (all 5 lines)
    const chartData = {
        labels: first10.map(row => `Year ${row.year}`),
        datasets: [
            {
            label: "Gross Rental Income (£)",
            data: first10.map(row => row.grossRentalIncome || 0),
            borderColor: "#007bff",
            backgroundColor: "#007bff33",
            fill: false,
            tension: 0.2,
            datalabels: {
                align: "right",
                anchor: "end",
                display: ctx => ctx.dataIndex === lastIndex,
                formatter: () => "Gross Rental Income",
                color: "#007bff",
                font: { weight: "bold" }
                }
            },
            {
            label: "Total Operating Expenses (£)",
            data: first10.map(row => row.totalOperatingExpenses || 0),
            borderColor: "#dc3545",
            backgroundColor: "#dc354533",
            fill: false,
            tension: 0.2,
            datalabels: {
                align: "right",
                anchor: "end",
                display: ctx => ctx.dataIndex === lastIndex,
                formatter: () => "Operating Expenses",
                color: "#dc3545",
                font: { weight: "bold" }
                }
            },
            {
            label: "Mortgage Expenses (£)",
            data: first10.map(row => row.mortgageExpense || 0),
            borderColor: "#ffc107",
            backgroundColor: "#ffc10733",
            fill: false,
            tension: 0.2,
            datalabels: {
                align: "right",
                anchor: "end",
                display: ctx => ctx.dataIndex === lastIndex,
                formatter: () => "Mortgage",
                color: "#ffc107",
                font: { weight: "bold" }
                }
            },
            {
            label: "Tax Payable (£)",
            data: first10.map(row => row.taxPayable || 0),
            borderColor: "#28a745",
            backgroundColor: "#28a74533",
            fill: false,
            tension: 0.2,
            datalabels: {
                align: "right",
                anchor: "end",
                display: ctx => ctx.dataIndex === lastIndex,
                formatter: () => "Tax Payable",
                color: "#28a745",
                font: { weight: "bold" }
                }
            },
            {
            label: "Net Income After Tax (£)",
            data: first10.map(row => row.netIncomeAfterTax || 0),
            borderColor: "#6f42c1",
            backgroundColor: "#6f42c133",
            fill: false,
            tension: 0.2,
            datalabels: {
                align: "right",
                anchor: "end",
                display: ctx => ctx.dataIndex === lastIndex,
                formatter: () => "Net Income",
                color: "#6f42c1",
                font: { weight: "bold" }
                }
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        let value = context.parsed.y !== undefined ? context.parsed.y : context.raw;
                        return `${label}: £${Math.round(value).toLocaleString()}`;
                    }
                }
            },
            datalabels: {
                clip: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { callback: value => `£${value.toLocaleString()}` },
                grid: {
                    color: ctx => ctx.tick.value === 0 ? "#000" : "#e5e5e5",
                    lineWidth: ctx => ctx.tick.value === 0 ? 2 : 1
                }
            }
        }
    };

    return (
        <div className="w-full bg-gray-100 py-8 px-4 md:px-0">
            <div className="flex justify-center">
                <div className="max-w-[1000px] w-full flex flex-col bg-white p-4 md:p-8 rounded-xl shadow">
                    <div className="flex items-center">
                    <img src="/bars-2.png" alt="Cashflow Icon" className="w-auto md:h-10 inline-block h-8 mr-2" />
                    <h1 className="font-Archivo text-deepblue text-lg md:text-xl lg:text-2xl xl:text-3xl">Forecast 10 Year Cashflow</h1>                  
                    </div>
                    
                    <br />
                    <p>A ten-year forecast of the anticipated annual cash flow generated by your BtL, including your potential tax liabilities.</p>
                    <br />
                    
                    <p>Over the next ten years, your BtL is forecast to generate&nbsp;<span><b
                            className={
                            totalNetIncomeAfterTax < 0
                                ? "text-red-600"
                                : "text-green-700"
                            }
                        >
                            £ {totalNetIncomeAfterTax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </b>
                        &nbsp;in net income (after tax) in total.
                        </span>
                    </p>

                    <br />
                    
                    {/* Modal open button */}
                    <div className="flex justify-start mb-2">
                        <button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
                        onClick={() => setShowModal(true)}
                        >
                        <i className="fa-solid fa-signal"></i>
                        Graph
                        </button>
                    </div>

                    <br />
                    
                    {/* Responsive Table */}
                    <div className="w-full overflow-x-auto rounded-lg shadow-sm">
                        <table className="min-w-[700px] border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-blue-50 text-blue-900">
                                    <th className="py-3 px-2 font-semibold border-b border-gray-200 text-center"></th>
                                    <th className="py-3 px-2 font-semibold border-b border-gray-200 text-center">Gross Rental Income (£)</th>
                                    <th className="py-3 px-2 font-semibold border-b border-gray-200 text-center">Total Operating Expenses (£)</th>
                                    <th className="py-3 px-2 font-semibold border-b border-gray-200 text-center">Mortgage Expenses (£)</th>
                                    <th className="py-3 px-2 font-semibold border-b border-gray-200 text-center">Tax Payable (£)</th>
                                    <th className="py-3 px-2 font-semibold border-b border-gray-200 text-center">Net Income After Tax (£)</th>
                                </tr>
                            </thead>
                            
                        <tbody>
                            {first10.map((row, idx) => (
                                <tr key={row.year} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50"}>
                                    <td className="py-2 px-2 border-b border-gray-100 text-center">{row.year}</td>
                                    <td className={`py-2 px-2 border-b border-gray-100 text-center ${row.grossRentalIncome < 0 ? "font-bold text-red-600" : ""}`}>
                                    {row.grossRentalIncome !== null ? Math.round(row.grossRentalIncome).toLocaleString() : "-"}
                                    </td>
                                    <td className={`py-2 px-2 border-b border-gray-100 text-center ${row.totalOperatingExpenses < 0 ? "font-bold text-red-600" : ""}`}>
                                    {row.totalOperatingExpenses !== null ? Math.round(row.totalOperatingExpenses).toLocaleString() : "-"}
                                    </td>
                                    <td className={`py-2 px-2 border-b border-gray-100 text-center ${row.mortgageExpense < 0 ? "font-bold text-red-600" : ""}`}>
                                    {row.mortgageExpense !== null ? Math.round(row.mortgageExpense).toLocaleString() : "-"}
                                    </td>
                                    <td className={`py-2 px-2 border-b border-gray-100 text-center ${row.taxPayable < 0 ? "font-bold text-red-600" : ""}`}>
                                    {row.taxPayable !== null ? Math.round(row.taxPayable).toLocaleString() : "-"}
                                    </td>
                                    <td className={`py-2 px-2 border-b border-gray-100 text-center font-bold ${row.netIncomeAfterTax < 0 ? "text-red-600" : "text-green-700"}`}>
                                    {row.netIncomeAfterTax !== null ? row.netIncomeAfterTax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "-"}
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                        </table>
                    </div>

                    <p className="mt-4"><b>Note: The figures above are estimates and should be considered a guide only. Please consult your accountant or financial advisor for more accurate calculations.</b></p>
                  
                    <div className="w-full bg-red-200 text-red rounded p-4 mt-4">
                    <div className="flex items-center mb-2">
                    <img src="target.png" alt="Risk" className="w-6 h-6 mr-2" />
                    <b className="text-red-600" >Risk Considerations</b>
                    </div>
                    <p className="text-red-600">Vacancy rate assumed of 3.85% p.a.</p>
                    <p className="text-red-600" >Repairs and management assumed at 3.50% p.a.</p>
                    <p className="text-red-600">Costs are increase in-line with assumed inflation of 2.80% p.a.</p>
                    <p className="text-red-600">Rent is increased annually at 3.71% p.a.</p>
                    <p className="text-red-600">Property is assumed to grow annually at 3.40% p.a.</p>
                    <p className="text-red-600">Taxes are based on UK income tax rates as at 1 June 2025 (no allowances made for NI or any other allowances).</p>
                    </div>

                {/* Modal for line chart */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="relative bg-white rounded-xl shadow-xl p-6 md:p-10 w-full max-w-5xl mx-2 overflow-y-auto">
                    {/* Close button (top right) */}
                    <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    aria-label="Close"
                    >
                    &times;
                    </button>
                    
                    <h3 className="text-center text-2xl font-semibold mb-6 mt-2">10 Year Cashflow (forecast)</h3>
                    <div className="w-full overflow-x-auto">
                    <div className="min-w-[700px] max-w-[1300px]">
                    <Line data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
                    </div>
                    </div>
                    
                    {/* Close button (bottom center) */}
                    <div className="flex justify-center mt-8">
                    <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-bpurple to-fuchsia-600 text-white rounded-md shadow hover:from-fuchsia-600 hover:to-bpurple transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-bpurple"
                    >
                    Close
                    </button>
                    </div>
                    </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}