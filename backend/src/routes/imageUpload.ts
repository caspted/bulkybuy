import { Express, Request, Response } from 'express';
import multer from 'multer';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  S3ClientConfig 
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuid } from 'uuid';

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
};

const s3Config: S3ClientConfig = {
  region: "ap-southeast-1",
  credentials: credentials
};

const s3 = new S3Client(s3Config);

const BUCKET = process.env.BUCKET;
const upload = multer({ storage: multer.memoryStorage() });

const uploadToS3 = async ({ file, userId }: { file: Express.Multer.File; userId: string }) => {
  const key = `${userId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getImageKeysByUser = async (userId: string) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: userId,
  });

  const { Contents = [] } = await s3.send(command);
  return Contents.map((image) => image.Key);
};

const getUserPresignedUrls = async (userId: string) => {
  try {
    const imageKeys = await getImageKeysByUser(userId);
    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        return getSignedUrl(s3, command, { expiresIn: 900 }); // default
      })
    );
    return { presignedUrls };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

function imageUploadRoutes(app: Express) {
  app.post('/api/images/:id', upload.single('image'), async (req: Request, res: Response) => {
    const { imageForm } = req.body;
    const { id } = req.params
    const userId = id

    if (!imageForm || !userId) return res.status(400).json({ message: 'Bad request' });

    const { error, key } = await uploadToS3({ file: imageForm, userId });
    if (error) return res.status(500).json({ message: error });

    return res.status(201).json({ message: imageForm });
  });

  app.get('/api/images', async (req: Request, res: Response) => {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) return res.status(400).json({ message: 'Bad request' });

    const { error, presignedUrls } = await getUserPresignedUrls(userId);
    if (error) return res.status(400).json({ message: error });

    return res.json(presignedUrls);
  });
}

export default imageUploadRoutes;