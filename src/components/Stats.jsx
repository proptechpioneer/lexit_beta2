import { useState } from "react";
import { calculateValue, calculatemonthlyIncome, calculateGrossYield, calculateNetYield, calculateOpexLoad, calculateDscr, calculateNrat, } from "../utils/index.js";
import { grossYieldStatusLevels, netYieldStatusLevels, dscrStatusLevels, opexStatusLevels, nratStatusLevels } from "../utils/status";
import { useAuth } from "../context/AuthContext";


// EXPLAINER MODALS
function InfoModal({ open, onClose, title, children, className = "" }) {
    if (!open) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content${className ? " " + className : " small"}`} onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h3>{title}</h3>
                <div>{children}</div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                    <button
                        onClick={onClose}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-bpurple to-fuchsia-600 text-white rounded-md shadow hover:from-fuchsia-600 hover:to-bpurple transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-bpurple"
                        onMouseOver={e => e.currentTarget.style.background = "#2a2a6a"}
                        onMouseOut={e => e.currentTarget.style.background = "#6c63ff"}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// ASSUMPTIONS MODAL
const assumptionsContent = (
    <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "0.5rem 0" }}>
        {/* <h4 style={{ marginTop: 0 }}>Assumptions</h4> */}
        <p> To reduce the number of inputs required, this financial model makes several assumptions, which are outlined below.
        <br /><br />
        This analysis will not work unless you complete all questions in the form.</p>
        
                <ol>
                    <li>
                    <b>EPC Rating:</b> We assume that landlords will eventually be required to get their property to an EPC level of C. The model assumes this will have a direct capital impact and is unlikely to be tax-deductible. The budgets for upgrading are as follows:
                    <br /><br />
                    <ul>
                    <li>D: £10,000</li>
                    <li>E: £20,000</li>
                    <li>F: £30,000</li>
                    <li>G: £50,000</li>
                    </ul>
                    </li>
                    <br /><br />
                    <li>
                    <b>Vacancy Rate:</b> Over the next 10 years, it is likely you will have several tenants. This model assumes the property will be vacant for an average of 2 weeks per year, including any time required for EPC upgrades.
                    </li>
                    <br /><br />
                    <li>
                    <b>Repairs & Maintenance:</b> Many landlords underestimate the cost of maintenance & repairs. This model assumes an annual cost equal to 3.5% of the gross annual rental income.
                    </li>
                    <br /><br />
                    <li>
                    <b>Inflation:</b> This model uses the current level of inflation in England, which is 2.80%. This rate is applied to all operating costs, except ground rent (if any) and fixed percentage costs.
                    </li>
                    <br /><br />
                    <li>
                    <b>Rental Growth:</b> Historically, UK rental growth has averaged around 3.71% annually from 1989 to 2023, with a peak of 12.90% in April 1991. In the last 10 years, average rents in the UK have increased significantly, rising by approximately £569 or 121%. While the current average annual rise in rents is around 4%, recent years have seen higher increases, reaching approximately 8%.
                    </li>
                    <br /><br />
                    <li>
                    <b>Capital Appreciation:</b> According to Land Registry house price data, house prices in the UK grew by 95% between 2004 and 2024. This model uses this growth assumption for analysis.
                    </li>
                    <br /><br />
                    <li>
                    <b>Income Tax:</b> Income taxes are calculated based on the difference in your cost of income tax, considering your property income. You need to enter your current income (excluding the property's income) for the calculation to work. It assumes the property is held in your personal name. In the event of tax losses, it carries forward the losses and offsets them against future tax liabilities.
                    </li>
                    <br /><br />
                    <li>
                    <b>SDLT:</b> Our stamp duty calculator only goes back to 1 August 1958. If your property was purchased before this date, we assume an SDLT rate of 0%. SDLT on BtLs was introduced in April 2016. If you purchased your property after this date, we apply the BtL SDLT rates.
                    </li>
                    <br /><br />
                    <li>
                    <b>Exclusions:</b> This analysis does not account for initial acquisition costs such as mortgage arrangement fees, building inspection fees, and legal fees.
                    </li>
                    <br /><br />
                    <li>
                    <b>Expenses:</b> All expenses are indexed to inflation except letting fees and ground rent (if any).
                    </li>
                    <br /><br />
                    <li>
                    <b>Disaster Metric:</b> Our disaster metric is based on your potential costs to cover 18 months of mortgage payments in the event you must evict a tenant and go through a lengthy dispute process.
                    </li>
                    <br /><br />
                    <li>
                    <b>Mortgage Expenses:</b> mortgage expenses in the model are annualised and are constant over the ten year cashflow.
                    </li>
                </ol>
    </div>
);

//STAT GRID COMPONENT FOR INDIVIDUAL STAT CARDS
function StatCard(props) {

    const {title, icon, children} = props;

    return (
        <div className="border border-gray-300 rounded-md p-4 text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h2 className="font-Archivo text-deepblue text-md md:text-md lg:text-md xl:text-lg">{title} {icon && <span className="mr-2">{icon}</span>}</h2>

            {children}
        </div>
    )
}


export default function Stats() {
    const { globalData } = useAuth();
    const [modal, setModal] = useState(false);

    if (!globalData || !globalData.propertyData) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h3>No property data found.</h3>
                <p>Please complete the property form to see your stats.</p>
            </div>
        );
    }

    const propertyData = globalData.propertyData;
    const requiredFields = [
        "purchasePrice", "initialDeposit", "estimatedMarketValue", "rentWeekly",
        "lettingFees", "serviceCharge", "groundRent", "otherCosts",
        "outstandingMortgage", "mortgageInterestRate", "mortgageYearsRemaining", "yourCurrentIncome", "dateOfPurchase", "mortgageType"
    ];
    const missingFields = requiredFields.filter(f => propertyData[f] === undefined || propertyData[f] === null || propertyData[f] === "");
    if (missingFields.length > 0) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h3>Missing property data fields.</h3>
                <p>Please complete all required fields in the property form.</p>
                <p>Missing: {missingFields.join(", ")}</p>
            </div>
        );
    }


    let increase, monthlyIncome, grossYield, netYield, opexLoad, nrat, dscr;
    let calcError = null;
    try {
        increase = calculateValue(propertyData);
        monthlyIncome = calculatemonthlyIncome(propertyData);
        grossYield = calculateGrossYield(propertyData);
        netYield = calculateNetYield(propertyData);
        dscr = calculateDscr(propertyData);
        opexLoad = calculateOpexLoad(propertyData);
        nrat = calculateNrat(propertyData);
    } catch (error) {
        calcError = err.message || "Calculation error.";
    }

    if (calcError) {
        return (
            <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
                <h3>Error calculating metrics</h3>
                <p>{calcError}</p>
            </div>
        );
    }
    
    // STATUS LEVEL INDICATORS
    const grossYieldWarningLevel = grossYield >= grossYieldStatusLevels["low"].maxLevel ?
        "low" : grossYield >= grossYieldStatusLevels["moderate"].maxLevel ? "moderate" : "high";
    const netYieldWarningLevel = netYield >= netYieldStatusLevels["low"].maxLevel ?
        "low" : netYield >= netYieldStatusLevels["moderate"].maxLevel ? "moderate" : "high";
    const dscrWarningLevel = dscr >= dscrStatusLevels["low"].maxLevel ?
        "low" : dscr >= dscrStatusLevels["moderate"].maxLevel ? "moderate" : "high";
    const opexWarningLevel = opexLoad > opexStatusLevels["high"].maxLevel ?
        "high" : opexLoad > opexStatusLevels["moderate"].maxLevel ? "moderate" : "low";
    const nratWarningLevel = nrat >= nratStatusLevels["low"].maxLevel ?
        "low" : nrat >= nratStatusLevels["moderate"].maxLevel ? "moderate" : "high";

    return (
        <div className="w-full bg-gray-100 py-8 px-4 md:px-0">
            {/* Centered content */}
            <div className="flex justify-center">
                <div className="max-w-[1000px] w-full flex flex-col bg-white p-4 md:p-8 rounded-xl shadow">
                    
                    
            {/* Black bar inside card */}
            <div className="bg-black text-2xl font-bold mb-4 rounded-md px-4 py-2 flex items-center justify-center">
            <img src="/lexit_logo_white.png" alt="Lexit Icon" className="w-auto md:h-10 inline-block h-8 mr-2" />
            </div>
                    

            {/* Assumptions Button centered on small, right on md+ */}
            <div className="flex justify-center md:justify-end mb-4">
                <button
                    className="assumptions-btn bg-gray-200 text-gray-400 font-normal px-4 py-2 rounded-sm shadow-none border border-gray-200 hover:bg-gray-300 hover:text-gray-500 transition-colors duration-150 flex items-center gap-2 text-sm"
                    onClick={() => setModal("assumptions")}
                    >
                    Assumptions
                </button>
            </div>
                                       
            {/* Heading and Address  */}
            <div>
                <h1 className="font-Archivo text-deepblue text-lg md:text-xl lg:text-2xl xl:text-3xl">Property Overview</h1>
                <h2 className="font-AnekTamil leading-loose">{propertyData.propertyAddress}</h2>
            </div>
            
            <br></br>
                   
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-md shadow-lg text-center border-t-6 border-bpurple hover:scale-105 transition-transform duration-200 overflow-hidden break-words">
            
            {/* Top Row Stats */}
            <div className="flex justify-center mb-2">


            {/* Estimated Value */}
            <span className="material-icons text-deepblue text-2xl">Estimated Value</span>
            </div>
                <div className="font-Archivo text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-bpurple mb-1">
                £{Number(propertyData.estimatedMarketValue).toLocaleString("en-GB")}
                </div>
                <p className="text-grey-300">+ £ {isNaN(Number(increase)) ? "N/A" : Number(increase).toLocaleString("en-GB")} since purchase</p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-lg text-center border-t-6 border-bpurple hover:scale-105 transition-transform duration-200 overflow-hidden break-words">
            <div className="flex justify-center mb-2">
            

            {/* Monthly Income */}
            <span className="material-icons text-deepblue text-2xl">Monthly Income</span>
            </div>
                <div className="font-Archivo text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-bpurple mb-1">
                £{Number(monthlyIncome).toLocaleString("en-GB")}
                </div>
                <p className="text-grey-300">£ rent - £ expenses</p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-lg text-center border-t-6 border-bpurple hover:scale-105 transition-transform duration-200 overflow-hidden break-words">
            <div className="flex justify-center mb-2">
            

            {/* Gross Yield */}
            <span className="material-icons text-deepblue text-2xl">Gross Yield</span>
            </div>
                <div className="font-Archivo text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-bpurple mb-1">
                {Number(grossYield).toFixed(2)}%
                </div>
                <span
                className="font-bold px-4 py-1 mb-2 rounded-full text-base border-2 shadow-md tracking-wide transition-transform duration-150 hover:scale-105"
                style={{
                color: grossYieldStatusLevels[grossYieldWarningLevel].color,
                background: grossYieldStatusLevels[grossYieldWarningLevel].background,
                borderColor: grossYieldStatusLevels[grossYieldWarningLevel].color,
                display: "inline-block",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                 }}>
                {grossYieldStatusLevels[grossYieldWarningLevel].output}
                </span>
            </div>

            <div className="bg-white p-6 rounded-md shadow-lg text-center border-t-6 border-bpurple hover:scale-105 transition-transform duration-200 overflow-hidden break-words">
            <div className="flex justify-center mb-2">
            
            {/* Net Yield  */}
            <span className="material-icons text-deepblue text-2xl">Net Yield</span>
            </div>
                <div className="font-Archivo text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-bpurple mb-1">
                {Number(netYield).toFixed(2)}%
                </div>
                <span
                className="font-bold px-4 py-1 mb-2 rounded-full text-base border-2 shadow-md tracking-wide transition-transform duration-150 hover:scale-105"
                style={{
                color: netYieldStatusLevels[netYieldWarningLevel].color,
                background: netYieldStatusLevels[netYieldWarningLevel].background,
                borderColor: netYieldStatusLevels[netYieldWarningLevel].color,
                display: "inline-block",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}>
                {netYieldStatusLevels[netYieldWarningLevel].output}
                </span>
            </div>
            </div>

            <br></br>
            <br></br>
            
            {/* Additional Info */}
            <div className="flex items-center">
            <img src="/kpis.png" alt="KPI's Icon" className="w-auto md:h-10 inline-block h-8 mr-2" />
            <h1 className="font-Archivo text-deepblue text-lg md:text-xl lg:text-2xl xl:text-3xl">KPI's</h1>
            </div>
            
            <br></br>

            {/* KPI GRID */}
            <p>Your BtL benchmarked to standard property investment <b>Key Performance Indicators.</b></p>
            <br></br>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="stats-card"></div>
                
                {/* Debt Service Coverage Ratio */}
                <StatCard
                icon={<i 
                style={{ cursor: "pointer" }}
                onClick={() => setModal("dscr")}
                className="fa-solid fa-circle-info text-bpurple"></i>}
                title="Debt Service Coverage Ratio (DSCR)">
                <div className="flex flex-col items-center">
                <span className="font-Archivo text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-bpurple mb-2">
                {dscr}
                </span>
                <span
                className="font-bold px-4 py-1 mb-2 rounded-full text-base border-2 shadow-md tracking-wide transition-transform duration-150 hover:scale-105"
                style={{
                    color: dscrStatusLevels[dscrWarningLevel].color,
                    background: dscrStatusLevels[dscrWarningLevel].background,
                    borderColor: dscrStatusLevels[dscrWarningLevel].color,
                    display: "inline-block",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                >
                {dscrStatusLevels[dscrWarningLevel].output}
                </span>
                <p className="text-gray-500 text-center text-sm mt-1">
                {dscrStatusLevels[dscrWarningLevel].description}
                </p>
                </div>
                </StatCard>
                              
                {/* Opex Load */}
                <StatCard
                icon={<i 
                style={{ cursor: "pointer" }}
                onClick={() => setModal("opexLoad")}
                className="fa-solid fa-circle-info text-bpurple"></i>}
                title="Operating Costs as a % of Rental Income (OPEX Load)">
                <div className="flex flex-col items-center">
                <span className="font-Archivo text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-bpurple mb-2">
                {opexLoad}
                </span>
                <span
                className="font-bold px-4 py-1 mb-2 rounded-full text-base border-2 shadow-md tracking-wide transition-transform duration-150 hover:scale-105"
                style={{
                    color: opexStatusLevels[opexWarningLevel].color,
                    background: opexStatusLevels[opexWarningLevel].background,
                    borderColor: opexStatusLevels[opexWarningLevel].color,
                    display: "inline-block",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                >
                {opexStatusLevels[opexWarningLevel].output}
                </span>
                <p className="text-gray-500 text-center text-sm mt-1">
                {opexStatusLevels[opexWarningLevel].description}
                </p>
                </div>
                </StatCard>

                {/* Net Return After Tax */}
                <StatCard
                icon={<i style={{ cursor: "pointer" }}
                onClick={() => setModal("nrat")} 
                className="fa-solid fa-circle-info text-bpurple"></i>}
                title="Net Return After Tax (NRAT)">
                <div className="flex flex-col items-center">
                <span className="font-Archivo text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-bpurple mb-2">
                {nrat}%
                </span>
                <span
                className="font-bold px-4 py-1 mb-2 rounded-full text-base border-2 shadow-md tracking-wide transition-transform duration-150 hover:scale-105"
                style={{
                    color: nratStatusLevels[nratWarningLevel].color,
                    background: nratStatusLevels[nratWarningLevel].background,
                    borderColor: nratStatusLevels[nratWarningLevel].color,
                    display: "inline-block",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                >
                {nratStatusLevels[nratWarningLevel].output}
                </span>
                <p className="text-gray-500 text-center text-sm mt-1">
                {nratStatusLevels[nratWarningLevel].description}
                </p>
                </div>
                </StatCard>
                </div>

            {/* Explainer Modals */}
            <InfoModal open={modal === "grossYield"} onClose={() => setModal(null)} title="Gross Yield">
                <p>Gross yield measures the total rent collected from your property compared to its estimated value. It serves as a basic indicator of your property's investment performance.</p>
            </InfoModal>
            <InfoModal open={modal === "netYield"} onClose={() => setModal(null)} title="Net Yield">
                <p>Net yield in property refers to the annual return on a property investment after deducting all associated costs, such as maintenance, insurance, and agent fees. It provides a more accurate picture of profitability compared to gross yield, which only considers rental income.
                </p>
            </InfoModal>
            <InfoModal open={modal === "dscr"} onClose={() => setModal(null)} title="Debt Service Coverage Ratio (DSCR)">
                <p>The debt service coverage ratio (DSCR) measures a landlord's ability to generate enough cash to cover mortgage obligations. A DSCR of 1.00 means the operating income matches the debt service costs exactly. Less than 1.00 indicates the landlord cannot cover the mortgage without additional capital. For instance, a DSCR of 0.95 covers only 95% of annual debt payments.</p>
            </InfoModal>
            <InfoModal open={modal === "opexLoad"} onClose={() => setModal(null)} title="OPEX Load">
                <p>OPEX Load refers to the ongoing operational expenses a landlord incurs to maintain a property, including service charges, management expenses, and maintenance costs. Effective management of OPEX Load is important for enhancing profitability and ensuring the sustainability of the investment.</p>
            </InfoModal>
            <InfoModal open={modal === "nrat"} onClose={() => setModal(null)} title="Net Return After Tax (NRAT)">
                <p>Net Return After Tax (NRAT) is the income expected from your property over the next 10 years after accounting for taxes. It reflects post-tax income, which is crucial for evaluating returns. In England, property investment is taxed differently than other investments. Landlords can incur a loss on their investment and still have a tax liability.</p>
            </InfoModal>
            <InfoModal
                open={modal === "assumptions"}
                onClose={() => setModal(null)}
                title="Assumptions"
                className="assumptions-modal"
            >
            {assumptionsContent}
            </InfoModal>
            

            {/* Modal styling and assumptions button styling */}
            <style>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(44, 46, 80, 0.32);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(2.5px);
                }
                .modal-content {
                    background: #fff;
                    border-radius: 18px;
                    min-width: 320px;
                    max-width: 95vw;
                    box-shadow: 0 8px 32px rgba(30,34,90,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
                    position: relative;
                    border: 1.5px solid #e0e4fa;
                    padding: 2.2rem 1.5rem 1.5rem 1.5rem;
                    animation: modalPopIn 0.18s cubic-bezier(.4,1.4,.6,1) 1;
                }
                .modal-content.small {
                    padding: 1.2rem 1.1rem 1.1rem 1.1rem;
                    min-width: 220px;
                    max-width: 350px;
                }
                .modal-close {
                    position: absolute;
                    top: 0.7rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2.1rem;
                    color: #444;
                    cursor: pointer;
                    transition: color 0.18s;
                    z-index: 2;
                }
                .modal-close:hover {
                    color: #6c63ff;
                }
                .modal-content h3 {
                    font-family: 'Archivo', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #2a2a6a;
                    margin-bottom: 1.1rem;
                    margin-top: 0;
                }
                @keyframes modalPopIn {
                    0% { transform: scale(0.96) translateY(20px); opacity: 0.2; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                 .assumptions-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.7em;
                    padding: 0.55rem 1.6rem;
                    font-size: 1.07rem;
                    font-weight: 500;
                    color: #6b7280; /* Tailwind gray-500 */
                    background: #f3f4f6; /* Tailwind gray-100 */
                    border: 1.5px solid #d1d5db; /* Tailwind gray-300 */
                    border-radius: 4px; /* Less rounded */
                    cursor: pointer;
                    box-shadow: none;
                    transition: background 0.18s, color 0.18s, border 0.18s;
                    outline: none;
                }
                .assumptions-btn:hover, .assumptions-btn:focus {
                    background: #e5e7eb; /* Tailwind gray-200 */
                    color: #4b5563; /* Tailwind gray-700 */
                    border-color: #d1d5db;
                }
                .assumptions-btn i {
                    color: #6b7280; /* gray icon */
            }
                .assumptions-btn:hover i, .assumptions-btn:focus i {
                    color: #fff;
                }
            `}
            </style>
            </div>
            </div>
        </div>
    )

}
