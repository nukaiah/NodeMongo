const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'djeijog2o',
    api_key: '367211954513513',
    api_secret: 'OAekp042IQNVaY63p0122vZAsRk'
});

module.exports = cloudinary;