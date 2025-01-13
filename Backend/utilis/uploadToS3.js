import s3 from '../s3Config.js';
import { Upload } from '@aws-sdk/lib-storage';



export const uploadToS3 = async (fileBuffer, fileName) => {
    try {
        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,  // Your S3 bucket name
            Key: fileName,                    // The file name in S3
            Body: fileBuffer,                 // The file buffer
            // ACL: 'public-read',               // Set the file to be publicly readable
        };

        const upload = new Upload({
            client: s3,
            params: uploadParams,
        });

        const uploadResult = await upload.done();
        console.log('File uploaded successfully:', uploadResult.Location);

        return uploadResult.Location;  // Return the S3 URL of the uploaded file
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};
