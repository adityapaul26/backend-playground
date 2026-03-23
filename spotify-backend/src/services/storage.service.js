const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

async function uploadFile(file) {
    const result = await client.files.upload({

    })
}

