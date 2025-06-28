const cloudinary = require('cloudinary').v2;

// Replace with your actual credentials
cloudinary.config({
    cloud_name: 'dgzvpuif6',
    api_key: '574838418123758',
    api_secret: 'ZzRcbQVofX47iyCgsQ_0AUoZNNk'
});

const uploadToCloudinary = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'menuItems'  // Optional folder name in Cloudinary
    });
    return result.secure_url; // URL of the uploaded image
};

module.exports = uploadToCloudinary;
