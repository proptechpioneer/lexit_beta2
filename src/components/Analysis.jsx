import { calculateDisasterMetric, calcTYGatzncgt, calcTYGatzhalfcgt, calcTYGatfullncgt } from "../utils/analysis";
import { equityAnalysis, calcTYGat40cgt, calcTYGatzhalf40cgt, calcTYGatfull40cgt } from "../utils/equityAnalysis";
import { useAuth } from "../context/AuthContext.jsx";

export default function Analysis() {
    const { globalData } = useAuth();
    const propertyData = globalData && globalData.propertyData;

    if (!propertyData) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h3>No property data found.</h3>
                <p>Please complete the property form to see your analysis.</p>
            </div>
        );
    }
    // Disaster metrics
    // console.log("propData:", propData);
    // const globalData = propData.globalData;
    
    const disasterMetrics = calculateDisasterMetric(propertyData);
    // console.log("globalData:", globalData);
    // console.log("propertyData:", propertyData);
    
    const monthly = disasterMetrics.returnDisasterMonthly;
    // console.log("Disaster Monthly:", monthly);
    
    const aggregate = disasterMetrics.returnDisasterAggregate;

    // Growth/capital analysis (standard CGT)
    const analysisResults = calcTYGatzncgt(propertyData);
    const { netReturnAfterCostsFinal, notionalEquity, returnOnEquity } = analysisResults;

    const analysisResultsHalfCgt = calcTYGatzhalfcgt(propertyData);
    const { growthRateHalfCgt, netReturnAfterCostsFinalHalfCgt, notionalEquityHalfCgt, returnOnEquityHalfCgt } = analysisResultsHalfCgt;

    const analysisResultsFullCgt = calcTYGatfullncgt(propertyData);
    const { growthRateFullCgt, netReturnAfterCostsFinalFullCgt, notionalEquityFullCgt, returnOnEquityFullCgt } = analysisResultsFullCgt;

    //BUG HUNTING FOR THE NRAT
    const cashflowData = equityAnalysis(propertyData);

    // Only use the first 10 years (exclude summary row)
    const first10 = cashflowData.slice(0, 10);  
    
    // DE-BUGGING 
    // Log each year's netIncomeAfterTax for debugging
    // first10.forEach((row, index) => {
    // console.log(`Year ${index + 1}`, row.netIncomeAfterTax);
    // });

    const totalNetIncomeAfterTax = first10.reduce((sum, row) => sum + (row.netIncomeAfterTax || 0), 0);
    const annualTotalNetIncomeAfterTax = totalNetIncomeAfterTax / 10;

    // Forecast Total Return 10 Years (Standard CGT)
    const TTRATat0 = totalNetIncomeAfterTax + netReturnAfterCostsFinal;
    const TTRATat17 = totalNetIncomeAfterTax + netReturnAfterCostsFinalHalfCgt;
    const TTRATat34 = totalNetIncomeAfterTax + netReturnAfterCostsFinalFullCgt;

    const AARoEa0 = ((TTRATat0 / notionalEquity) * 100) / 10;
    const AARoE17 = ((TTRATat17 / notionalEquityHalfCgt) * 100) / 10;
    const AARoE34 = ((TTRATat34 / notionalEquityFullCgt) * 100) / 10;

    // CGT at 40% scenario
    const analysisResults2 = calcTYGat40cgt(propertyData);
    const { netReturnAfterCostsFinal2, notionalEquity2, returnOnEquity2 } = analysisResults2;

    const analysisResultsHalfCgt2 = calcTYGatzhalf40cgt(propertyData);
    const { growthRateHalfCgt2, netReturnAfterCostsFinalHalfCgt2, notionalEquityHalfCgt2, returnOnEquityHalfCgt2 } = analysisResultsHalfCgt2;

    const analysisResultsFullCgt2 = calcTYGatfull40cgt(propertyData);
    const { growthRateFullCgt2, netReturnAfterCostsFinalFullCgt2, notionalEquityFullCgt2, returnOnEquityFullCgt2 } = analysisResultsFullCgt2;

    const TTRATat02 = totalNetIncomeAfterTax + netReturnAfterCostsFinal2;
    const TTRATat172 = totalNetIncomeAfterTax + netReturnAfterCostsFinalHalfCgt2;
    const TTRATat342 = totalNetIncomeAfterTax + netReturnAfterCostsFinalFullCgt2;

    const AARoEa02 = ((TTRATat02 / notionalEquity2) * 100) / 10;
    const AARoE172 = ((TTRATat172 / notionalEquityHalfCgt2) * 100) / 10;
    const AARoE342 = ((TTRATat342 / notionalEquityFullCgt2) * 100) / 10;

    return (
        <div className="w-full bg-gray-100 py-8 px-4 md:px-0">
          <div className="flex justify-center">
            <div className="max-w-[1000px] w-full flex flex-col bg-white p-4 md:p-8 rounded-xl shadow">
            <div className="flex items-center">
            <img src="/diagram.png" alt="Diagram Icon" className="w-auto md:h-10 inline-block h-8 mr-2" />
            <h1 className="font-Archivo text-deepblue text-lg md:text-xl lg:text-2xl xl:text-3xl">Forecast Capital Growth</h1>                  
            </div>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg xl:text-xl mt-2">
            This section provides an analysis of the capital growth forecast for the property, including historical trends and future projections.
            </p>

            <br></br>
            
            <h2 className="font-Archivo text-xl md:text-2xl font-semibold text-blue-900 mt-8 mb-2 tracking-tight">
            Growth Analysis
            </h2>
            <br></br>
            
            {/* Growth Analysis Table - Responsive & Scrollable */}
            <div className="w-full overflow-x-auto">
            <table className="cashflow-table min-w-[700px] w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Annual Growth Rate (%)</th>
                <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Forecast Net Capital Growth (£)</th>
                <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Notional Equity (£)</th>
                <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Notional Return on Equity (%) p.a.</th>
              </tr>
            </thead>
    
            <tbody>
              <tr className="even:bg-gray-50">
                <td className="py-2 px-3 border-b border-gray-200 text-center">0</td>
                <td className={`py-2 px-3 border-b border-gray-200 text-center ${netReturnAfterCostsFinal < 0 ? 'font-bold text-red-600' : ''}`}>
                {netReturnAfterCostsFinal ? netReturnAfterCostsFinal.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 border-b border-gray-200 text-center ${notionalEquity < 0 ? 'font-bold text-red-600' : ''}`}>
                {notionalEquity ? notionalEquity.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${returnOnEquity < 0 ? 'text-red-600' : ''}`}>
                {returnOnEquity ? returnOnEquity.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>
              </tr>
              
              <tr className="even:bg-gray-50">
                <td className="py-2 px-3 border-b border-gray-200 text-center">
                {growthRateHalfCgt ? growthRateHalfCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 border-b border-gray-200 text-center ${netReturnAfterCostsFinalHalfCgt < 0 ? 'font-bold text-red-600' : ''}`}>
                {netReturnAfterCostsFinalHalfCgt ? netReturnAfterCostsFinalHalfCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 border-b border-gray-200 text-center ${notionalEquityHalfCgt < 0 ? 'font-bold text-red-600' : ''}`}>
                {notionalEquityHalfCgt ? notionalEquityHalfCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${returnOnEquityHalfCgt < 0 ? 'text-red-600' : ''}`}>
                {returnOnEquityHalfCgt ? returnOnEquityHalfCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>
              </tr>
              
              <tr className="even:bg-gray-50">
                <td className="py-2 px-3 text-center">
                {growthRateFullCgt ? growthRateFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 text-center ${netReturnAfterCostsFinalFullCgt < 0 ? 'font-bold text-red-600' : ''}`}>
                {netReturnAfterCostsFinalFullCgt ? netReturnAfterCostsFinalFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 text-center ${notionalEquityFullCgt < 0 ? 'font-bold text-red-600' : ''}`}>
                {notionalEquityFullCgt ? notionalEquityFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
                </td>
                <td className={`py-2 px-3 font-bold text-center ${returnOnEquityFullCgt < 0 ? 'text-red-600' : ''}`}>
                {returnOnEquityFullCgt ? returnOnEquityFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </td>
              </tr>
            
            </tbody>
          </table>
        </div>

        <br></br>
        
        <h2 className="font-Archivo text-xl md:text-2xl font-semibold text-blue-900 mt-8 mb-2 tracking-tight">
        Risk Analysis
        </h2>
        
        <br></br>
        <p>What happens to your overall return, with different growth scenarions? In this section we have considered first your BtL based on different growth scenarios</p>
        
        <br></br>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base md:text-lg">
            <li><span className="font-semibold text-blue-900">Zero Growth</span></li>
            <li><span className="font-semibold text-blue-900">1.7% Average Annual Growth</span></li>
            <li><span className="font-semibold text-blue-900">3.4% Average Annual Growth
            <span className="text-gray-500 font-normal"> (England average annual growth over past 20 years)</span>
            </span>
            </li>
          </ul>
          
          <br></br>
                
      <h5 className="font-Archivo text-lg md:text-xl font-semibold text-blue-900 mt-8 mb-2 tracking-tight">
      10 Year Forecast Total Return (after tax)
      </h5>

      <div className="w-full overflow-x-auto">
        <table className="cashflow-table min-w-[700px] w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Based on Growth Rate</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">NRAT (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Capital Growth (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Total Return (after tax) (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Estimated Equity (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Avg Annual Return on Equity (%)</th>
            </tr>
          </thead>
    
          <tbody>
            <tr className="even:bg-gray-50">
              <td className="py-2 px-3 border-b border-gray-200 text-center">0%</td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${totalNetIncomeAfterTax < 0 ? 'font-bold text-red-600' : ''}`}>
              {totalNetIncomeAfterTax ? totalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${netReturnAfterCostsFinal < 0 ? 'font-bold text-red-600' : ''}`}>
              {netReturnAfterCostsFinal ? netReturnAfterCostsFinal.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${TTRATat0 < 0 ? 'font-bold text-red-600' : ''}`}>
              {TTRATat0 ? TTRATat0.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${notionalEquity < 0 ? 'font-bold text-red-600' : ''}`}>
              {notionalEquity ? notionalEquity.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${AARoEa0 < 0 ? 'text-red-600' : ''}`}>
              {AARoEa0 ? AARoEa0.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </td>
            </tr>

            <tr className="even:bg-gray-50">
              <td className="py-2 px-3 border-b border-gray-200 text-center">1.7%</td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${totalNetIncomeAfterTax < 0 ? 'font-bold text-red-600' : ''}`}>
              {totalNetIncomeAfterTax ? totalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${netReturnAfterCostsFinalHalfCgt < 0 ? 'font-bold text-red-600' : ''}`}>
              {netReturnAfterCostsFinalHalfCgt ? netReturnAfterCostsFinalHalfCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${TTRATat17 < 0 ? 'font-bold text-red-600' : ''}`}>
              {TTRATat17 ? TTRATat17.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${notionalEquityHalfCgt < 0 ? 'font-bold text-red-600' : ''}`}>
              {notionalEquityHalfCgt ? notionalEquityHalfCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${AARoE17 < 0 ? 'text-red-600' : ''}`}>
              {AARoE17 ? AARoE17.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </td>
            </tr>

            <tr className="even:bg-gray-50">
              <td className="py-2 px-3 text-center">3.4%</td>
              <td className={`py-2 px-3 text-center ${totalNetIncomeAfterTax < 0 ? 'font-bold text-red-600' : ''}`}>
              {totalNetIncomeAfterTax ? totalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 text-center ${netReturnAfterCostsFinalFullCgt < 0 ? 'font-bold text-red-600' : ''}`}>
              {netReturnAfterCostsFinalFullCgt ? netReturnAfterCostsFinalFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 text-center ${TTRATat34 < 0 ? 'font-bold text-red-600' : ''}`}>
              {TTRATat34 ? TTRATat34.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 text-center ${notionalEquityFullCgt < 0 ? 'font-bold text-red-600' : ''}`}>
              {notionalEquityFullCgt ? notionalEquityFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 font-bold text-center ${AARoE34 < 0 ? 'text-red-600' : ''}`}>
              {AARoE34 ? AARoE34.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
    <br></br>

    <h5 className="font-Archivo text-lg md:text-xl font-semibold text-blue-900 mt-8 mb-2 tracking-tight">
    10 Year Forecast Total Return (after tax) - if CGT Increases to 40%
    </h5>

    <br></br>

      <div className="w-full overflow-x-auto">
        <table className="cashflow-table min-w-[700px] w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Based on Growth Rate</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">NRAT (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Capital Growth (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Total Return (after tax) (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Estimated Equity (£)</th>
              <th className="py-2 px-3 border-b border-gray-300 font-semibold text-gray-700 text-center">Avg Annual Return on Equity (%)</th>
            </tr>
          </thead>
    
          <tbody>
            <tr className="even:bg-gray-50">
              <td className="py-2 px-3 border-b border-gray-200 text-center">0%</td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${totalNetIncomeAfterTax < 0 ? 'font-bold text-red-600' : ''}`}>
              {totalNetIncomeAfterTax ? totalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${netReturnAfterCostsFinal2 < 0 ? 'font-bold text-red-600' : ''}`}>
              {netReturnAfterCostsFinal2 ? netReturnAfterCostsFinal2.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${TTRATat02 < 0 ? 'font-bold text-red-600' : ''}`}>
              {TTRATat02 ? TTRATat02.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${notionalEquity2 < 0 ? 'font-bold text-red-600' : ''}`}>
              {notionalEquity2 ? notionalEquity2.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${AARoEa02 < 0 ? 'text-red-600' : ''}`}>
              {AARoEa02 ? AARoEa02.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </td>
            </tr>
            
            <tr className="even:bg-gray-50">
              <td className="py-2 px-3 border-b border-gray-200 text-center">1.7%</td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${totalNetIncomeAfterTax < 0 ? 'font-bold text-red-600' : ''}`}>
              {totalNetIncomeAfterTax ? totalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${netReturnAfterCostsFinalHalfCgt2 < 0 ? 'font-bold text-red-600' : ''}`}>
              {netReturnAfterCostsFinalHalfCgt2 ? netReturnAfterCostsFinalHalfCgt2.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${TTRATat172 < 0 ? 'font-bold text-red-600' : ''}`}>
              {TTRATat172 ? TTRATat172.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 text-center ${notionalEquityHalfCgt2 < 0 ? 'font-bold text-red-600' : ''}`}>
              {notionalEquityHalfCgt2 ? notionalEquityHalfCgt2.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 border-b border-gray-200 font-bold text-center ${AARoE172 < 0 ? 'text-red-600' : ''}`}>
              {AARoE172 ? AARoE172.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </td>
            </tr>
            
            <tr className="even:bg-gray-50">
              <td className="py-2 px-3 text-center">3.4%</td>
              <td className={`py-2 px-3 text-center ${totalNetIncomeAfterTax < 0 ? 'font-bold text-red-600' : ''}`}>
              {totalNetIncomeAfterTax ? totalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 text-center ${netReturnAfterCostsFinalFullCgt2 < 0 ? 'font-bold text-red-600' : ''}`}>
              {netReturnAfterCostsFinalFullCgt2 ? netReturnAfterCostsFinalFullCgt2.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 text-center ${TTRATat342 < 0 ? 'font-bold text-red-600' : ''}`}>
              {TTRATat342 ? TTRATat342.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 text-center ${notionalEquityFullCgt2 < 0 ? 'font-bold text-red-600' : ''}`}>
              {notionalEquityFullCgt2 ? notionalEquityFullCgt2.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
              </td>
              <td className={`py-2 px-3 font-bold text-center ${AARoE342 < 0 ? 'text-red-600' : ''}`}>
              {AARoE342 ? AARoE342.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br></br>
      <br></br>
            
      <div className="flex items-center">
      <img src="/calcu.png" alt="Calulcator Icon" className="w-auto md:h-10 inline-block h-8 mr-2" />
      <h1 className="font-Archivo text-deepblue text-lg md:text-xl lg:text-2xl xl:text-3xl">Disaster Scenario</h1>                  
      </div>
      
      <br></br>
      <p>Many BtL LL's only consider upside rather than downside, our disaster metric is how much cash you will need to come up with if you have a bad tenant.</p>
                
      {/* Disaster Scenario */}
      <div className="flex flex-col my-4">
      <p className="text-md font-medium mb-2">
      In Total:&nbsp;
      <span className=" text-md">
      <b>£ {aggregate ? aggregate.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
      </b></span>
      </p>
      <p className="text-md font-medium mb-2">
        Monthly:&nbsp;
        <span className="text-md ">
        <b>£ {monthly !== undefined && monthly !== null ? monthly.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}</b> 
        </span>
        &nbsp;for up to&nbsp;
        <span><b>18 months</b></span>
      </p>

      <p className="text-md mt-2">
      <span className="font-semibold">Note:</span> The figures only include basic costs to cover your mortgage; they do not include legal fees, maintenance costs or the cost of any repairs.
      </p>
      </div>

      {/* Conclusion */}
      <div className="bg-deepblue border border-blue-900 rounded-lg p-4 my-4">
      <h3 className="font-Archivo text-2xl md:text-4xl font-semibold text-white mb-3">Conclusion</h3>
      <p className="text-lg font-medium text-white mb-2">
      You currently have <span className="font-bold text-white">£
      {notionalEquityFullCgt !== undefined && notionalEquityFullCgt !== null
      ? notionalEquityFullCgt.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 })
      : 'N/A'}
      </span> in equity in your BtL.
      </p>
      <p className="text-lg font-medium text-white mb-2">
      This equity is anticipated to generate approximately <span className="font-bold text-white">
      £{annualTotalNetIncomeAfterTax ? annualTotalNetIncomeAfterTax.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'N/A'}
      </span> on average each year for the next 10 years.
      </p>
      </div>

      <br></br>

      {/* WARNING TEXT  */}
      <div className="text-md text-red mt-2">
      <span className="text-red-500 font-semibold"><b>NOTE</b><br /></span>
      <b className="text-red-500 font-semibold">
      You cannot rely on this analysis alone. It is intended to provide some insight into the potential performance of your property. You should always seek professional advice before making any financial decisions.
      </b>
      </div>

      </div>          
      </div>
  </div>   
  )
}