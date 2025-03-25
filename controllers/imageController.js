const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp'); // For image processing
require('dotenv').config();

const CROP_HEALTH_API_URL = "https://api.openepi.io/crop-health/predictions/multi-HLT";
const GOOGLE_SEARCH_API_KEY = "AIzaSyBkBunsXAlxKW1hWZO80lcMkfqYkKpuFfA"; // Replace with your API key
const GOOGLE_CSE_ID = "55de9fa33f4f045f2"; // Replace with your Custom Search Engine ID";

// Function to fetch disease details using Google Custom Search API
async function fetchDiseaseDetails(diseaseName) {
    // Format disease name for better search results
    let formattedName = diseaseName.replace(/ /g, " "); // Replace underscores with spaces
    formattedName = formattedName.replace(/FAW maize/i, "Fall Armyworm in Maize"); // Handle specific cases

    const searchQuery = `${formattedName} plant disease causes and prevention`;
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_CSE_ID}`;

    try {
        const response = await axios.get(searchUrl);
        const searchResults = response.data.items;

        if (searchResults && searchResults.length > 0) {
            return {
                causes: `More details: <a href="${searchResults[0].link}" target="_blank">${searchResults[0].title}</a>`,
                preventions: `Read more here: <a href="${searchResults[1]?.link}" target="_blank">${searchResults[1]?.title}</a>`
            };
        }
    } catch (error) {
        console.error("Error fetching disease details:", error.message);
    }
    
    return { causes: "Not Available", preventions: "Not Available" };
}

module.exports = {
    uploadImage: (req, res) => {
        let user = req.session.user;
        res.render('upload', { user });
    },

    detectDisease: async (req, res) => {
        let user = req.session.user;
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        try {
            console.log('Processing image file...');
            const imagePath = path.join(__dirname, '../uploads', file.filename);
            
            // Resize Image (512x512) for better API detection
            const resizedImage = await sharp(imagePath)
                .resize(512, 512)
                .toBuffer();

            console.log('Sending request to OpenEPI API...');
            const response = await axios.post(CROP_HEALTH_API_URL, resizedImage, {
                headers: {
                    "Content-Type": "application/octet-stream",
                }
            });

            console.log('API Response:', JSON.stringify(response.data, null, 2));
            const diseaseInfo = response.data;

            let highestProbabilityDisease = null;
            if (diseaseInfo && Object.keys(diseaseInfo).length > 0) {
                highestProbabilityDisease = Object.entries(diseaseInfo).reduce((max, [disease, probability]) => {
                    return probability > max.probability ? { disease, probability } : max;
                }, { disease: null, probability: 0 });
            }

            let recommendation = highestProbabilityDisease
                ? `Detected disease: ${highestProbabilityDisease.disease} with probability ${highestProbabilityDisease.probability * 100}%.`
                : "No disease detected.";

            let causes = "Not Available";
            let preventions = "Not Available";

            if (highestProbabilityDisease && highestProbabilityDisease.disease) {
                const diseaseName = highestProbabilityDisease.disease;

                console.log(`Fetching details for ${diseaseName} using Google Custom Search API...`);
                const details = await fetchDiseaseDetails(diseaseName);
                causes = details.causes;
                preventions = details.preventions;
            }

            console.log('Rendering result page...');
            res.render('result', {
                diseaseInfo,
                user,
                recommendation,
                highestProbabilityDisease,
                uploadedImageUrl: `/uploads/${file.filename}`,
                causes,
                preventions
            });

        } catch (error) {
            console.error('Error detecting disease:', error.response ? error.response.data : error.message);
            res.status(500).send('Error detecting disease.');
        }
    }
};
