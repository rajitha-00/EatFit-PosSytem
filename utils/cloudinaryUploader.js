const {createReadStream} = require("streamifier");
const cloudinary = require('cloudinary').v2;

// Replace with your actual credentials
cloudinary.config({
    cloud_name: 'dgzvpuif6',
    api_key: '574838418123758',
    api_secret: 'ZzRcbQVofX47iyCgsQ_0AUoZNNk'
});

const uploadToCloudinaryBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'menuItems' },
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        );
        createReadStream(buffer).pipe(uploadStream);
    });
};

module.exports = uploadToCloudinaryBuffer;
