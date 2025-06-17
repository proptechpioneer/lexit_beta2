import { propertyOptions } from '../utils'
import { useState } from 'react'  
import Modal from './Modal'
import Authentication from './Authentication'  
import { useAuth } from '../context/AuthContext'
import { db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'

export default function PropertyForm(props) {

    const { isAuthenticated } = props
    
    // Modal state for income information    
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Toggle for showing form or "Analyse Again" button
    const [showForm, setShowForm] = useState(true);
    
    // State variables
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [showAdditionalPropertyOptions, setShowAdditionalPropertOptions] = useState(false);
    const [propertyAddress, setPropertyAddress] = useState("")
    const [purchasePrice, setPurchasePrice] = useState("")
    const [initialDeposit, setInitialDeposit] = useState("")
    const [dateOfPurchase, setDateOfPurchase] = useState("")
    const [estimatedMarketValue, setEstimatedMarketValue] = useState("")
    const [epcRating, setEpcRating] = useState("")
    const [numberBedrooms, setNumberBedrooms] = useState("")
    const [outstandingMortgage, setOutstandingMortgage] = useState("")
    const [mortgageType, setMortgageType] = useState("Principal and Interest")
    const [mortgageInterestRate, setMortgageInterestRate] = useState("")
    const [mortgageYearsRemaining, setMortgageYearsRemaining] = useState("")
    const [rentWeekly, setRentWeekly] = useState("")
    const [lettingFees, setLettingFees] = useState("")
    const [serviceCharge, setServiceCharge] = useState("")
    const [groundRent, setGroundRent] = useState("")
    const [otherCosts, setOtherCosts] = useState("")
    const [yourCurrentIncome, setYourCurrentIncome] = useState("")

    const { globalData, setGlobalData, globalUser } = useAuth()

    // Helper to check if a value is empty
    const isEmpty = (val) => val === "" || val === null || val === undefined

    // Shared class for input and select
    const inputSelectClass = "w-full flex-1 px-4 py-3 rounded-sm border border-gray-300 shadow hover:shadow-md transition font-semibold text-lg bg-white text-deepblue mb-6"

    async function handleSubmitForm() {
        if(!isAuthenticated) {
            setShowModal(true)
            return
        }

        //define a guard clause that only allows the form to be submitted if all fields are filled out
        if(
        isEmpty(selectedPropertyType) ||
        isEmpty(propertyAddress) ||
        isEmpty(purchasePrice) ||
        isEmpty(initialDeposit) ||
        isEmpty(dateOfPurchase) ||
        isEmpty(estimatedMarketValue) ||
        isEmpty(epcRating) ||
        isEmpty(numberBedrooms) ||
        isEmpty(outstandingMortgage) ||
        isEmpty(mortgageType) ||
        isEmpty(mortgageInterestRate) ||
        isEmpty(mortgageYearsRemaining) ||
        isEmpty(rentWeekly) ||
        isEmpty(lettingFees) ||
        isEmpty(serviceCharge) ||
        isEmpty(groundRent) ||
        isEmpty(otherCosts) ||
        isEmpty(yourCurrentIncome)
        ) {
            alert("Please fill out all fields before submitting the form.")
            return
        } 
        try {
            const propData = {
                selectedPropertyType,
                propertyAddress,
                purchasePrice: Number(purchasePrice),
                initialDeposit: Number(initialDeposit),
                dateOfPurchase,
                estimatedMarketValue: Number(estimatedMarketValue),
                epcRating,
                numberBedrooms: Number(numberBedrooms),
                outstandingMortgage: Number(outstandingMortgage),
                mortgageType,
                mortgageInterestRate: Number(mortgageInterestRate),
                mortgageYearsRemaining: Number(mortgageYearsRemaining),
                rentWeekly: Number(rentWeekly),
                lettingFees: Number(lettingFees),
                serviceCharge: Number(serviceCharge),
                groundRent: Number(groundRent),
                otherCosts: Number(otherCosts),
                yourCurrentIncome: Number(yourCurrentIncome),
                updatedAt: new Date().toISOString()
            }
            // then create a new data object

            const newGlobalData = {
                ...(globalData || {}),
                propertyData: propData
            }
            setGlobalData(newGlobalData)
            
            // Persist to Firestore (merge to avoid overwriting)
            const userRef = doc(db, "users", globalUser.uid)
            await setDoc(userRef, { propertyData: propData }, { merge: true })

            // Hide the form and show "Analyse Again" button
            setShowForm(false)
            
        } catch (err) {
            console.error(err.message)
        }
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    // Reset form and show again
    function handleAnalyseAgain() {
        setShowForm(true)
    }

    return (      
        <div className="w-full flex justify-center bg-gray-100 py-8 px-4 md:px-0">
            <div className="max-w-[1000px] w-full flex flex-col bg-white p-4 md:p-8 rounded-xl shadow">

                {showModal && (
                    <Modal handleCloseModal={handleCloseModal}>
                        <Authentication handleCloseModal={handleCloseModal}/>
                    </Modal>
                )}

                {/* Modal for Annual Income Info */}
                {showIncomeModal && (
                    <div
                        className="modal-overlay"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                    >
                        <div
                            className="modal-content bg-white p-4 md:p-8 rounded-xl text-center shadow-2xl border border-gray-200"
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                minWidth: '0',
                                boxSizing: 'border-box'
                            }}
                        >
                            <h3 className="text-xl font-bold mb-4 text-deepblue">What is "Your Annual Income"?</h3>
                            <p className="mb-2 text-gray-700">Please enter your gross annual income before tax, <u><b>excluding the income from your BtL.</b></u></p>
                            <p className="mb-2 text-gray-700">This information is required in order to accurately work out how much income tax is due to your BtL.</p>
                            <p className="mb-4 text-red-500 font-semibold">If you do not enter your income the tax calculations will not work.</p>
                            <button
                                onClick={() => setShowIncomeModal(false)}
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-bpurple to-fuchsia-600 text-white rounded-md shadow hover:from-fuchsia-600 hover:to-bpurple transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-bpurple"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}    

                {showForm ? (
                    <>
                        {/* PropertyForm Heading */}
                        <h1 className="font-Archivo text-deepblue text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-4 md:mb-6">
                            Start Analysing Now
                        </h1>

                        {/* PropertyForm Description */}
                        <div className="w-full text-left mb-4 mt-4 px-2 md:px-0">
                            <p className="font-AnekTamil mb-2 text-sm md:text-base">Enter your property information below to get started.</p>
                            <p className="font-AnekTamil text-red-500 text-sm md:text-base"><b>You <u>must accurately complete all</u> of the fields below for the analysis to work.</b></p>
                        </div>
                                
                        <br/>
                        <h2 className="font-Archivo text-deepblue text-lg md:text-xl lg:text-2xl xl:text-3xl">Select Property Type</h2>  
                        <br/>

                        {/* Property Type */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
                            {propertyOptions.slice(0, 2).map((option, optionIndex) => {
                                return (
                                    <button 
                                        onClick={() => {
                                            setSelectedPropertyType(option.name)
                                            setShowAdditionalPropertOptions(false)
                                        }} 
                                        className={"button-card " + (option.name === selectedPropertyType ? "property-button-selected" : "")} 
                                        key={optionIndex}
                                    >
                                        <h4>{option.name}</h4>    
                                    </button>
                                )
                            })}

                            <button 
                                onClick={() => {
                                    setShowAdditionalPropertOptions(true)
                                    setSelectedPropertyType(null)
                                }} 
                                className={"button-card " + (showAdditionalPropertyOptions  ? "property-button-selected" : "")}
                            >
                                <h4>Other</h4>
                            </button>                       
                        </div>
                                
                        {showAdditionalPropertyOptions && (
                            <select 
                                onChange={(e) => {
                                    setSelectedPropertyType(e.target.value);                
                                }} 
                                className={inputSelectClass}
                            >
                                <option value={null}>Select Type</option>
                                {propertyOptions.map((option, optionIndex) => (
                                    <option value={option.name} key={optionIndex}>
                                        {option.name} 
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Property Address */}
                        <input
                            value={propertyAddress}
                            onChange={(e) => setPropertyAddress(e.target.value)}
                            type="text"
                            placeholder="Property Address"
                            className={inputSelectClass}
                        />

                        {/* Purchase Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Purchase Price (£)</h6>
                                <input
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(e.target.value)}
                                    type="number"
                                    placeholder="£00,000"
                                    className={inputSelectClass}
                                />
                            </div>
                    
                            <div className="w-full h-full flex flex-col">
                                <h6>Deposit (£)</h6>
                                <input
                                    value={initialDeposit}
                                    onChange={(e) => setInitialDeposit(e.target.value)}
                                    type="number"
                                    placeholder="£00,000"
                                    className={inputSelectClass}
                                />
                            </div>        
                        </div>

                        {/* Date Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Date of Purchase</h6>
                                <input
                                    value={dateOfPurchase}
                                    onChange={(e) => setDateOfPurchase(e.target.value)}
                                    type='date'
                                    className={inputSelectClass}
                                />
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <h6>Estimated Market Value (£)</h6>  
                                <input
                                    value={estimatedMarketValue}
                                    onChange={(e) => setEstimatedMarketValue(e.target.value)}
                                    type="number"
                                    placeholder="£00,000"
                                    className={inputSelectClass}
                                />  
                            </div>
                        </div>

                        {/* Standard Structure */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>EPC Rating</h6>
                                <select
                                    value={epcRating}
                                    onChange={(e) => setEpcRating(e.target.value)}
                                    id="epc-select"
                                    className={inputSelectClass}
                                >
                                    <option value="">Select</option>
                                    {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((epc, idx) => (
                                        <option value={epc} key={idx}>{epc}</option>
                                    ))}                  
                                </select>    
                            </div>
                                
                            <div className="w-full h-full flex flex-col">
                                <h6>Number of Bedrooms</h6>
                                <select
                                    value={numberBedrooms}
                                    onChange={(e) => setNumberBedrooms(e.target.value)}
                                    id="bedrooms-select"
                                    className={inputSelectClass}
                                >
                                    <option value="">Select</option>
                                    {[1, 2, 3, 4, 5].map((num, idx) => (
                                        <option value={num} key={idx}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <br />
                        <hr/>    
                        <br />        
                            
                        {/* Mortgage Information */}
                        <h3 className="font-Archivo text-deepblue">Mortgage Information</h3>
                        <br />        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Outstanding Mortgage (£)</h6>
                                <input
                                    value={outstandingMortgage}
                                    onChange={(e) => setOutstandingMortgage(e.target.value)}
                                    type="number"
                                    placeholder="£00,000"
                                    className={inputSelectClass}
                                />
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <h6>Mortgage Type</h6>
                                <select
                                    value={mortgageType}
                                    onChange={(e) => setMortgageType(e.target.value)}
                                    id="mortgage-type-select"
                                    className={inputSelectClass}
                                >
                                    {['Interest Only', 'Principal and Interest'].map((type, idx) => (
                                        <option value={type} key={idx}>{type}</option>
                                    ))}
                                </select>    
                            </div>
                        </div>

                        {/* Interest */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Mortgage Interest Rate (%)</h6>
                                <input
                                    value={mortgageInterestRate}
                                    onChange={(e) => setMortgageInterestRate(e.target.value)}                       
                                    type="number"
                                    placeholder="0.0"
                                    className={inputSelectClass}
                                />
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <h6>Years Remaining</h6> 
                                <input
                                    value={mortgageYearsRemaining}
                                    onChange={(e) => setMortgageYearsRemaining(e.target.value)}
                                    type="number"
                                    placeholder="00"
                                    className={inputSelectClass}
                                />    
                            </div>
                        </div>

                        <br />
                        <hr/>
                        <br />
                        
                        <h3 className="font-Archivo text-deepblue">Income and Costs</h3>
                        <br />        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Weekly Rent (£)</h6>
                                <input
                                    value={rentWeekly}
                                    onChange={(e) => setRentWeekly(e.target.value)}
                                    type="number"
                                    placeholder="£000"
                                    className={inputSelectClass}
                                />    
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <h6>Letting Fees (%)</h6>
                                <input
                                    value={lettingFees}
                                    onChange={(e) => setLettingFees(e.target.value)}
                                    type="number"
                                    placeholder="0.0"
                                    className={inputSelectClass}
                                />        
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Service Charge (£ p.a.)</h6>
                                <input
                                    value={serviceCharge}
                                    onChange={(e) => setServiceCharge(e.target.value)}
                                    type="number"
                                    placeholder="£000"
                                    className={inputSelectClass}
                                />    
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <h6>Ground Rent (£ p.a.)</h6>    
                                <input
                                    value={groundRent}
                                    onChange={(e) => setGroundRent(e.target.value)}
                                    type="number"
                                    placeholder="£000"
                                    className={inputSelectClass}
                                />    
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-6 items-stretch">
                            <div className="w-full h-full flex flex-col">
                                <h6>Other Costs (£ p.a.)</h6>
                                <input
                                    value={otherCosts}
                                    onChange={(e) => setOtherCosts(e.target.value)}
                                    type="number"
                                    placeholder="£0,000"
                                    className={inputSelectClass}
                                />    
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <h6>Your Annual Income (£ p.a.) 
                                    <span> <i
                                        className="fa-solid fa-circle-info"
                                        style={{ cursor: 'pointer', marginLeft: '8px' }}
                                        onClick={() => setShowIncomeModal(true)}
                                        aria-label="More info about annual income"
                                        tabIndex={0}
                                        role="button"   
                                    ></i>
                                    </span>
                                </h6> 
                                <input
                                    value={yourCurrentIncome}
                                    onChange={(e) => setYourCurrentIncome(e.target.value)}
                                    type="number"
                                    placeholder="£00,000"
                                    className={inputSelectClass}
                                />       
                            </div>
                        </div>
                        
                        {/* SUBMIT BUTTON */}
                        <button 
                            onClick={handleSubmitForm}
                            className="bg-gradient-to-r from-bpurple to-bpurple text-white font-AnekTamil text-base md:text-lg px-4 md:px-6 py-1 md:py-2 rounded-md shadow-md hover:from-fuchsia-600 hover:to-fuchsia-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            Analyse Now
                        </button>            
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <button
                            onClick={handleAnalyseAgain}
                            className="bg-gradient-to-r from-bpurple to-fuchsia-600 text-white font-AnekTamil text-lg px-8 py-3 rounded-md shadow-md hover:from-fuchsia-600 hover:to-bpurple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            Analyse Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}