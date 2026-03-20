const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})
// Basic URL without transformations
// const url = client.helper.buildSrc({
//     urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
//     src: '/path/to/image.jpg',
// });

async function uploadFile(buffer) {

    const response = await client.files.upload({
        file: buffer.toString("base64"),
        fileName: 'file-name.jpg',
    });

    return response;
}

module.exports = uploadFile;
// Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg
