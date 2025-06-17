import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Authentication from "./Authentication";
import Modal from "./Modal";

function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const sliderRef = useRef(null);

  return (
    <div className="landing-page">
      <div className="bg-deepblue text-center">
        {/* Header Section */}
        <div className="flex justify-center pt-0.5 max-w-[90vw] sm:max-w-[780px] mx-auto">
          <h1 className="font-Archivo text-white pt-12 text-3xl leading-tight sm:text-5xl sm:leading-[56px] md:text-[64px] md:leading-[74px]">
            BtL Analyser for Private Landlords
          </h1>
        </div>
        <div className="flex justify-center pt-4 max-w-[90vw] sm:max-w-[780px] mx-auto">
          <p className="font-AnekTamilLight text-white pt-2 text-base leading-5 sm:text-[26px] sm:leading-[30px] pb-0">
            Meet LEXIT — the ultimate property analyser for Buy-to-Let landlords in <b>England</b>
          </p>
        </div>
        <div>
          <img src="/hero_image.png" alt="Landing Page Image" className="w-full max-w-[650px] mx-auto " />
        </div>

        {/* First transition */}
        <div className="h-[100px] bg-gradient-to-b from-deepblue to-white"></div>
        <div className="h-[100px] bg-white"></div>

        {/* Explainer Container */}
        <div className="bg-white flex flex-col md:flex-row justify-center items-center md:h-[500px]">
          {/* Left block content */}
          <div
            className="w-full max-w-xs sm:max-w-sm md:w-1/3 h-auto md:h-[500px] flex flex-col items-start justify-center border rounded-lg px-3 py-3 sm:px-4 sm:py-4 break-words overflow-hidden mb-4 md:mb-0 md:mr-6"
            style={{ backgroundColor: "#D9B8DE", borderColor: "#D9B8DE" }}
          >
            <h2 className="font-Archivo text-deepblue text-2xl sm:text-3xl font-bold mb-1">Did you know?</h2>
            <br />
            <p className="text-deepblue font-AnekTamil text-base sm:text-lg mb-1 text-left">
              For Buy-to-Let landlords in England, it is possible to incur a loss and still have to pay tax on that loss due to the way mortgage interest is taxed.
            </p>
            <br />
            <p className="text-deepblue font-AnekTamil text-base sm:text-lg mb-1 text-left">
              Additionally, the proposed Rent Reform Bill could make it impossible for landlords to increase rents or remove problematic tenants. Potentially leaving you stuck with a difficult tenant for an extended period of time. Can you afford that?
            </p>
            <br />
            {/* Sign Up Button - now opens login modal */}
            {/* <button
              onClick={() => setShowLoginModal(true)}
              className="bg-gradient-to-r from-bpurple to-bpurple text-white font-AnekTamil text-base md:text-lg px-4 md:px-6 py-1 md:py-2 rounded-md shadow-md hover:from-fuchsia-600 hover:to-fuchsia-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white mt-2"
            >
              <p>Try it for FREE</p>
            </button> */}
          </div>

          {/* Right block content */}
          <div className="w-full max-w-xs sm:max-w-sm md:w-2/5 md:h-[500px] flex flex-col items-center justify-start bg-white rounded-lg px-4 py-2">
            {/* Heading at the top */}
            <h2 className="font-Archivo text-deepblue text-3xl font-bold mb-1">Take control today...</h2>
            {/* 4 feature boxes */}
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Box 1 */}
              <div className="flex flex-col items-center bg-[#FFF] rounded-lg p-3 max-w-[250px] mx-auto">
                <div className="flex items-center mb-1 justify-center w-full">
                  <img src="/kpis.png" alt="Cashflow Icon" className="w-auto md:h-10 h-8 mr-2" />
                  <h2 className="font-Archivo text-deepblue text-2xl font-bold text-center">KPI's</h2>
                </div>
                <br />
                <p className="text-sm text-deepblue text-center">
                  How does your BtL stack up against standard industry <b>Key Performance Indicators</b>?
                </p>
              </div>
              {/* Box 2 */}
              <div className="flex flex-col items-center bg-[#FFF] rounded-lg p-3 max-w-[250px] mx-auto">
                <div className="flex items-center mb-1 justify-center w-full">
                  <img src="/bars-2.png" alt="Cashflow Icon" className="w-auto md:h-10 h-8 mr-2" />
                  <h2 className="font-Archivo text-deepblue text-2xl font-bold mb-1 text-center">Cashflow</h2>
                </div>
                <br />
                <p className="text-sm text-deepblue text-center">
                  Analyse your cashflow in seconds, to <b>forecast your income after tax</b>.
                </p>
              </div>
              {/* Box 3 */}
              <div className="flex flex-col items-center bg-[#FFF] rounded-lg p-3 max-w-[250px] mx-auto">
                <div className="flex items-center mb-1 justify-center w-full">
                  <img src="/diagram.png" alt="Growth Icon" className="w-auto md:h-10 h-8 mr-2" />
                  <h2 className="font-Archivo text-deepblue text-2xl font-bold mb-1 text-center">Growth</h2>
                </div>
                <br />
                <p className="text-sm text-deepblue text-center">
                  What is your long-term capital appreciation? <b>Forecast multiple scenarios after the impact of CGT</b>.
                </p>
              </div>
              {/* Box 4 */}
              <div className="flex flex-col items-center bg-[#FFF] rounded-lg p-3 max-w-[250px] mx-auto">
                <div className="flex items-center mb-1 justify-center w-full">
                  <img src="/calcu.png" alt="Cashflow Icon" className="w-auto md:h-10 h-8 mr-2" />
                  <h2 className="font-Archivo text-deepblue text-2xl font-bold mb-1 text-center">Disasters</h2>
                </div>
                <br />
                <p className="text-sm text-deepblue text-center">
                  What will a dispute costs? <b>Forecast how much cash you may need to come up with</b>?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      {/* Second transition */}
      <div className="h-[100px] bg-gradient-to-b from-white to-deepblue "></div>
      <div className=" bg-deepblue">
        <h2 className=" font-Archivo text-center text-white text-3xl font-bold mb-1">How does it Work?</h2>
        <br />
        <p className="text-white font-AnekTamil text-center">
          LEXIT is designed specifically for Buy-to-Let investors with a <b>single property in England which they own in their own name.</b>
        </p>
        <p className="text-white font-AnekTamil text-center">
          <u>If this is not you</u>, don't worry we will have other updates coming soon.
        </p>
        <br />
        <p className="text-white font-AnekTamil text-center">
          You can analyse your property in less than 30 seconds. Simply follow the steps below.
        </p>
        <br />
        <h2 className=" font-Archivo text-center text-white text-3xl font-bold mb-1"> Step 1</h2>
        <br />
        <p className="text-white font-AnekTamil text-center">
          Enter your property details, including purchase price, rental income, and expenses, etc.
        </p>
        <div>
          <img src="/input.png" alt="LEXIT Input Page" className="w-full max-w-[650px] mx-auto " />
        </div>
        <br />
        <h2 className=" font-Archivo text-center text-white text-3xl font-bold mb-3">Step 2</h2>
        <br />
        <p className="text-white font-AnekTamil text-center mb-3">Then press the big <b>PINK BUTTON</b></p>
        <br />
        <br />
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-bpurple to-bpurple text-white font-AnekTamil text-base md:text-lg px-4 md:px-6 py-1 md:py-2 rounded-md shadow-md hover:from-fuchsia-600 hover:to-fuchsia-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white">
            Analyse Now
          </button>
        </div>
        <br />
        <br />
        <h2 className=" font-Archivo text-center text-white text-3xl font-bold mb-1">Step 3</h2>
        <br />
        <p className="max-w-[800px] mx-auto text-white font-AnekTamil text-center">
          That's it! You'll receive a comprehensive assessment of your buy-to-let, providing the perfect starting point to evaluate whether holding onto your property makes sense. It will also highlight potential improvements to boost performance or help you determine if selling is the best option.
        </p>
        <br />
        <div>
          <img src="/results.png" alt="LEXIT Results Page" className="w-full max-w-[650px] mx-auto " />
        </div>
        <h2 className=" font-Archivo text-center bg-deepblue text-white text-3xl font-bold mb-1">What LEXIT Does?i</h2>
        <br />
        <p className="max-w-[800px] mx-auto text-white font-AnekTamil text-center">
          The LEXIT plaftorm provides a detailed dashboard setting out all of the key information BtL landlords need to determine if their property investment is performing and worth retaining.
        </p>
        <br />

        {/* Carousel with arrows and swipe hint below the slider */}
        <div className="max-w-2xl mx-auto px-4">
          <Slider
            ref={sliderRef}
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            autoplay={true}
            autoplaySpeed={4000}
          >
            {/* Slide 1 */}
            <div>
              <div className="bg-deepblue rounded-lg flex flex-col items-center justify-center p-8 shadow min-h-[320px]">
                <div className="font-AnekTamil text-white text-xl text-center mb-0">
                  Benchmark your BtL to <b>industry property industry KPI's</b>
                </div>
                <img src="/kpis3.png" alt="Instant Insights" className="w-150 h-150 object-contain" />
              </div>
            </div>
            {/* Slide 2 */}
            <div>
              <div className="bg-deepblue rounded-lg flex flex-col items-center justify-center p-8 shadow min-h-[320px]">
                <div className="font-AnekTamil text-white text-xl text-center mb-0">
                  Forecast 10 year cashflow setting out your <b>forecast Net Income After Tax (NRAT)</b>
                </div>
                <img src="/cashflow.png" alt="Performance Dashboard" className="w-150 h-150 object-contain" />
              </div>
            </div>
            {/* Slide 3 */}
            <div>
              <div className="bg-deepblue rounded-lg flex flex-col items-center justify-center p-8 shadow min-h-[320px]">
                <div className="font-AnekTamil text-white text-xl text-center mb-0">
                  Forecast your <b>Capital Appreciation</b> taking into account different scenarios
                </div>
                <img src="/capap.png" alt="Scenario Analysis" className="w-150 h-150 object-contain" />
              </div>
            </div>
            {/* Slide 4 */}
            <div>
              <div className="bg-deepblue rounded-lg flex flex-col items-center justify-center p-8 shadow min-h-[320px]">
                <div className="font-AnekTamil text-white text-xl text-center mb-0">
                  An analysis of what your costs may be in a <b>Disaster Dispute with a Tenant</b>
                </div>
                <img src="/disaster.png" alt="Actionable Tips" className="w-150 h-150 object-contain" />
              </div>
            </div>
          </Slider>
          <div className="flex flex-col items-center">
            <span className="text-white font-AnekTamil text-sm opacity-70 mb-0">
              Swipe or use arrows to see more
            </span>
            <br />
            <div className="flex gap-2">
              <button
                aria-label="Previous"
                className="text-white bg-bpurple rounded-full p-2 hover:bg-fuchsia-600 transition"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <FaChevronLeft />
              </button>
              <button
                aria-label="Next"
                className="text-white bg-bpurple rounded-full p-2 hover:bg-fuchsia-600 transition"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>

      <div className="h-[100px] bg-gradient-to-b from-deepblue to-white"></div>
      <br />
      <h2 className=" font-Archivo text-center text-deepblue text-3xl font-bold mb-1">What our Users Say</h2>


      {/* // GRID STARTS HERE */}
      <div className="max-w-5xl mx-auto my-12">

        {/* Top Row - 3 separate cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
  <div className="bg-[#D9B8DE] rounded-lg flex flex-col items-start p-4 shadow h-full w-[90vw] mx-auto lg:w-auto">
    <div className="flex items-center mb-2">
      <img
        src="/naomi.png"
        alt="Photo 1"
        className="w-14 h-14 object-cover rounded-full mr-3"
      />
      <div>
        <h3 className="text-lg text-deepblue">Naomi</h3>
        <h3 className="font-bold text-lg text-deepblue">BtL Investor</h3>
      </div>
    </div>
    <p className="text-deepblue text-sm">
      Before LEXIT, I wasn't sure if keeping my Buy-to-Let was the right move or if selling made more sense. LEXIT showed me how I could potentially pay off my mortgage and guided me to a confident, informed decision.
    </p>
  </div>
  <div className="bg-[#D9B8DE] rounded-lg flex flex-col items-start p-4 shadow h-full w-[90vw] mx-auto lg:w-auto">
    <div className="flex items-center mb-2">
      <img
        src="/mary.png"
        alt="Photo 2"
        className="w-14 h-14 object-cover rounded-full mr-3"
      />
      <div>
        <h3 className="text-lg text-deepblue">Mary</h3>
        <h3 className="font-bold text-lg text-deepblue">Accidental Landlord</h3>
      </div>
    </div>
    <p className="text-deepblue text-sm">
      When I got married my partner and I ended up with two properties, we decided to rent my flat out. LEXIT helped me work out there was no real benefit to hold on to my property and there were better things to do with the money.
    </p>
  </div>
  <div className="bg-[#D9B8DE] rounded-lg flex flex-col items-start p-4 shadow h-full w-[90vw] mx-auto lg:w-auto">
    <div className="flex items-center mb-2">
      <img
        src="/michael.png"
        alt="Photo 3"
        className="w-14 h-14 object-cover rounded-full mr-3"
      />
      <div>
        <h3 className="text-lg text-deepblue">Michael</h3>
        <h3 className="font-bold text-lg text-deepblue">Investor</h3>
      </div>
    </div>
    <p className="text-deepblue text-sm">
      I bought a buy-to-let because it was simply what people like me did. LEXIT helped me see that property doesn’t always go up in value and that unless I took action my buy-to-let would quickly become a liabiilty rather than an asset.
    </p>
  </div>
</div>

   {/* Bottom Row - 2 separate cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#D9B8DE] rounded-lg flex flex-col items-start p-4 shadow h-full w-[90vw] mx-auto lg:w-auto">
            <div className="flex items-center mb-2">
              <img
                src="/john.png"
                alt="Photo 4"
                className="w-14 h-14 object-cover rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg text-deepblue">John Smith</h3>
                <h3 className="font-bold text-lg text-deepblue">Mortgage Broker | Worlds Best Mortgages</h3>
              </div>
            </div>
            <p className="text-deepblue text-sm">
              We have many clients who are now under water on their buy-to-lets until now it has been very difficult for them to determine whether or not they should sell or keep them. The LEXIT application is the easiest way for them to go through this thinking.
            </p>
          </div>
          <div className="bg-[#D9B8DE] rounded-lg flex flex-col items-start p-4 shadow h-full w-[90vw] mx-auto lg:w-auto">
            <div className="flex items-center mb-2">
              <img
                src="/jill.png"
                alt="Photo 5"
                className="w-14 h-14 object-cover rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg text-deepblue">Jill Green</h3>
                <h3 className="font-bold text-lg text-deepblue">Property Manager | Chase Evans</h3>
              </div>
            </div>
            <p className="text-deepblue text-sm">
              We are now recommending the LEXIT application to all of our landlords. It is the best application we have seen to quickly give landlords and instant snapshot into their property, to find ways to improve their financial perfomance.
            </p>
          </div>
        </div>


      </div>
      {/* // GRID ENDS HERE */}

      {/* Login Modal */}
      {showLoginModal && (
        <Modal handleCloseModal={() => setShowLoginModal(false)}>
          <Authentication onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default LandingPage;