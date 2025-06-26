import Modal from "./Modal"
import Authentication from "./Authentication"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Layout (props) {

    const { children } = props
    const [showModal, setShowModal] = useState(false)
    const [showTermsModal, setShowTermsModal] = useState(false)
    const { globalUser, logout } = useAuth() // Assuming globalUser is passed as a prop
    
    // HEADER
    const header = (
        <header className="bg-deepblue">
            <div className="flex flex-row justify-between items-center gap-4 md:gap-8 p-2 md:p-4 max-w-[1000px] mx-auto w-full bg-deepblue">
                
                {/* Logo Container */}
                <div className="flex items-center gap-2">
                    <img src="/lexit_logo_white.png" alt="Logo" className="w-auto h-8 md:h-10" />
                </div>

                {/* Sign Up Button */}
                {globalUser ? (
                    <button
                    className="bg-gradient-to-r from-bpurple to-bpurple text-white font-AnekTamil text-base md:text-lg px-4 md:px-6 py-1 md:py-2 rounded-md shadow-md hover:from-fuchsia-600 hover:to-fuchsia-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={logout}
                    >
                    <p>Logout</p>
                    </button>
                ) : ( 
                    <button
                        className="bg-gradient-to-r from-bpurple to-bpurple text-white font-AnekTamil text-base md:text-lg px-4 md:px-6 py-1 md:py-2 rounded-md shadow-md hover:from-fuchsia-600 hover:to-fuchsia-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setShowModal(true)}
                    >
                        <p>Try it FREE</p>
                    </button>
                )}
                </div>
        </header>
    )

    // FOOTER
    const footer = (
        <footer>
            <div className="flex flex-row justify-between items-center gap-4 md:gap-8 p-2 md:p-4 max-w-[1000px] mx-auto w-full">
                <div className="flex items-center gap-2">
                    <p>© 2025 LEXIT. All Rights Reserved.</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* <i className="fa-brands fa-linkedin text-2xl"></i> */}
                    <a href="https://x.com/LEXIT_Tech" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-square-x-twitter text-2xl hover:text-blue-400 transition-colors"></i>
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="underline text-sm text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => setShowTermsModal(true)}
                    >
                        Terms and Conditions
                    </button>
                </div>
            </div>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleCloseTermsModal() {
        setShowTermsModal(false);
    }
       
    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}

            {showTermsModal && (
                <Modal handleCloseModal={handleCloseTermsModal}>
                    <div className="p-4 max-w-lg">
                        <h2 className="font-Archivo text-xl text-center font-bold mb-2">Terms and Conditions</h2>
                        <div className="mb-4 text-sm text-gray-700 max-h-96 overflow-y-auto">
                            <div className="text-justify text-gray-700">
                            <p className="mb-4">
                                Welcome to LEXIT. Please read the Terms and Conditions (Terms) carefully before using the website www.lexit.tech and www.prs-im.co.uk.
                            </p>
                            <p className="mb-4">
                                If you continue to browse and use the Site and engage with us, you are agreeing to comply with and be bound by the following disclaimer, together with our terms and conditions of use set out below.
                            </p>
                            <p className="mb-4">
                                The information contained in this website is for guidance and information only. Nothing on the Site shall be deemed to constitute professional financial, tax or legal advice and in the event that you wish to obtain such advice, you should consult a professional financial advisor, tax advisor, solicitor or conveyancing practitioner.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">About Us</h3>
                            <p className="mb-4">
                                LEXIT is a subsidiary of PRS-IM Limited a property, property management and technology business.
                            </p>
                            <p className="mb-4">
                                PRS IM Limited, 86 - 90 Paul Street, London EC2A 4NE, England is the owner of the LEXIT application as well as www.lexit.tech domain.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Disclaimer</h3>
                            <p className="mb-4">
                                The information provided below is for general information purposes only and is provided by LEXIT and PRS IM Limited. While LEXIT and PRS IM Limited endeavours to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website or supplied to you, for any purpose. Any reliance you place on such information is therefore strictly at your own risk. You need to make your own enquiries to determine if the information or products are appropriate for your intended use.
                            </p>
                            <p className="mb-4">
                                In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of the Sites or your interaction with us.
                            </p>
                            <p className="mb-4">
                                Through your engagement with us you may be directed or presented with a link to other websites or entities which are not under the control of LEXIT or PRS IM Limited. It must be noted that LEXIT nor PRS IM Limited has no control over the nature, content and availability of those websites or related entities. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                            </p>
                            <p className="mb-4">
                                Every effort is made to keep the website up and running smoothly. However, LEXIT and PRS IM Limited takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond its control.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Privacy Policy</h3>
                            <p className="mb-4">
                                When you register with us and use our Site you will provide personal information and data. Our Privacy Policy sets out how we will use this information that you provide. By using or registering with our Site, you agree to your personal information being used in accordance with our Privacy Policy.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Security</h3>
                            <p className="mb-4">
                                You will need to create your own account to use our Services. Once you register with us you will be provided with login and access code. By creating an account with us, you agree that you are responsible for maintaining the confidentiality of your account and password and for restricting access to your account, and you agree to accept responsibility for all activities that occur under your account or password.
                            </p>
                            <p className="mb-4">
                                In order to ensure your security, we may revise our security procedure from time to time and we may request you provide additional information as part of our security procedure. You should not disclose your login codes, access codes or security details to any other person and your account may be disabled if you do so.
                            </p>
                            <p className="mb-4">
                                In order to ensure your security, we may revise our security procedure from time to time and we may request you provide additional information as part of our security procedure. You should not disclose your login codes, access codes or security details to any other person and your account may be disabled if you do so.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Membership and Subscription Services</h3>
                            <p className="mb-4">
                                A member is someone who uses our Services (Member). To become a Member, you must be;
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>At least be 18 years of age;</li>
                                <li>Completes the registration process and provide true, correct and up-to-date information; including your name and email address; and,</li>
                                <li>Comply with any additional information reasonably requested by LEXIT or PRS IM Limited.</li>
                            </ul>
                            <p className="mb-4">
                                Our websites and their content may at some times be interrupted and we do not guarantee that the Sites will always be available and as such access is allowed on a temporary basis. All or part of the Sites may be suspended or discontinued without prior notice and we are not liable if the site is unavailable for any period of time. You will not use the Sites for any use that is unlawful or prohibited by these Terms or any other applicable laws.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Community Management</h3>
                            <p className="mb-4">
                                While we welcome feedback and discussion on our Social Media Platforms, our team monitors posts and comments to ensure all conversations are adhering to community standards. However, we are not responsible for any messages or posts or opinions expressed including those that are offensive, defamatory or breach the Protection from Harassment Act 1997 or the Malicious Communications Act 1988.
                            </p>
                            <p className="mb-4">
                                LEXIT and PRS IM Limited reserves the right to moderate, report or delete comments that:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Are offensive (i.e. contain obscenity or profanity, hate speech, personal attacks, or unreasonable criticism of PRS IM Limited, its staff or others)</li>
                                <li>Are irrelevant</li>
                                <li>Contain political, commercial or sales/promotional material, or any misinformation</li>
                                <li>Share confidential or sensitive information</li>
                                <li>Are posted from an account deemed likely to be fake or anonymous</li>
                                <li>Are spam</li>
                                <li>Are deemed otherwise inappropriate</li>
                            </ul>
                            <p className="mb-4">
                                Any posts or comments made on our platform by individuals are their own views and are not indicative of the views of LEXIT or PRS IM Limited. Likes, comments, shares or retweets from any LEXIT or PRS IM Limited social media accounts or platforms is not an endorsement of the information. Users may decide to provide information to LEXIT and PRS IM Limited through direct message on our social media channels. This information may be viewed by account administrators, and our staff as appropriate. Any information provided to LEXIT or PRS IM Limited through direct message will be held by PRS IM Limited subject to our Privacy Policy.
                            </p>
                            <p className="mb-4">
                                If you are making an enquiry, complaint or request for information you may be directed to LEXIT “Contact Us” page.
                            </p>
                            <p className="mb-4">
                                We do not screen every Member that uses our Sites, therefore LEXIT and PRS IM Limited is not responsible for any Member misconduct on our Sites. If you have a misconduct to report please follow this link….
                            </p>
                            <p className="mb-4">
                               You agree to comply with all relevant laws, including but not limited to; the Consumer Protection from Unfair Trading Regulations 2008, the Consumer Rights Act 2015, the Malicious Communications Act 1988, the Copyright, Designs and Patents Act 1988, and the Trade Marks Act 1994.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Intellectual Property Rights and Copyright</h3>
                            <p className="mb-4">
                                The entire contents of the Sites are the intellectual property of LEXIT and PRS IM Limited  and are subject to copyright with all rights reserved. Sections of the Sites and information contained on the Sites may (in whole in or in part) be downloaded and printed for your personal use, provided that the information is not modified.
                            </p>
                            <p className="mb-4">
                                You must not copy, reproduce, store, distribute, publish or transmit any information from our Sites for any commercial purpose without our prior written consent and you must not misuse our trademarks.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Licence and Access</h3>
                            <p className="mb-4">
                                For the duration you use our Services, we will grant you a limited non-exclusive, non-transferable and revocable licence to use our Sites and Services in accordance with our Terms.
                            </p>
                            <p className="mb-4">
                                You also agree to licence any information shared by you to promote, use or improve our Services. This will be a non-exclusive, transferable, sublicensable, royalty-free, and worldwide licence to us, to use, store, display, reproduce, modify, distribute, create derivative works, and save your content in any manner and on any media or platform.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Trademarks</h3>
                            <p className="mb-4">
                                The Sites include logos, service marks and brand identities (Marks) that are the property of PRS IM Limited. PRS IM Limited do not grant any licence or right to use any of these Marks without our prior written permission.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Warranties and Limitation of Our Liability</h3>
                            <p className="mb-4">
                                We exclude all conditions, warranties, representations or other terms which may apply to our Sites or any content on it, whether express or implied. We disclaim all responsibility for any loss, claim, liability, damage or injury, whether in tort (including negligence), breach of statutory duty or otherwise, arising from or in any way related to the use of our Sites or Services, the inability to use or Sites, any errors, omissions or inaccuracies on our Sites or reliance on any content included within our Sites. We will not be liable for any loss or damage caused by a virus, distributed denial-of-service attack, or other technologically harmful material that may infect your computer equipment, devices, computer programs, data or other proprietary material due to your use of our site or to your downloading of any content on it, or on any website linked to it. Any links to other websites on our Sites are not endorsed by us.
                            </p>
                            <p className="mb-4">
                                We assume no responsibility for the content of websites linked to our Sites and we will not be liable for any loss or damage that may arise from your use of them. Viewing any third-party websites is entirely at your own risk.
                            </p>
                            <p className="mb-4">
                                You agree to hold LEXIT and PRS IM Limited harmless and to defend and indemnify us against any claims made by yourself or third parties that is related to loss of profit, loss of business, savings, general special and consequential damages, costs or expenses including legal fees, arising from or related to your use of Sites and Services; including but not limited to; breach of these terms or your inability to fulfil a transaction. For the avoidance of doubt your indemnity covers all losses, damages or expenses (including legal costs) that we may suffer or incur.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Viruses</h3>
                            <p className="mb-4">
                                Whilst care is taken, we are unable to guarantee that our Sites are secure and completely free of bugs or viruses. Viruses, Trojans, worms logic bombs or other malicious or technologically harmful materials must not be introduced by you to our Sites. Any attempt to gain unauthorized access to our Sites, servers, data or databases is prohibited.
                            </p>
                            <h3 className="font-bold mt-6 mb-2">Dispute Resolution</h3>
                            <p className="mb-4">
                                Our preference is always to resolve disputes informally and amicably. If you would like to raise a dispute with us, please get in touch via our Contact us page.
                            </p>
                            <p className="mb-4">
                                Any disputes arising from the use of the Sites shall be governed by the laws of England.
                            </p>
                        </div>
                        </div>
                        <button
                            className="w-64 bg-gradient-to-r from-bpurple to-fuchsia-600 text-white font-AnekTamil text-lg px-8 py-3 rounded-md shadow-md hover:from-fuchsia-600 hover:to-bpurple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={handleCloseTermsModal}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
            
            {header}
                <main>
                {children}
                </main>
            {footer}
        </>
    )
}