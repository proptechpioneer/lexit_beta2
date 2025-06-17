export const grossYieldStatusLevels = {
    low: {
        color: "#FFF",
        background: "#22e36e",
        maxLevel: 6,
        output: "Low Risk"
    },
    moderate: {
        color: "#FFF",
        background: "#ff9900",
        maxLevel: 4,
        output: "Monitor"
    },
    high: {
        color: "#FFF",
        background: "#ff1744",
        maxLevel: -20,
        output: "High Risk"
    },
}

export const netYieldStatusLevels = {
    low: {
        color: "#FFF",
        background: "#22e36e",
        maxLevel: 5,
        output: "Low Risk"
    },
    moderate: {
        color: "#FFF",
        background: "#ff9900",
        maxLevel: 3.5,
        output: "Monitor"
    },
    high: {
        color: "#FFF",
        background: "#ff1744",
        maxLevel: -10,
        output: "High Risk"
    },
}

export const opexStatusLevels = {
    low: {
        color: "#FFF",
        background: "#22e36e",
        description: 'Your operating costs are manageable, it is advisable to maintain them at their current level.',
        maxLevel: 0,
        output: "Low Risk"
    },
    moderate: {
        color: "#FFF",
        background: "#ff9900",
        description: 'Your costs are high compared to your rental income, likely due to service charges, management fees, or other expenses. Aim to reduce these costs by 10-20%.',
        maxLevel: 20,
        output: "Monitor"
    },
    high: {
        color: "#FFF",
        background: "#ff1744",
        description: 'Your operating costs are very high compared to the annual rental. You need to find ways to reduce your costs by approximately 30%.',
        maxLevel: 25, 
        output: "High Risk"
    }
}

export const dscrStatusLevels = {
    low: {
        color: "#FFF",
        background: "#22e36e",
        description: 'A DSCR of 1.75 or more is considered ideal for property investment. You generate enough income to cover your mortgage if things go wrong.',
        maxLevel: 1.75,
        output: "Low Risk"
    },
    moderate: {
        color: "#FFF",
        background: "#ff9900",
        description: 'Your income exceeds your loan servicing costs but is less than 1.75. There is a risk if things go wrong, you should explore ways to reduce your debt or increase rent to achieve a DSCR of 1.5 or higher.',
        maxLevel: 1,
        output: "Monitor"
    },
    high: {
        color: "#FFF",
        background: "#ff1744",
        description: 'It is important to evaluate your situation. You need to assess whether you can reduce your mortgage or other costs, and increase the rent. If these options are not feasible, consider if keeping the property is worthwhile.',
        maxLevel: -10,
        output: "High Risk"
    }
}

export const nratStatusLevels = {
    low: {
        color: "#FFF",
        background: "#22e36e",
        description: 'An NRAT of 4.5% constitutes a satisfactory long-term return. To maintain this rate, it is important to consistently monitor costs and rent to ensure the NRAT does not drop below 4.5%.',
        maxLevel: 4.5,
        output: "Low Risk"
    },
    moderate: {
        color: "#FFF",
        background: "#ff9900",
        description: 'While your return is positive, it remains low. If you expect significant capital growth, this might be acceptable. However, if the anticipated growth is minimal or absent, consider increasing rent or reducing costs to improve the investment.',
        maxLevel: 2,
        output: "Monitor"
    },
    high: {
        color: "#FFF",
        background: "#ff1744",
        description: 'Your return is very low, this may be ok if you are expecting considerable capital growth. If your anticipated capital growth is low or it does not happen this may not be the right investment, you should look at options to increase the rent and or lower your costs or sell.',
        maxLevel: -10,
        output: "High Risk"
    }
}